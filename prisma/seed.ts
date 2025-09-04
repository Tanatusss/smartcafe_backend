import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ---- MenuItem ----
  await prisma.menuItem.createMany({
    data: [
  {
    name: "Caffe Americano",
    price: 55.0,
    img: "https://images.unsplash.com/photo-1681026859292-58c3b2041bfd?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=300&h=200&q=80"
  },
  {
    name: "Cappuccino",
    price: 60.0,
    img: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Latte",
    price: 65.0,
    img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Flat White",
    price: 70.0,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Caramel Macchiato",
    price: 75.0,
    img: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Mocha Frappuccino",
    price: 80.0,
    img: "https://images.unsplash.com/photo-1698951929463-d43978aaf0b5?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Iced Brown Sugar Oatmilk Shaken Espresso",
    price: 85.0,
    img: "https://images.unsplash.com/photo-1527678357412-ef45dfbd9ecc?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Pumpkin Spice Latte",
    price: 90.0,
    img: "https://plus.unsplash.com/premium_photo-1666308424870-18c3df15dffb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Strawberry Acai Refresher",
    price: 95.0,
    img: "https://images.unsplash.com/photo-1647275485937-e82fb6a7b977?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Vanilla Sweet Cream Cold Brew",
    price: 55.0,
    img: "https://images.unsplash.com/photo-1645377370247-c4354ce4d328?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
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
