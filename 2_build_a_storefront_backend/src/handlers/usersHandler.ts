import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const userRouter: express.Router = express.Router();
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
}

const show = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const user = await store.show(id);
    return res.json(user);
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password
        }
        const newUser = await store.create(user);
        res.json(newUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const deleted = await store.delete(id);
    res.json(deleted);
}

userRouter.get('/users', index);
userRouter.get('/users/:id', show);
userRouter.post('/users/', create);
userRouter.delete('/users/:id', destroy);

export default userRouter;
