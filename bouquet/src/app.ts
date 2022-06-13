import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@mvsrtickets/common';

import { newBouquetRouter } from './routes/new';
import { updateBouquetRouter } from './routes/update';
import { indexBouquetRouter } from './routes';
import { showBouquetRouter } from './routes/show';
import { deleteBouquetRouter } from './routes/delete';
import { indexFlowerRouter } from './routes/flower-index';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(indexFlowerRouter);
app.use(newBouquetRouter);
app.use(updateBouquetRouter);
app.use(indexBouquetRouter);
app.use(showBouquetRouter);
app.use(deleteBouquetRouter);

app.all('*', async(req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }