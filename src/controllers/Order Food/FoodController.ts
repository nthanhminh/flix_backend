import FoodService from "../../services/Order Food/FoodService";
import fs from 'fs'
import path from "path";
import { Request, Response } from "express";
import { foodList } from "../../types/orderRequest";
interface MulterRequest extends Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
}

const addFood = async (req: Request, res: Response) => {
    try {
        const multerReq = req as MulterRequest;
        const {name, price} = multerReq.body
        const fileName = multerReq.files?.['data'][0].filename
        const image = fs.readFileSync(path.join(__dirname, '../../uploads', fileName!));
        if(!image){
            res.status(400).send('Please upload a file')
        }
        const response = await FoodService.addFood(name, price, image)
        if(response === 'Error occurred while creating new food. Please try again later !'){
            res.status(404).send(response)
        }  else{
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const addCombo = async (req: Request, res: Response) => {
    try {
        const multerReq = req as MulterRequest;
        const {name, price} = multerReq.body
        const fileName = multerReq.files?.['data'][0].filename
        const image = fs.readFileSync(path.join(__dirname, '../../uploads', fileName!));
        if(!image){
            res.status(400).send('Please upload a file')
        }
        const response = await FoodService.addCombo(name, price, image)
        if(response === 'Error occurred while creating new food. Please try again later !'){
            res.status(404).send(response)
        }  else{
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getImageFromComboId = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            res.status(400).send('Invalid ID format');
            return;
        }
        const image = await FoodService.getImageFromComboId(id)
        if (image) {
            res.setHeader('Content-Type', 'image/jpeg'); 
            res.send(image);
        } else {
            res.status(404).send('Film not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getImageFromFoodId = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            res.status(400).send('Invalid ID format');
            return;
        }
        const image = await FoodService.getImageFromFoodId(id)
        if (image) {
            res.setHeader('Content-Type', 'image/jpeg'); 
            res.send(image);
        } else {
            res.status(404).send('Film not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllFood = async(req: Request, res: Response) => {
    const foods = await FoodService.getAllFood()
    if(foods.length == 0){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(JSON.stringify(foods))
    }
}

const getAllCombo = async(req: Request, res: Response) => {
    const foods = await FoodService.getAllCombo()
    if(foods.length == 0){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(JSON.stringify(foods))
    }
}

const orderFood = async(req: Request, res: Response) => {
    try {
        const {customerId, totalPrice, foodIdList, comboIdList} = req.body as {
            customerId: number;
            totalPrice: string;
            foodIdList: foodList;
            comboIdList: foodList;
        }
        const response = await FoodService.orderFood(customerId, totalPrice, foodIdList, comboIdList)
        res.send(response)
    } catch (error) {
        console.error(error)
        res.send("Internal server error")
    }
}

export default {
    addFood,
    addCombo,
    getImageFromComboId,
    getImageFromFoodId,
    getAllFood,
    getAllCombo,
    orderFood
}