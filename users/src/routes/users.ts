import { requireAuth } from '@mvsrtickets/common';
import express from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/list', 
requireAuth,
async(req, res) =>{
    const users = await User.find();
    res.status(200).send(users);
});

export {router as usersListRouter}