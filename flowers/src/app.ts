import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@mvsrtickets/common';

import { createFlowerRouter } from './routes/new';
import { indexFlowerRouter } from './routes/index';
import { showFlowerRouter } from './routes/show';
import { updateFlowerRouter } from './routes/update';
import { deleteFlowerRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(createFlowerRouter);
app.use(showFlowerRouter);
app.use(indexFlowerRouter);
app.use(updateFlowerRouter);
app.use(deleteFlowerRouter);

app.all('*', async(req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }