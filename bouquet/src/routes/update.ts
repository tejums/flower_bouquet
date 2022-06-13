import express from 'express';

const router = express.Router();

router.put('/api/bouquets/:id', async(req, res) => {
    res.send({});
});

export { router as updateBouquetRouter}