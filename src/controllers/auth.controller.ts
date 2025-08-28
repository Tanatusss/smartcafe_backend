
import { HttpStatus } from "../types/api.types"
import { Request,Response } from "express"


export const authController = {
  register(req: Request, res: Response){
    res.status(HttpStatus.CREATED).json({success: true,message: 'Register success'})
  },
  login(){}
}