import express, { Application } from 'express';
import { envConfig } from './config/env.config';
import { authRouter } from './router/auth.router';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import { baristaRouter } from './router/barista.router';
import { publicRouter } from './router/public.router';
import { orderRouter } from './router/order.router';


const app: Application = express() //Application เพื่อ autocomplete และ error hint จาก Express

app.use(cors())
app.use(express.json());
app.use('/api',authRouter)
app.use('/api',baristaRouter)
app.use('/api',publicRouter)
app.use('/api',orderRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port: number = envConfig.PORT;
app.listen(port,()=> console.log(`server running on port: ${port}`))

