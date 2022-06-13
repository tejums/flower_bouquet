import { NotFoundError } from '@mvsrtickets/common';
import express from 'express';
import { Flower } from '../models/flower';

const router = express.Router();

router.get('/api/flowers/:id', async(req, res) => {
    const flower = await Flower.findById(req.params.id);
    
    if(!flower) {
        throw new NotFoundError();
    }

    res.status(200).send(flower);
});

export { router as showFlowerRouter }