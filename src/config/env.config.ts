import z, { coerce } from "zod";

//coerce รับค่าอะไรก็ได้แล้วแปลงมาเป็นnumber
const envSchema = z.object({
  PORT: z.coerce.number().min(0).max(65535)
})

const {success, data , error} = envSchema.safeParse(process.env)
if(!success){
 console.log(error);
 process.exit(0);
}

export const envConfig = data;