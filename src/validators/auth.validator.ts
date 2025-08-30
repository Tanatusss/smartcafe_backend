import z, { email } from "zod";
import { validate } from "../middlewares/validate.middleware";


const signUpSchema = z
.object({
    email: z.email(),
    password: z.string().regex(/^[a-zA-Z0-9]{6,}$/),
    confirmPassword: z.string().regex(/^[a-zA-Z0-9]{6,}$/)
})
.refine(data => data.password === data.confirmPassword)
.transform(({confirmPassword, ...rest})=> rest);

export type signUpValidator = z.infer<typeof signUpSchema>;
export const validateUser = validate(signUpSchema);