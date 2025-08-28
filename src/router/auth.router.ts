import { Router } from 'express';


const  authRouter: Router = Router();
authRouter.post('/authen',(req,res)=>{
  res.json({ message: "Login success" });
});

export {authRouter}


