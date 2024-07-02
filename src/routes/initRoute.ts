import express, { Request, Response } from 'express';

const initRouter = express.Router();

initRouter.get('/', (req: Request, res: Response) => {
    res.send("Welcome to flix backend");
});

export default initRouter;
