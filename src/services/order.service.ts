import { PrismaClient, Prisma } from "../../prisma/generated/prisma";
import { CreateOrderDTO } from "../validators/order.validator";
import { HttpError } from "../utils/http-error";

export async function buildOrderPricing(prisma: PrismaClient, data: CreateOrderDTO) {


  //  ดึง item_id ทั้งหมดจาก request
  const itemIds = [...new Set(data.items.map(i => i.item_id))];
  //  ดึง topping_id ทั้งหมดจาก request
  const toppingIds = [...new Set(data.items.flatMap(i => i.toppings ?? []))];

   // query menu และ topping ที่เกี่ยวข้อง จาก DB พร้อมกันด้วย(Promise.all)
  const [menuItems, toppings] = await Promise.all([
    // ดึงเฉพาะเมนูที่ item_id อยู่ใน list
    prisma.menuItem.findMany({ where: { item_id: { in: itemIds } }, select: { item_id: true, price: true }}),
    // ถ้ามี topping ให้ดึงมา ไม่งั้นคืน array ว่าง
    toppingIds.length
      ? prisma.topping.findMany({ where: { id: { in: toppingIds } }, select: { id: true, priceTopping: true }})
      : Promise.resolve([] as { id: number; priceTopping: Prisma.Decimal }[]),
  ]);

    //  แปลงผลลัพธ์เป็น Map เพื่อ lookup เร็วขึ้น
  const menuPrice = new Map(menuItems.map(m => [m.item_id, m.price]));
  const toppingPrice = new Map(toppings.map(t => [t.id, t.priceTopping]));

    // Validate ข้อมูลที่ client ส่งมา
  for (const it of data.items) {
    if (!menuPrice.has(it.item_id)) throw new HttpError(`Menu item not found: ${it.item_id}`, 400);
    if (!Number.isInteger(it.qty) || it.qty <= 0) throw new HttpError(`Invalid qty for item ${it.item_id}`, 400);

    // ถ้ามี topping → ต้องมีใน DB จริง
    for (const tid of it.toppings ?? []) {
      if (!toppingPrice.has(tid)) throw new HttpError(`Topping not found: ${tid}`, 400);
    }
  }

  // คำนวณราคาทั้งหมด และ สร้าง structure สำหรับ create order
  let orderTotal = new Prisma.Decimal(0);
  const orderItemsData = data.items.map(it => {
    const base = menuPrice.get(it.item_id)!;

    // ราคารวม topping
    const topSum = (it.toppings ?? []).reduce((acc, tid) => acc.add(toppingPrice.get(tid)!), new Prisma.Decimal(0));
    // unitPrice = base + topping
    const unitPrice = base.add(topSum);
    // totalPriceItem = unitPrice * qty
    const totalPriceItem = unitPrice.mul(it.qty);
    // บวกเข้าราคารวมของทั้ง order
    orderTotal = orderTotal.add(totalPriceItem);

    return {
      qty: it.qty,
      totalPriceItem,
      menuItem: { connect: { item_id: it.item_id } },
      orderItemToppings: {
        create: (it.toppings ?? []).map(tid => ({ topping: { connect: { id: tid } }})),
      },
    };
  });

  return { orderItemsData, orderTotal };
}