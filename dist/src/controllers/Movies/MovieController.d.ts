import { Request, Response } from "express";
declare const _default: {
    createNewMovie: (req: Request, res: Response) => Promise<void>;
    createNewCurrentMovieShowing: (req: Request, res: Response) => Promise<void>;
    createNewMovieComingSoon: (req: Request, res: Response) => Promise<void>;
    deleteMovieCurrentShowing: (req: Request, res: Response) => Promise<void>;
    deleteMovieComingSoon: (req: Request, res: Response) => Promise<void>;
    getImageFromFilmId: (req: Request, res: Response) => Promise<void>;
};
export default _default;
