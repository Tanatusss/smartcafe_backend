import { Router } from 'express';
import { getMenu } from '../controllers/public.controller';



const  publicRouter: Router = Router();
publicRouter.get('/menu',getMenu)

export {publicRouter}