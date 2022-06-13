import express, { Request, Response } from 'express';
import { NotFoundError, NotAuthorizedError, requireAuth, validateRequest} from '@mvsrtickets/common';
import { Flower } from '../models/flower';


const router = express.Router();

router.delete('/api/flowers/:id', 
    requireAuth,
    async(req: Request, res: Response) => {

    const existingFlower = await Flower.findById(req.params.id);

    if(!existingFlower) {
        throw new NotFoundError();
    }

    if(existingFlower.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    existingFlower.set({
        deleted: 1
    });

    await existingFlower.save();

    res.send(existingFlower);
});

export { router as deleteFlowerRouter}