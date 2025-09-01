import { Request, Response } from "express";
import { CreateOrderDTO } from "../validators/order.validator";
import { prisma } from "../database/prisma";
import { buildOrderPricing } from "../services/order.service";


export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body as CreateOrderDTO;
        const userId = (req as any).user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { orderItemsData, orderTotal } = await buildOrderPricing(prisma, data);

        const order = await prisma.order.create({
            data: {
                status: "PENDING",
                totalPrice: orderTotal,
                User: { connect: { id: userId } },
                orderItems: { create: orderItemsData },
            },
            select: { order_id: true },
        });

        return res.status(201).json({ order_id: order.order_id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "Invalid order id" });
        }
        const order = await prisma.order.findUnique({
      where: { order_id: id },
      include: {
        orderItems: {
          include: {
            menuItem: { select: { item_id: true, name: true, price: true, img: true } },
            orderItemToppings: {
              include: { topping: { select: { id: true, name: true, priceTopping: true } } }
            }
          }
        }
      }
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    const items = order.orderItems.map((oi) => ({
      item_id: oi.menuItem?.item_id ?? null,
      name: oi.menuItem?.name ?? null,
      qty: oi.qty,
      total_price_item: Number(oi.totalPriceItem),
      toppings: oi.orderItemToppings.map((oit) => ({
        id: oit.topping.id,
        name: oit.topping.name,
        price: Number(oit.topping.priceTopping),
      })),
    }));

    return res.json({
      status: order.status.toLowerCase(), 
      items,
      total_price: Number(order.totalPrice),
      created_at: order.createdAt.toISOString(),
      completed_at: order.completedAt ? order.completedAt.toISOString() : null,
    });
    }catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}




