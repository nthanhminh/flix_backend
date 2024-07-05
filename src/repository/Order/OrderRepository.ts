import { Combo, Food, Order, OrderDetail, PrismaClient, SeatingOrderDetail } from "@prisma/client";

const prisma = new PrismaClient()

const addIntoOrder = async(customerId: number, totalPrice: string) => {
    try {
        const newOrder = await prisma.order.create({
            data: {
                customerId,
                totalPrice,
                date: new Date()
            }
        })

        return newOrder
    } catch (error) {
        console.error(error)
        return null;
    }
}

const addIntoOrderDetail = async (orderId: number, foodId: number | null, comboId: number | null, quantity: number) => {
    try {
        const newOrderDetail = await prisma.orderDetail.create({
            data: {
                orderId,
                foodId,
                comboId,
                quantity
            }
        })

        return newOrderDetail
    } catch (error) {
        console.error(error)
        return null
    }
}

const addIntoSeatingOrderDetail = async (orderDetailId: number, value: string, movieScheduleId: number) => {
    try {
        const newSeatingOrderDetail = await prisma.seatingOrderDetail.create({
            data: {
                orderDetailId,
                value,
                movieScheduleId
            }
        })

        return newSeatingOrderDetail
    } catch (error) {
        console.error(error)
        return null
    }
}

const getOrderFromUserId = async (customerId: number) : Promise<Order[]> => {
    try {
        const orders = await prisma.order.findMany({
            where: { customerId}
        })
        return orders
    } catch (error) {
        console.error(error)
        return []
    }
}

const getOrderDetailByOrderId = async (orderId: number) => {
    try {
        const orderDetails  = await prisma.orderDetail.findMany({
            where: {
                orderId,
            },
            include: {
                food: true,
                combo: true
            }
        })

        return orderDetails
    } catch (error) {
        console.error(error)
        return []
    }
}

const getSeatingOrderDetailByOrderDetailId = async (orderDetailId: number) : Promise<SeatingOrderDetail | null> => {
    try {
        const seatingOrderDetail: SeatingOrderDetail | null = await prisma.seatingOrderDetail.findFirst(
            {
                where: {
                    orderDetailId
                }
            }
        )
        return seatingOrderDetail
    } catch (error) {
        console.error(error)
        return null
    }
}

const getSeatingOrderDetailByMovieSchedule = async (movieScheduleId: number) : Promise<SeatingOrderDetail[]> => {
    try {
        const seatingOrderDetail: SeatingOrderDetail[] = await prisma.seatingOrderDetail.findMany(
            {
                where: {
                    movieScheduleId
                }
            }
        )
        return seatingOrderDetail
    } catch (error) {
        console.error(error)
        return []
    }
}

export default {
    addIntoOrder,
    addIntoOrderDetail,
    addIntoSeatingOrderDetail,
    getOrderFromUserId,
    getOrderDetailByOrderId,
    getSeatingOrderDetailByOrderDetailId,
    getSeatingOrderDetailByMovieSchedule
}