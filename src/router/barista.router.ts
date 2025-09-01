import { Router } from 'express';
import { validateMenu } from '../validators/baristar.validator';
import { addMenuItem, getAllOrders, updateOrderStatus } from '../controllers/baristar.controller';
import { authenticateMiddleware } from '../middlewares/auth.middleware';
import { validateUpdateOrderStatus } from '../validators/order.validator';




const  baristaRouter: Router = Router();
baristaRouter.post('/addmenu',validateMenu,addMenuItem)
baristaRouter.get('/allorder',authenticateMiddleware,getAllOrders)
baristaRouter.patch('/order/:id/status',authenticateMiddleware,validateUpdateOrderStatus,updateOrderStatus)

export {baristaRouter}