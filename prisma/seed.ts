import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ---- MenuItem ----
  await prisma.menuItem.createMany({
    data: [
      { name: "Espresso",          price: 45.0, img: "https://picsum.photos/seed/espresso/300/200" },
      { name: "Americano",         price: 50.0, img: "https://picsum.photos/seed/americano/300/200" },
      { name: "Cappuccino",        price: 65.0, img: "https://picsum.photos/seed/cappuccino/300/200" },
      { name: "Latte",             price: 60.0, img: "https://picsum.photos/seed/latte/300/200" },
      { name: "Mocha",             price: 70.0, img: "https://picsum.photos/seed/mocha/300/200" },
      { name: "Matcha Latte",      price: 75.0, img: "https://picsum.photos/seed/matcha/300/200" },
      { name: "Thai Milk Tea",     price: 55.0, img: "https://picsum.photos/seed/thaitea/300/200" },
      { name: "Chocolate Frappe",  price: 80.0, img: "https://picsum.photos/seed/chocofrappe/300/200" },
      { name: "Caramel Macchiato", price: 75.0, img: "https://picsum.photos/seed/caramel/300/200" },
      { name: "Iced Lemon Tea",    price: 50.0, img: "https://picsum.photos/seed/lemontea/300/200" }
    ],
    skipDuplicates: true,
  });

  // ---- Topping ----
  await prisma.topping.createMany({
    data: [
      { name: "Whipped Cream", priceTopping: 10.0 },
      { name: "Caramel Drizzle", priceTopping: 15.0 },
      { name: "Chocolate Syrup", priceTopping: 12.0 },
      { name: "Extra Shot Espresso", priceTopping: 20.0 },
      { name: "Soy Milk", priceTopping: 8.0 },
      { name: "Almond Milk", priceTopping: 12.0 },
      { name: "Tapioca Pearls", priceTopping: 15.0 }
    ],
    skipDuplicates: true,
  });

  console.log("Seed data for MenuItem and Topping inserted");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
