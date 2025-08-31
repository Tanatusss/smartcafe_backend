import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { MenuValidator } from "../validators/baristar.validator";


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

