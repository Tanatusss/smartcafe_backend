import express from 'express';
import { envConfig } from './config/env.config';
import { authRouter } from './router/auth.router';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';


const app = express()

app.use(cors())
app.use(express.json());
app.use('/api',authRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = envConfig.PORT;
app.listen(port,()=> console.log(`server running on port: ${port}`))

