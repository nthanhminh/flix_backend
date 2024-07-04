import { Combo, Food, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const addFood = async (name: string, price: string, image: Buffer) => {
    try {
        const newFood:Food = await prisma.food.create({
            data: {
                name,
                price,
                image
            }
        })

        return newFood
    } catch (error) {
        console.error(error)
    }
}

const addCombo =  async (name: string, price: string, image: Buffer) => {
    try {
        const newCombo: Combo = await prisma.combo.create({
            data: {
                name,
                price,
                image
            }
        })
        return newCombo
    } catch (error) {
        console.error(error)
    }
}

const getImageFromFoodId = async(id:number) : Promise<Buffer | null> => {
    try {
        const food: Food|null = await prisma.food.findFirst({
            where: {
                id: id
            }
        })
        return food!.image
    } catch (error) {
        console.error(error)
        return null;
    }
}

const getImageFromComboId = async(id:number) : Promise<Buffer | null> => {
    try {
        const combo: Combo|null = await prisma.combo.findFirst({
            where: {
                id: id
            }
        })
        return combo!.image
    } catch (error) {
        console.error(error)
        return null;
    }
}

const getAllFood = async(): Promise<Food[]> => {
    try {
        const foods: Food[] = await prisma.food.findMany()
        return foods
    } catch (error) {
        console.error(error)
        return []
    }
}

const getAllCombo = async(): Promise<Combo[]> => {
    try {
        const combos: Combo[] = await prisma.combo.findMany()
        return combos
    } catch (error) {
        console.error(error)
        return []
    }
}


export default {
    addCombo,
    addFood,
    getImageFromFoodId,
    getImageFromComboId,
    getAllFood,
    getAllCombo,
}