import z from "zod";



export const CreateOrderSchema = z.object({
    items: z.array(z.object({
      item_id: z.number().int().positive(),
      qty: z.number().int().positive(),
      toppings: z.array(z.number().int().positive()).optional().default([]),
  })).min(1),
  total_price: z.number().positive().optional(), // client อาจส่งมาเพื่อเช็คความตรงกัน
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;