import express from 'express';
import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';
import routes from './routes/indexRoute';

const app = express();
const port = 3000;

app.use(routes);

// Start server
app.listen(port, async () => {
  console.log(`server started at localhost:${port}`);

  if (!existsSync(path.resolve('src/assets/thumb'))) {
    console.log("Creating ./src/assets/thumb...")
    await fsPromises.mkdir('src/assets/thumb');
  }
});

export default app;
