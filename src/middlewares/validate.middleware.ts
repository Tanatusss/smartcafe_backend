import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";
import { HttpError } from "../utils/http-error";



export const validate = 
//<T> generic type schema
<T>(schema: ZodType<T>) => (req:Request, res:Response, next:NextFunction) => {
   const {success, error, data} = schema.safeParse(req.body);
   if(!success){
    throw new HttpError('Validation failed',400, z.flattenError(error))
   }
   req.body = data;
   next();
}