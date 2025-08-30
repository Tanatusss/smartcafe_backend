import { Request, Response } from "express"

export const notFoundMiddleware = (req: Request, res: Response)=>{
    res.status(404).json({message: 'The requested url was not found on this server'})
}