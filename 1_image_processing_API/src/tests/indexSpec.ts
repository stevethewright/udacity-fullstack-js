import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoints are OK', () => {
    it('gets the /api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    }
)});
