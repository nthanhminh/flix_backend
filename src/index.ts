import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initRouter from "./routes/initRoute";
import auth from './routes/auth'
import movieRouter from "./routes/movies";
import orderFood from "./routes/orderFood"
import orderTicketRouter from "./routes/orderTicket";
import bodyParser from "body-parser";
import cors from 'cors'

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

configViewEngine(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use('/', initRouter)

app.use('/auth', auth)

app.use('/movies', movieRouter)

app.use('/foods', orderFood)

app.use('/orderTicket', orderTicketRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});