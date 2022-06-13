import express from 'express';
import { requireAuth } from '@mvsrtickets/common';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Permission } from '../models/permission';

const router = express.Router();

router.get('/api/users/data', 
requireAuth,
async(req, res) => {
    const users = await User.find();
    const roles = await Role.find();
    const permissions = await Permission.find();
    
    res.send({
        users: users,
        permissions: permissions,
        roles: roles
    })
}) ;

export { router as userIndexRouter}