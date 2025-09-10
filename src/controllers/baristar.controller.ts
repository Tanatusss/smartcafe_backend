import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { MenuValidator } from "../validators/baristar.validator";
import { OrderStatus } from "../../prisma/generated/prisma";
import { UpdateOrderStatusDTO } from "../validators/order.validator";


export const addMenuItem = async (req: Request, res: Response) => {
    const menu = req.body as MenuValidator

    const newMenuItem = await prisma.menuItem.create({
        data: {
            name: menu.name,
            price: menu.price,
            img: menu.img
        }
    })
    res.status(201).json({message: 'Menu item added successfully', newMenuItem})
}

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: { // ดึงรายการสินค้าที่อยู่ใน order
          include: {
            menuItem: { select: { name: true, price: true } }, // ดึงชื่อและราคาเมนู
            orderItemToppings: { // ดึง topping ของแต่ละ item
              include: { topping: { select: { name: true, priceTopping: true } } },
            },
          },
        },
      },
    });
    // mapเพื่อแปลงข้อมูล order ให้อยู่ในรูปแบบที่ frontend ใช้ง่าย
    const data = orders.map((o) => ({
      order_id: o.order_id,
      status: o.status.toLowerCase(),
      total_price: Number(o.totalPrice),
      created_at: o.createdAt.toISOString(), 
      completed_at: o.completedAt ? o.completedAt.toISOString() : null,
      user_id: o.userId ?? null,
      items: o.orderItems.map((item) => ({
        qty: item.qty,
        total_price_item: Number(item.totalPriceItem),
        menu_name: item.menuItem?.name ?? null,
        toppings: item.orderItemToppings.map((ot) => ot.topping.name),
      })),
    }));

    res.json({
        orders: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid order id" });

    const { status } = req.body as UpdateOrderStatusDTO;
    

    const updated = await prisma.order.update({
      where: { order_id: id },
      data: {
        status: status,
        completedAt: status === OrderStatus.COMPLETED ? new Date() : null,
        // ถ้าเสร็จแล้ว → ใส่เวลาเสร็จ
      },
      select: { order_id: true, status: true, completedAt: true },
      // เลือก field ที่จะ return
    });

    res.json({
      order_id: updated.order_id,
      status: updated.status.toLowerCase(),
      completed_at: updated.completedAt ? updated.completedAt.toISOString() : null,
    });
  } catch (err: any) { //p2025 P2025 เป็น Prisma error code ที่เกิดขึ้นเฉพาะตอน query
    if (err?.code === "P2025") return res.status(404).json({ message: "Order not found" });
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};