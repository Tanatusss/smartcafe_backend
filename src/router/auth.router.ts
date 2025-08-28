import { Router } from 'express';
import { authController } from '../controllers/auth.controller';



const  authRouter: Router = Router();

authRouter.post('/register',authController.register)

authRouter.post('/authen',(req,res)=>{
  res.json({ message: "Login success" });
});

export {authRouter}


