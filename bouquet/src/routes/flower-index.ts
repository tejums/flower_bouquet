import express from 'express';
import { Flower } from '../models/flower';

const router = express.Router();

router.get('/api/bouquets/flower', async(req, res) => {
    const flowers = await Flower.find({$and : [
        { userId: req.currentUser!.id},
        { deleted: 0}
    ]});
    res.send(flowers);
});

export { router as indexFlowerRouter };