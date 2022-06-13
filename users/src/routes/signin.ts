import express, { Request, Response } from "express";
import { body } from "express-validator";
import Jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@mvsrtickets/common";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post('/api/users/signin', 
[
 body('email')
 .isEmail()
 .withMessage('Email must be valid'),
 body('password')
 .trim()
 .isLength({min:4, max:8})
 .withMessage('You must supply a password')
],
validateRequest,
async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if(!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }

     //Generate JWT
    const userJWT = Jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
    }, process.env.JWT_KEY!);

    //Store it in session
    req.session = {
        jwt: userJWT
    };

    res.status(200).send(existingUser);
});

export { router as signinRouter}