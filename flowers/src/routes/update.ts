import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { NotFoundError, NotAuthorizedError, requireAuth, validateRequest} from '@mvsrtickets/common';
import { Flower } from '../models/flower';
import { FlowerUpdatedPublisher } from '../events/publishers/flower-updated-publisher';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.put('/api/flowers/:id', 
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is requires'),
        body('color').not().isEmpty().withMessage('Color is requires'),
        body('qty').isInt({ min: 0}).withMessage('Qty must be >=0'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async(req: Request, res: Response) => {

    const existingFlower = await Flower.findById(req.params.id);

    if(!existingFlower) {
        throw new NotFoundError();
    }

    if(existingFlower.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    existingFlower.set({
        name: req.body.name,
        color: req.body.color,
        qty: req.body.qty,
        price: req.body.price
    });

    await existingFlower.save();

     //publish event for flower creation
    new FlowerUpdatedPublisher(natsWrapper.client).publish({
        id: existingFlower.id,
        name: existingFlower.name,
        qty: existingFlower.qty,
        price: existingFlower.price,
        userId: existingFlower.userId,
        version: existingFlower.version,
    });

    res.send(existingFlower);
});

export { router as updateFlowerRouter}