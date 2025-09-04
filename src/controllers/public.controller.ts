import { Request, Response } from "express";
import { prisma } from "../database/prisma";



export const getMenu = async(req: Request, res: Response) => {
    const menuItems = await prisma.menuItem.findMany({
        select: {
            item_id: true,
            name: true,
            price: true,
            img: true
        }
    });

    res.status(200).json(menuItems);
}



export const getToppings = async(req: Request, res: Response) => {
    const toppingItems = await prisma.topping.findMany({
        select: {
            id: true,
            name: true,
            priceTopping: true,
        }
    });

    res.status(200).json(toppingItems);
}