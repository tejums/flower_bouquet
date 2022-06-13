import { requireAuth, validateRequest, BadRequestError } from '@mvsrtickets/common';
import { body } from 'express-validator';
import express, { Request, Response} from 'express';
import { Flower } from '../models/flower';
import mongoose from 'mongoose';
import { Bouquet, BouquetDoc } from '../models/bouquet';
import { BouquetLineItem, BouquetLineItemDoc } from '../models/bouquet-line-item';
const router = express.Router();

router.post('/api/bouquets',
requireAuth,
[ 
body('name').not().isEmpty().withMessage('Name is required'),
],
validateRequest,
async(req: Request, res: Response) => {
    const {name, flowers } = req.body;

    let ids: any[] = []
    let qtyArr: string[]= {};
    
    flowers.forEach((flowerItem: any) => {
        const flower = flowerItem.flower;
        const id = flower.id as string;
        qtyArr[id] = '';
        // qtyArr.push(flowerItem.qty)
        ids.push(new mongoose.Types.ObjectId(id));
    });
    

    /*
    const addedFlowers = await Flower.find({ _id: { $in: ids } });
    const lineItems: BouquetLineItemDoc[] = [];
    addedFlowers.forEach(item => {
        lineItems.push(BouquetLineItem.build({
            flower: item,
            qty: qtyArr[item.id],
        }))
    });

    let insertedLineItem: BouquetLineItemDoc[] | undefined = undefined;
    await BouquetLineItem.insertMany(lineItems)
        .then(function(docs) {
            console.log(docs);
            insertedLineItem = docs
        })
        .catch(function(err) {
            console.log(err);
        });   

    if(insertedLineItem) {
        const  bouquet = Bouquet.build({
            name:name,
            userId:'',
            price: 0,
            lineItems: insertedLineItem!
        })
        bouquet?.save();    
        res.send(bouquet);
    }
*/
    res.send({qtyArr, ids})
;    //res.send({message: 'Something went wrong'});
});

export { router as newBouquetRouter}

//body('flowers').isArray().notEmpty().withMessage('Flowers must be added'),