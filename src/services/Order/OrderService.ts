import { parse } from "path"
import OrderRepository from "../../repository/Order/OrderRepository"
import MovieRepository from "../../repository/Movies/MovieRepository"
import GetMoviesService from "../Movies/GetMoviesService"
import OrderTicketService from "../Order Ticket/OrderTicketService"

type OrderDetailItem = {
    type: number,
    orderDetailId: number,
    value: string
}

type OrderForCus = {
    movieName: string | null,
    movieImage: string | null,
    orderDetails: OrderDetailItem[]
}

type OrderForCustomer = {
    [key : number | string] : OrderForCus
}

type foodList = {
    [key : number] : number,
}

type OrderResponse = {
    [key : number] : {
        movieTitle: string | null,
        movieImage: string | null,
        food: string[],
        seats: string[]
    }
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
    const filmSchedule = await OrderTicketService.getMovieScheduleById(orders?.movieScheduleId!)
    const film = await GetMoviesService.getMovieById(filmSchedule?.filmId!)
    // const response = await Promise.all([
    //     OrderRepository.getSeatingOrderDetailByOrderDetailId(orderDetailId),
    //     OrderTicketService.getMovieScheduleById(orders?.movieScheduleId!),
    //     GetMoviesService.getMovieById(filmSchedule?.filmId!)
    // ])
    return {
        value: orders?.value,
        movieScheduleId: orders?.movieScheduleId,
        orderDetailId: orders?.orderDetailId,
        filmName: film?.name,
        filmImage: film?.image
    }
}

const getOrderByCustomerId = async (customerId: number) => {
    const response: OrderForCustomer = {}
    const orders = await getOrderFromUserId(customerId)
    for(const order of orders) {
        if(!response[order.id]){
            response[order.id] = {
                movieName: null,
                movieImage: null,
                orderDetails: []
            }
        }
        const orderDetails = await getOrderDetailByOrderId(order.id)
        for(const orderDetail of orderDetails){
            if(orderDetail.food === null && orderDetail.combo === null){
                const seatingOrderDetail = await getSeatingOrderDetailByOrderDetailId(orderDetail.id)
                if(response[order.id].movieName == null) {
                    response[order.id].movieName = seatingOrderDetail.filmName!
                    response[order.id].movieImage = seatingOrderDetail.filmImage!
                }
                response[order.id].orderDetails.push({
                    type: 1,
                    orderDetailId: orderDetail.id,
                    value: seatingOrderDetail?.value || ''
                })
            } else if (orderDetail.food !== null){
                response[order.id].orderDetails.push({
                    type: 2,
                    orderDetailId: orderDetail.id,
                    value: orderDetail.food.name || ''
                })
            } else {
                response[order.id].orderDetails.push({
                    type: 2,
                    orderDetailId: orderDetail.id,
                    value: orderDetail.combo?.name || ''
                })
            }
        }
    }

    const res: OrderResponse = {}
    Object.keys(response).forEach((key) => {
        const keyNum = parseInt(key)
        const food = []
        const seats = []
        for(const orderDetail of response[key].orderDetails){
            if(orderDetail.type === 2){
                food.push(orderDetail.value)
            } else {
                seats.push(orderDetail.value)
            }
        }
        res[keyNum] = {
            movieTitle: response[key].movieName,
            movieImage: response[key].movieImage,
            food: food,
            seats: seats
        }
    })
    
    return res
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