import { Request, NextFunction, Response } from "express"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
import UserService from "../services/User/UserService";
dotenv.config()

const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers

        if(!authorization){
            throw new Error('Un-Authorized')
        }        

        try {
            const accessToken = authorization.toString().split(' ')[1];
            const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
                userName: string,
                userId: number
            };
            const user = await UserService.getUserByUserNameAndId(payload.userName, payload.userId)
            if(!user) {
                throw new Error("Unauthorized")
            }
        } catch (err: any) {
            res.status(401);
            if (err.name === 'TokenExpiredError') {
                throw new Error(err.name);
            }
            throw new Error('🚫 Un-Authorized 🚫');
        }

        next()
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

export default isAuthenticated