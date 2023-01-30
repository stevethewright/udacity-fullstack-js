import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Order, OrderProduct, OrderStore } from '../models/order';

dotenv.config();
const {
    TOKEN_SECRET
} = process.env;

const orderRouter: express.Router = express.Router();
const store = new OrderStore();

const index = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const orders = await store.index();
    res.json(orders);
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
    const id: number = parseInt(req.params.id);
    const order = await store.show(id);
    return res.json(order);
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
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        }
        const newOrder = await store.create(order);
        res.json(newOrder);
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
    const id: number = parseInt(req.params.id);
    const deleted = await store.delete(id);
    res.json(deleted);
}

const getOrderProducts = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const id: number = parseInt(req.params.orderID);
    const orderProduct = await store.getOrderProducts(id);
    res.json(orderProduct);
}

const addOrderProduct = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const orderProduct: OrderProduct = {
            quantity: req.body.quantity,
            order_id: req.params.orderID,
            product_id: req.body.product_id,
        }
        const newOrderProduct = await store.addOrderProduct(orderProduct);
        res.json(newOrderProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroyOrderProduct = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const id: number = parseInt(req.params.productID);
    const deleted = await store.deleteOrderProduct(id);
    res.json(deleted);
}

const updateOrderProductQuantity = async (req: Request, res: Response) => {
    try {
        const secret = TOKEN_SECRET;
        jwt.verify(req.body.token, secret!);
    } catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const id: number = parseInt(req.params.productID);
    const quantity: number = parseInt(req.body.quantity);
    const update = await store.updateOrderProductQuantity(id, quantity);
    res.json(update);
}

orderRouter.get('/orders', index);
orderRouter.get('/orders/:id', show);
orderRouter.post('/orders', create);
orderRouter.delete('/orders/:id', destroy);
orderRouter.get('/users/:userID/orders/:orderID/products', getOrderProducts)
orderRouter.post('/users/:userID/orders/:orderID/products', addOrderProduct)
orderRouter.delete('/users/:userID/orders/:orderID/products/:productID', destroyOrderProduct);
orderRouter.put('/users/:userID/orders/:orderID/products/:productID', updateOrderProductQuantity);

export default orderRouter;
