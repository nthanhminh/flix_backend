import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initRouter from "./routes/initRoute";
import auth from './routes/auth'
import movieRouter from "./routes/movies";
import orderFood from "./routes/orderFood"
import orderTicketRouter from "./routes/orderTicket";
import getImage from './routes/getImage'
import bodyParser from "body-parser";
import cors from 'cors'

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};

const app: Express = express();

const port = process.env.PORT || 3000;

configViewEngine(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions))

app.use('/', initRouter)

app.use('/auth', auth)

app.use('/movies', movieRouter)

app.use('/foods', orderFood)

app.use('/orderTicket', orderTicketRouter)

app.use('/images', getImage)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});