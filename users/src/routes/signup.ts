import express, { Request, Response } from "express";
import { body } from "express-validator";
import Jwt from "jsonwebtoken";

import { BadRequestError, Roles, validateRequest } from "@mvsrtickets/common";
import { User } from "../models/user";

const router = express.Router();

router.post('/api/users/signup', 
[
    body('name')
    .notEmpty().withMessage('Enter valid Name'),
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min:4, max:8})
    .withMessage('Password must be between 4 and 8 characters')            
],
validateRequest,
async(req: Request, res: Response) => {
    const {name, email, password } = req.body;

    //check for exsting email
    const existingUser = await User.findOne({ email })

    if(existingUser) {
        throw new BadRequestError('Email in use');
    }
    //save user
    const user = User.build({name, email, password});

    await user.save();

    //generate JWT
    const userJWT = Jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY!);

    //store it in session
    req.session = {
        jwt: userJWT
    }

    res.status(201).send({ user });
});

export { router as signupRouter}