import UserService from "../../services/User/UserService";
import { Request, Response } from "express";

const register = async(req: Request, res: Response) => {
    const {userName, password} = req.body
    const respone: string|null = await UserService.register(userName, password)
    switch(respone) {
        case "Error occurred. Please try again later !":
            res.send(500).send("Internal Server Error")
            break;
        default:
            res.status(200).send(respone)
    }
}

export default {
    register
}