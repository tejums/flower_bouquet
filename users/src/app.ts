import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';

import { currentUser, errorHandler, NotFoundError } from '@mvsrtickets/common';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { usersListRouter } from './routes/users';
import { rolesRouter } from './routes/roles';
import { permissionsRouter } from './routes/permissions';
import { userIndexRouter } from './routes/index';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(currentUser);
app.use(usersListRouter);
app.use(rolesRouter);
app.use(permissionsRouter);
app.use(userIndexRouter);

app.all('*', async(req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }