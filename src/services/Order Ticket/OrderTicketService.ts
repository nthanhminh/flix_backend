import OrderTicketRepository from "../../repository/Order Ticket/OrderTicketRepository";
import { foodList } from "../../types/orderRequest";
import OrderService from "../Order/OrderService";

const createMovieSchedule = async(filmId:number, dateStr:string, hour:number, minute:number, location: number) => {
    const check = await OrderTicketRepository.getMovieScheduleByTime(dateStr, location)
    if(check && !compareMovieTime(hour, check.hour, minute, check.minute)){
        return 'Showtimes overlap!'
    }
    const response = await OrderTicketRepository.createMovieSchedule(filmId, dateStr, hour, minute, location)
    return response
}

const compareMovieTime = (hour1: number, hour2: number, minute1: number, minute2: number) => {
    const time1 = hour1 * 60 + minute1 
    const time2 = hour2 * 60 + minute2
    return Math.abs(time1 - time2) >= 180
}

const getMovieScheduleByFilmId = async(filmId:number) => {
    const movieSchedules = await OrderTicketRepository.getMovieScheduleByFilmId(filmId)
    const groupedSchedules = movieSchedules!.reduce((group, schedule) => {
        const time = schedule.time.toString(); // Convert to ISO string to use as a key
        const date:Date = new Date(time)
        const now: Date = new Date()
        date.setHours(schedule.hour, schedule.minute, 0 ,0)
        if(date < now){
            return group;
        }
        if (!group[time]) {
            group[time] = [];
        }
        group[time].push(schedule);
        return group;
    }, {} as Record<string, typeof movieSchedules>);

    return groupedSchedules;
}

const orderTicket = async (customerId: number, totalPrice: string, movieScheduleId: number, foodIdList: foodList, comboIdList: foodList, values: string[]) => {
    const newOrder = await OrderService.addIntoOrder(customerId, totalPrice)
    const orderId = newOrder!.id
    const response = await Promise.all([
        OrderService.addFoodIntoOrderDetail(orderId, foodIdList),
        OrderService.addComboIntoOrderDetail(orderId, comboIdList),
        OrderService.addSeatIntoSeatingOrderDetail(orderId, values, movieScheduleId)
    ])
    if(response){
        return 'Successfully !'
    }
    return 'Error occured when creatin new order !'
}

export default {
    createMovieSchedule,
    getMovieScheduleByFilmId,
    orderTicket
}