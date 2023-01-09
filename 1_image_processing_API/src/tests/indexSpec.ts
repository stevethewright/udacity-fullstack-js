import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test image endpoints', () => {
  it('gets the /api/images endpoint with a basic image', async () => {
    const response = await request.get('/api/images?filename=santamonica');
    expect(response.status).toBe(200);
  });

  it('gets the /api/images endpoint with no image name specified', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('gets the /api/images endpoint with a specified image name that does not exist', async () => {
    const response = await request.get('/api/images?filename=sydney');
    expect(response.status).toBe(404);
  });

  it('gets the /api/images endpoint with an image with no specified width', async () => {
    const response = await request.get('/api/images?filename=santamonica&height=100');
    expect(response.status).toBe(400);
  });

  it('gets the /api/images endpoint with an image with no specified height', async () => {
    const response = await request.get('/api/images?filename=santamonica&width=100');
    expect(response.status).toBe(400);
  });

  it('gets the /api/images endpoint with an image with specified height and width', async () => {
    const response = await request.get('/api/images?filename=santamonica&width=100&height=100');
    expect(response.status).toBe(400);
  });

});
