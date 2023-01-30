import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../../src/server';

const request = supertest(app);
dotenv.config();
const {
    EXAMPLE_TEST_TOKEN
} = process.env;

describe('Product handler', () => {
  
    it('should get all products', async () => {
        const response = await request.get('/products/');
        expect(response.status).toEqual(200);
    });

    it('should show product with id 1', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toEqual(200);
    });

    it('should add a new product', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { name: 'Super New Product', price: 12.34, token: token};
        const response = await request.post('/products/').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should delete a new product', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload1 = { name: 'Super New Product 2', price: 499, token: token};
        const response1 = await request.post('/products/').send(payload1);
        const id = response1.body.id;
        expect(response1.status).toEqual(200);
        const payload2 = { token: token};
        const response2 = await request.del('/products/' + id).send(payload2);
        expect(response2.status).toEqual(200);
    });
  
});