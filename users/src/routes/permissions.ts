import { requireAuth } from '@mvsrtickets/common';
import express from 'express';
import { Permission } from '../models/permission';

const router = express.Router();

router.get('/api/users/permission', 
requireAuth,
async(req, res) =>{
    const permissions = await Permission.find();
    res.status(200).send(permissions);
});

export {router as permissionsRouter}