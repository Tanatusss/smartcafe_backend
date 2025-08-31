import { Request, Response } from "express";
import { LoginValidator, RegisterValidator } from "../validators/auth.validator";
import { prisma } from "../database/prisma";
import { HttpError } from "../utils/http-error";
import bcrypt from 'bcryptjs'
import { UserPayload } from "../types/user-payload";
import  jwt  from "jsonwebtoken";
import { envConfig } from "../config/env.config";

 export const registerUser = async (req: Request, res: Response) => {
  const data = req.body as RegisterValidator

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email}
  })

  if(existingUser) {
    throw new HttpError('Email already exists', 409);
  }

  data.password = await bcrypt.hash(data.password,10)
  await prisma.user.create({
    data:{
      email: data.email,
      password: data.password,
      name: data.name
    }
  })
  res.status(201).json({message: 'User created successfully'})
}


 export const loginUser = async (req: Request, res: Response) => {
  const data = req.body as LoginValidator

  const user = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (!user) {
    throw new HttpError('Invalid email or password', 401);
  }

   const isValidPassword = await bcrypt.compare(data.password, user.password)
  if (!isValidPassword) {
    throw new HttpError('Invalid email or password', 401);
  }

  const payload: UserPayload = {id: user.id, email: user.email}
  const access_token = jwt.sign(payload, envConfig.JWT_SECRET, {
    expiresIn: envConfig.JWT_EXPIRES
  })
  res.status(200).json({access_token, expires_in: envConfig.JWT_EXPIRES})
}