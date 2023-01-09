import express from 'express';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('API loaded.');
});

export default routes;
