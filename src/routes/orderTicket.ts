import express, {Router} from 'express';
import OrderTicketController from '../controllers/Order Ticket/OrderTicketController';
import isAuthenticated from '../middleware/auth';
const orderTicketRouter: Router = express.Router();

orderTicketRouter.use(isAuthenticated)

orderTicketRouter.post('/createMovieSchedule', OrderTicketController.createMovieSchedule)

orderTicketRouter.get('/getMovieScheduleByFilmId/:id', OrderTicketController.getMovieScheduleByFilmId)

orderTicketRouter.post('/orderTicket', OrderTicketController.orderTicket)

orderTicketRouter.get('/getOrderByCustomerId/:id', OrderTicketController.getOrderByCustomerId)

orderTicketRouter.get('/getSeatingOrderDetailByMovieSchedule/:id', OrderTicketController.getSeatingOrderDetailByMovieSchedule)

export default orderTicketRouter;