import z, { email } from "zod";
import { validate } from "../middlewares/validate.middleware";


const signUpSchema = z
.object({
    email: z.email(),
    password: z.string().regex(/^[a-zA-Z0-9]{6,}$/),
    confirmPassword: z.string().regex(/^[a-zA-Z0-9]{6,}$/),
    name: z.string().min(2).max(25)
})
.refine(data => data.password === data.confirmPassword)
.transform(({confirmPassword, ...rest})=> rest);

export type RegisterValidator = z.infer<typeof signUpSchema>;
export const validateRegister = validate(signUpSchema);

const signInSchema = z.object({
    email: z.email(),
    password: z.string()
})

export type LoginValidator = z.infer<typeof signInSchema>;
export const validateLogin = validate(signInSchema);