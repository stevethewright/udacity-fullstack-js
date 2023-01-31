import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, UserStore } from '../models/user';

dotenv.config();
const {
    TOKEN_SECRET
} = process.env;

const userRouter: express.Router = express.Router();
const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }

    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }

    try {
        const id: number = parseInt(req.params.id);
        const user = await store.show(id);
        return res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password
        }
        const newUser = await store.create(user);
        const secret = TOKEN_SECRET;
        var token = jwt.sign({ user: newUser }, secret!);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }

    try {
        const id: number = parseInt(req.params.id);
        const deleted = await store.delete(id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

userRouter.get('/users', index);
userRouter.get('/users/:id', show);
userRouter.post('/users/', create);
userRouter.delete('/users/:id', destroy);

export default userRouter;
