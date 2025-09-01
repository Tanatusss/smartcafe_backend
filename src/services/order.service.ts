import { PrismaClient, Prisma } from "../../prisma/generated/prisma";
import { CreateOrderDTO } from "../validators/order.validator";
import { HttpError } from "../utils/http-error";

export async function buildOrderPricing(prisma: PrismaClient, data: CreateOrderDTO) {
  const itemIds = [...new Set(data.items.map(i => i.item_id))];
  const toppingIds = [...new Set(data.items.flatMap(i => i.toppings ?? []))];

  const [menuItems, toppings] = await Promise.all([
    prisma.menuItem.findMany({ where: { item_id: { in: itemIds } }, select: { item_id: true, price: true }}),
    toppingIds.length
      ? prisma.topping.findMany({ where: { id: { in: toppingIds } }, select: { id: true, priceTopping: true }})
      : Promise.resolve([] as { id: number; priceTopping: Prisma.Decimal }[]),
  ]);

  const menuPrice = new Map(menuItems.map(m => [m.item_id, m.price]));
  const toppingPrice = new Map(toppings.map(t => [t.id, t.priceTopping]));

  for (const it of data.items) {
    if (!menuPrice.has(it.item_id)) throw new HttpError(`Menu item not found: ${it.item_id}`, 400);
    if (!Number.isInteger(it.qty) || it.qty <= 0) throw new HttpError(`Invalid qty for item ${it.item_id}`, 400);
    for (const tid of it.toppings ?? []) {
      if (!toppingPrice.has(tid)) throw new HttpError(`Topping not found: ${tid}`, 400);
    }
  }

  let orderTotal = new Prisma.Decimal(0);
  const orderItemsData = data.items.map(it => {
    const base = menuPrice.get(it.item_id)!;
    const topSum = (it.toppings ?? []).reduce((acc, tid) => acc.add(toppingPrice.get(tid)!), new Prisma.Decimal(0));
    const unitPrice = base.add(topSum);
    const totalPriceItem = unitPrice.mul(it.qty);
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