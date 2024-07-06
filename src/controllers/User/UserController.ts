import UserService from "../../services/User/UserService";
import { Request, Response } from "express";

const register = async(req: Request, res: Response) => {
    try {
        const {userName, password} = req.body
        const respone: Object|null = await UserService.register(userName, password)
        res.status(200).send(JSON.stringify(respone))
    } catch (error) {
        res.status(400).send(error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const {userName, password} = req.body
        const respone: Object|null = await UserService.login(userName, password)
        res.status(200).send(JSON.stringify(respone))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export default {
    register,
    login
}