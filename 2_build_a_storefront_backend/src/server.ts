import express, { Request, Response } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'

import productRouter from './handlers/productsHandler';
import userRouter from './handlers/usersHandler';
import orderRouter from './handlers/ordersHandler';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    optionsSuccessStatus: 200 // Some legacy browsers
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', orderRouter);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;