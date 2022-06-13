import express from 'express';

const router = express.Router();

router.get('/api/bouquets', async(req, res) => {
    res.send('bouquet index');
});

export { router as indexBouquetRouter}