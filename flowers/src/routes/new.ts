import { requireAuth, validateRequest, BadRequestError, Resources } from '@mvsrtickets/common';
import { body } from 'express-validator';
import express, { Request, Response} from 'express';
import { Flower } from '../models/flower';

import { FlowerCreatedPublisher } from '../events/publishers/flower-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { accessControl } from '@mvsrtickets/common';

const router = express.Router();

router.post('/api/flowers',
    requireAuth,
    [ 
    body('name').not().isEmpty().withMessage('Name is requires'),
    body('color').not().isEmpty().withMessage('Color is requires'),
    body('qty').isInt({ min: 0}).withMessage('Qty must be >=0'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async(req: Request, res: Response) => {

    const { name, color, qty, price } = req.body;

     //check for exsting email
    const existingFlower = await Flower.findOne({ name })

    if(existingFlower) {
        throw new BadRequestError('Flower already exists');
    }

    const flower = Flower.build({
        name,
        color,
        qty,
        price,
        userId: req.currentUser!.id
    });

    await flower.save()

    //publish event for flower creation
    new FlowerCreatedPublisher(natsWrapper.client).publish({
        id: flower.id,
        name: flower.name,
        qty: flower.qty,
        price: flower.price,
        userId: flower.userId,
        version: flower.version,
    });

    res.status(201).send(flower);
});

export { router as createFlowerRouter };