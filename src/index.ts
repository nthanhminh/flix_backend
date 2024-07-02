import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initRouter from "./routes/initRoute";
import auth from './routes/auth'
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const prismaClient:PrismaClient = new PrismaClient()

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

configViewEngine(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', initRouter)

app.use('/auth', auth)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});