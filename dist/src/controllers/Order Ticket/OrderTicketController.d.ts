import { Request, Response } from 'express';
declare const _default: {
    createMovieSchedule: (req: Request, res: Response) => Promise<void>;
    getMovieScheduleByFilmId: (req: Request, res: Response) => Promise<void>;
    orderTicket: (req: Request, res: Response) => Promise<void>;
    getOrderByCustomerId: (req: Request, res: Response) => Promise<void>;
    getSeatingOrderDetailByMovieSchedule: (req: Request, res: Response) => Promise<void>;
};
export default _default;
