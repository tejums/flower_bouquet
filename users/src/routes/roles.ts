import { requireAuth } from '@mvsrtickets/common';
import express from 'express';
import { Role } from '../models/role';

const router = express.Router();

router.get('/api/users/role', 
requireAuth,
async(req, res) =>{
    const roles = await Role.find();
    res.status(200).send(roles);
});

export {router as rolesRouter}