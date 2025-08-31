import { Router } from 'express';
import { validateMenu } from '../validators/baristar.validator';
import { addMenuItem } from '../controllers/baristar.controller';




const  baristaRouter: Router = Router();
baristaRouter.post('/addmenu',validateMenu,addMenuItem)

export {baristaRouter}