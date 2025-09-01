import z from "zod";
import { validate } from "../middlewares/validate.middleware";



export const CreateOrderSchema = z.object({
    items: z.array(z.object({
      item_id: z.number().int().positive(),
      qty: z.number().int().positive(),
      toppings: z.array(z.number().int().positive()).optional().default([]),
  })).min(1),
  total_price: z.number().positive().optional(), // client อาจส่งมาเพื่อเช็คความตรงกัน
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PREPARING", "READY", "COMPLETED", "CANCELED"]),
});
export type UpdateOrderStatusDTO = z.infer<typeof UpdateOrderStatusSchema>;
export const validateUpdateOrderStatus = validate(UpdateOrderStatusSchema);