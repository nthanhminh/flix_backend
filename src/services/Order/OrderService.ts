import { parse } from "path"
import OrderRepository from "../../repository/Order/OrderRepository"

type OrderDetailItem = {
    orderDetailId: number,
    value: string
}

type OrderForCustomer = {
    [key : number] : OrderDetailItem[]
}

type foodList = {
    [key : number] : number,
}

const addFoodIntoOrderDetail = async(orderId: number,foodIdList: foodList) => {
    // foodIdList.forEach(async (foodId: number) => {
    //     await OrderRepository.addIntoOrderDetail(orderId, foodId, null)
    // })

    Object.keys(foodIdList).forEach(async (foodId: string) => {
        const id = parseInt(foodId)
        await OrderRepository.addIntoOrderDetail(orderId, id, null, foodIdList[id])
    })
}

const addComboIntoOrderDetail = async(orderId: number,comboIdList: foodList) => {
    // comboIdList.forEach(async (comboId: number) => {
    //     await OrderRepository.addIntoOrderDetail(orderId, null, comboId)
    // })

    Object.keys(comboIdList).forEach(async (foodId: string) => {
        const id = parseInt(foodId)
        await OrderRepository.addIntoOrderDetail(orderId, null, id, comboIdList[id])
    })
}

const addSeatIntoSeatingOrderDetail = async(orderId: number, seatingOrderDetail: string[], movieScheduleId: number) => {
    seatingOrderDetail.forEach(async(value:string) => {
        const newOrderDetail = await OrderRepository.addIntoOrderDetail(orderId, null, null, 1)
        const orderDetailId = newOrderDetail!.id
        await OrderRepository.addIntoSeatingOrderDetail(orderDetailId, value, movieScheduleId)
    })
}

const addIntoOrder = async (customerId: number, totalPrice: string) => {
    const newOrder = await OrderRepository.addIntoOrder(customerId, totalPrice)
    return newOrder
}

const getOrderFromUserId = async (customerId: number) => {
    const orders = await OrderRepository.getOrderFromUserId(customerId)
    return orders
}

const getOrderDetailByOrderId = async (orderId: number) => {
    const orders = await OrderRepository.getOrderDetailByOrderId(orderId)
    return orders
}

const getSeatingOrderDetailByOrderDetailId = async (orderDetailId: number) => {
    const orders = await OrderRepository.getSeatingOrderDetailByOrderDetailId(orderDetailId)
    return orders
}

const getOrderByCustomerId = async (customerId: number) => {
    const response: OrderForCustomer = {}
    const orders = await getOrderFromUserId(customerId)
    for(const order of orders) {
        if(!response[order.id]){
            response[order.id] = []
        }
        const orderDetails = await getOrderDetailByOrderId(order.id)
        for(const orderDetail of orderDetails){
            if(orderDetail.food === null && orderDetail.combo === null){
                const seatingOrderDetail = await getSeatingOrderDetailByOrderDetailId(orderDetail.id)
                response[order.id].push({
                    orderDetailId: orderDetail.id,
                    value: seatingOrderDetail?.value || ''
                })
            } else if (orderDetail.food !== null){
                response[order.id].push({
                    orderDetailId: orderDetail.id,
                    value: orderDetail.food.name || ''
                })
            } else {
                response[order.id].push({
                    orderDetailId: orderDetail.id,
                    value: orderDetail.combo?.name || ''
                })
            }
        }
    }

    return response
}

const getSeatingOrderDetailByMovieSchedule = async(movieScheduleId: number) => {
    const seats = await OrderRepository.getSeatingOrderDetailByMovieSchedule(movieScheduleId)
    const response = seats.map((seat) => seat.value)
    return response
}

export default {
    addFoodIntoOrderDetail,
    addComboIntoOrderDetail,
    addSeatIntoSeatingOrderDetail,
    addIntoOrder,
    getOrderFromUserId,
    getOrderDetailByOrderId,
    getSeatingOrderDetailByOrderDetailId,
    getOrderByCustomerId,
    getSeatingOrderDetailByMovieSchedule
}