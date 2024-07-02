import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initRouter from "./routes/initRoute";
dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

configViewEngine(app)

app.use('/', initRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});