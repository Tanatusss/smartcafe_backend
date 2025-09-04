import { Router } from 'express';
import { getMenu, getToppings } from '../controllers/public.controller';



const  publicRouter: Router = Router();
publicRouter.get('/menu',getMenu)
publicRouter.get('/toppings',getToppings)

export {publicRouter}