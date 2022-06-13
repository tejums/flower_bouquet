import mongoose from 'mongoose';

import { app } from './app';
import { createDefaultRoles, createUserServicePermissions, routes } from './setup';


const start = async() => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT sceret Key not found');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        mongoose.connection.on('connected', async() => {
            console.log('Connected to MongDb');
            await createDefaultRoles();
            await createUserServicePermissions();
        })
        await mongoose.connect(process.env.MONGO_URI);
    }catch(err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on 3000');
        routes();
    });
};

start();