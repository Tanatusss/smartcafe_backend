import { CreateOrderSchema } from './../validators/order.validator';

import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { createOrder, getOrderById } from '../controllers/order.controller';
import { authenticateMiddleware } from '../middlewares/auth.middleware';



const  orderRouter: Router = Router();
orderRouter.post('/order',authenticateMiddleware,validate(CreateOrderSchema),createOrder)
orderRouter.get('/order/:id',authenticateMiddleware,getOrderById)

export {orderRouter}