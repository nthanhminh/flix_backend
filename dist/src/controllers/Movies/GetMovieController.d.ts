import { Request, Response } from "express";
declare const _default: {
    getTop10FilmCurrentShowing: (req: Request, res: Response) => Promise<void>;
    getTop10FilmComingSoon: (req: Request, res: Response) => Promise<void>;
    searchMovie: (req: Request, res: Response) => Promise<void>;
};
export default _default;
