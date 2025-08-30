import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error";



export const errorMiddleware = (
    err: unknown,
    req: Request,
    res:Response,
    next: NextFunction
) => {
    console.log(err);
    if(err instanceof HttpError){
        res.status(err.statusCode).json({...err, message: err.message});
        return;
    }
    if(err instanceof Error){
        res.status(500).json({message: err.message});
    }
    res.status(500).json({message: 'Internal server error'});
}