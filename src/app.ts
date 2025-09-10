import express, { Application } from 'express';
import { envConfig } from './config/env.config';
import { authRouter } from './router/auth.router';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import { baristaRouter } from './router/barista.router';
import { publicRouter } from './router/public.router';
import { orderRouter } from './router/order.router';
import morgan from 'morgan';

const app: Application = express() //Application เพื่อ autocomplete และ error hint จาก Express

app.use(cors({
  origin: "http://localhost:5173", 
  // credentials: true
}))


app.use(express.json());

app.use(morgan('dev'));
app.use('/api',authRouter)
app.use('/api',baristaRouter)
app.use('/api',publicRouter)
app.use('/api',orderRouter)

app.use(notFoundMiddleware)  // ถ้าไม่มี route จะเข้า -> notFoundMiddleware
app.use(errorMiddleware)   //throw error หรือ next(error) -> errorMiddleware


const port: number = envConfig.PORT;
app.listen(port,()=> console.log(`server running on port: ${port}`))

