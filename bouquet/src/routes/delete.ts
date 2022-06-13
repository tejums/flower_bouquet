import express from 'express';

const router = express.Router();

router.delete('/api/bouquets/:id', async(req, res) => {
    res.send({});
});

export { router as deleteBouquetRouter}