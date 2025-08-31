import z from "zod";
import { validate } from "../middlewares/validate.middleware";


export const menuForUser = z.object({
    name: z.string().min(0).max(25),
    price: z.number().min(0),
    img: z.string().min(0).max(250),
})

export type MenuValidator = z.infer<typeof menuForUser>;
export const validateMenu = validate(menuForUser);
