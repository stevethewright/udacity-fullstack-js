import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Product, ProductStore } from '../models/product';

dotenv.config();
const {
    TOKEN_SECRET
} = process.env;

const productRouter: express.Router = express.Router();
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const product = await store.show(id);
    return res.json(product);
}

const create = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }

    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }
        const newProduct = await store.create(product);
        res.json(newProduct);
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

productRouter.get('/products', index);
productRouter.get('/products/:id', show);
productRouter.post('/products', create);
productRouter.delete('/products/:id', destroy);

export default productRouter;
