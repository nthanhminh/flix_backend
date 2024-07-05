import OrderTicketService from "../../services/Order Ticket/OrderTicketService";
import {Request, Response} from 'express'
import OrderService from "../../services/Order/OrderService";
import { foodList } from "../../types/orderRequest";
const createMovieSchedule = async(req: Request, res: Response) => {
    const {filmId, dateStr, hour, minute, location} = req.body
    const response = await OrderTicketService.createMovieSchedule(filmId, dateStr, hour, minute, location)
    res.send(response)
}

const getMovieScheduleByFilmId = async(req: Request, res: Response) => {
    const filmId = parseInt(req.params.id);

    if (isNaN(filmId)) {
        res.status(400).send('Invalid filmId format');
        return;
    }
    const movieSchedules = await OrderTicketService.getMovieScheduleByFilmId(filmId)
    res.status(200).send(JSON.stringify(movieSchedules))
}

const orderTicket = async(req: Request, res: Response) => {
    const {customerId, totalPrice, movieScheduleId, foodIdList, comboIdList, values} = req.body as {
        customerId: number, 
        totalPrice: string, 
        movieScheduleId: number, 
        foodIdList: foodList, 
        comboIdList: foodList, 
        values: string[]
    }

    const response = await OrderTicketService.orderTicket(customerId, totalPrice, movieScheduleId, foodIdList, comboIdList, values)

    res.send(response)
}

const getOrderByCustomerId = async(req: Request, res: Response) => {

    const customerId = parseInt(req.params.id);

    if (isNaN(customerId)) {
        res.status(400).send('Invalid filmId format');
        return;
    }
    // const {customerId} = req.body as {customerId : number}

    const response = await OrderService.getOrderByCustomerId(customerId)

    res.send(JSON.stringify(response))
}

const getSeatingOrderDetailByMovieSchedule = async(req: Request, res: Response) => {
    const movieScheduleId = parseInt(req.params.id);

    if (isNaN(movieScheduleId)) {
        res.status(400).send('Invalid filmId format');
        return;
    }
    // const {movieScheduleId} = req.body as {movieScheduleId : number}

    const response = await OrderService.getSeatingOrderDetailByMovieSchedule(movieScheduleId)

    res.send(JSON.stringify(response))
}

export default {
    createMovieSchedule,
    getMovieScheduleByFilmId,
    orderTicket,
    getOrderByCustomerId,
    getSeatingOrderDetailByMovieSchedule
}