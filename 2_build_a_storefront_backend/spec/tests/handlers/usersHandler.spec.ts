import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../../src/server';
import { User } from '../../../src/models/user';

interface JWTPayloadUser {
    user: User
}

const request = supertest(app);
dotenv.config();
const {
    EXAMPLE_TEST_TOKEN,
    TOKEN_SECRET
} = process.env;

describe('Product handler', () => {
  
    it('should not get all users when missing a token', async () => {
        const response = await request.get('/users/');
        expect(response.status).toEqual(401);
    });

    it('should get all users', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { token: token};
        const response = await request.get('/users/').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should not show user with id 1 when missing a token', async () => {
        const response = await request.get('/users/1');
        expect(response.status).toEqual(401);
    });

    it('should show user with id 1', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { token: token};
        const response = await request.get('/users/1').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should not add a new user when missing a token', async () => {
        const payload = { first_name: 'John', last_name: 'Bill', password: 'bad_password3'};
        const response = await request.post('/users/').send(payload);
        expect(response.status).toEqual(401);
    });

    it('should add a new user', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const payload = { first_name: 'John', last_name: 'Bill', password: 'bad_password3', token: token};
        const response = await request.post('/users/').send(payload);
        expect(response.status).toEqual(200);
    });

    it('should delete a new user', async () => {
        const token = EXAMPLE_TEST_TOKEN;
        const secret = TOKEN_SECRET;
        const payload1 = { first_name: 'Anthony', last_name: 'Davidson', password: 'bad_password4', token: token};
        const response1 = await request.post('/users/').send(payload1);
        const decoded = jwt.verify(response1.body, secret!) as JWTPayloadUser;
        const id = decoded.user.id;
        expect(response1.status).toEqual(200);
        const payload2 = { token: token };
        const response2 = await request.del('/users/' + id).send(payload2);
        expect(response2.status).toEqual(200);
    });
  
});