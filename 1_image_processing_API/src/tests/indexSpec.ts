import supertest from 'supertest';
import path from 'path';
import app from '../index';
import { promises as fs } from 'fs';

const request = supertest(app);
describe('Test /api/image endpoints', () => {
  it('gets the / endpoint with the API usage', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('attempts to connect to the /api/ endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(404);
  });

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
    expect(response.status).toBe(200);
  });

  it('gets the previous resized image from the last test', async () => {
    const response = await request.get('/api/images?filename=santamonica&width=100&height=100');
    expect(response.status).toBe(200);
  });

});

// Remove generated image
afterAll(async (): Promise<void> => {
  const generatedImage: string = path.resolve('src/assets/thumb/santamonica_thumb_100x100.jpg');
  await fs.access(generatedImage);
  fs.unlink(generatedImage);
});