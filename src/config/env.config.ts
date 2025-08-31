import z from "zod";
import 'dotenv/config'
//coerce รับค่าอะไรก็ได้แล้วแปลงมาเป็นnumber
const envSchema = z.object({
  PORT: z.coerce.number().min(0).max(65535),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES: z.coerce.number().min(1)

})

const {success, data , error} = envSchema.safeParse(process.env)
if(!success){
  console.log(z.flattenError(error))
 throw new Error('Invalid environment variables')
}

export const envConfig = data;