import express from 'express';
import images from './api/image';

const routes: express.Router = express.Router();

// API Image Route
routes.use('/api/images', images);

// Usage
routes.get('/', (req, res): void => {
  res.send(
    '<h1>Usage</h1>' +
      '<p>localhost:3000/api/images?filename=x&width=y&height=z where:</p>' +
      '<p>x is the jpeg image to process.</p>' +
      '<p>y is the width. (Optional)</p>' +
      '<p>z is the height. (Optional)</p>'
  );
});

export default routes;
