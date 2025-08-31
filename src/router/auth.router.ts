import { Router } from 'express';
import { validateLogin, validateRegister } from '../validators/auth.validator';
import { loginUser, registerUser } from '../controllers/auth.controller';




const  authRouter: Router = Router();
authRouter.post('/register', validateRegister,registerUser)
authRouter.post('/authen',validateLogin,loginUser)

export {authRouter}


