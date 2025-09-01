import { NextFunction, Response,Request } from "express";
import jwt from 'jsonwebtoken';
import { HttpError } from "../utils/http-error";
import { envConfig } from "../config/env.config";
import { UserPayload } from "../types/user-payload";



export const authenticateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const [bearer, token] = req.headers.authorization?.split(" ") || [];
    if(bearer !== 'Bearer' || !token) throw new HttpError('Unauthorized', 401);
    try{
        const payload = jwt.verify(token, envConfig.JWT_SECRET)as UserPayload;
        (req as any).user = { id: payload.id, role: payload.role }
        next();
    }catch(err){
        return next(new HttpError('Unauthorized', 401));
    }
}