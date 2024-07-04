import express, {Router} from 'express';
import OrderTicketController from '../controllers/Order Ticket/OrderTicketController';
const orderTicketRouter: Router = express.Router();

orderTicketRouter.post('/createMovieSchedule', OrderTicketController.createMovieSchedule)

orderTicketRouter.get('/getMovieScheduleByFilmId', OrderTicketController.getMovieScheduleByFilmId)

orderTicketRouter.post('/orderTicket', OrderTicketController.orderTicket)

orderTicketRouter.get('/getOrderByCustomerId', OrderTicketController.getOrderByCustomerId)

orderTicketRouter.get('/getSeatingOrderDetailByMovieSchedule', OrderTicketController.getSeatingOrderDetailByMovieSchedule)

export default orderTicketRouter;