import express from 'express';
import 'dotenv/config'
import { envConfig } from './config/env.config';
import { authRouter } from './router/auth.router';



const app = express()
app.use(express.json());
app.use('/api',authRouter)
// app.post('/api/register',)
// app.use()

const port = envConfig.PORT;
app.listen(()=> console.log(`server running on port: ${port}`))

