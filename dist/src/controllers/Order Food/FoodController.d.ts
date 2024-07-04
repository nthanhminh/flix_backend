import { Request, Response } from "express";
declare const _default: {
    addFood: (req: Request, res: Response) => Promise<void>;
    addCombo: (req: Request, res: Response) => Promise<void>;
    getImageFromComboId: (req: Request, res: Response) => Promise<void>;
    getImageFromFoodId: (req: Request, res: Response) => Promise<void>;
    getAllFood: (req: Request, res: Response) => Promise<void>;
    getAllCombo: (req: Request, res: Response) => Promise<void>;
    orderFood: (req: Request, res: Response) => Promise<void>;
};
export default _default;
