import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../../src/server';
import { OrderProduct } from '../../../src/models/order';

const request = supertest(app);
dotenv.config();
const {
    EXAMPLE_TEST_TOKEN,
    TOKEN_SECRET
} = process.env;

describe('Order handler', () => {
  
    it('should not get all active orders when missing a token', async () => {
        const response = await request.get('/orders/');
        expect(response.status).toEqual(401);
    });

    it('should get all active orders', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { token: token};
        const response = await request.get('/orders/').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should not show orders with id 1 when missing a token', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toEqual(401);
    });

    it('should show order with id 1', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { token: token};
        const response = await request.get('/orders/1').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should not add a new order when missing a token', async () => {
        const payload = { status: 'test', user_id: 1};
        const response = await request.post('/orders/').send(payload);
        expect(response.status).toEqual(401);
    });

    it('should add a new order', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { status: 'test', user_id: 1, token: token};
        const response = await request.post('/orders/').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should delete a new order', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload1 = { status: 'secondtest', user_id: 1, token: token};
        const response1 = await request.post('/orders/').send(payload1);
        const id = response1.body.id;
        expect(response1.status).toEqual(200);
        const payload2 = { token: token };
        const response2 = await request.del('/orders/' + id).send(payload2);
        expect(response2.status).toEqual(200);
    });
    
    it('should not add a product into an order when missing a token', async () => {
        const payload = { quantity: 20, user_id: 1, order_id: 1};
        const response = await request.post('/users/1/orders/1/products').send(payload);
        expect(response.status).toEqual(401);
    });

    it('should add a product into an order', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { quantity: 20, order_id: 1, product_id: 1, token: token};
        const response = await request.post('/users/1/orders/1/products').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should not show products in order_id 1 when missing a token', async () => {
        const response = await request.get('/users/1/orders/1/products');
        expect(response.status).toEqual(401);
    });

    it('should show products in order_id 1', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { token: token };
        const response = await request.get('/users/1/orders/1/products').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should update product_id 1 quantity in order_id 1 to 60', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { quantity: 60, token: token };
        const response1 = await request.get('/users/1/orders/1/products').send(payload);
        const currentOP = response1.body as OrderProduct[];
        expect(response1.status).toEqual(200);
        expect(currentOP[0].quantity).toEqual(20);
        const update = await request.put('/users/1/orders/1/products/' + currentOP[0].id).send(payload);
        const response2 = await request.get('/users/1/orders/1/products').send(payload);
        const updatedOP = response2.body as OrderProduct[];
        expect(response2.status).toEqual(200);
        expect(updatedOP[0].quantity).toEqual(60);
    });

    it('should delete a new order', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { token: token };
        const response = await request.del('/users/1/orders/1/products/' + 7).send(payload);
        expect(response.status).toEqual(200);
    });
  
});