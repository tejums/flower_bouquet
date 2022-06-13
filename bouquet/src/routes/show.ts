import express from 'express';

const router = express.Router();

router.get('/api/bouquets/:id', async(req, res) => {
    res.send({});
});

export { router as showBouquetRouter}