import FoodRepository from "../../repository/Order Food/FoodRepository";
import OrderRepository from "../../repository/Order/OrderRepository";
import OrderService from "../Order/OrderService";
import dotenv from 'dotenv'
import {foodList} from '../../types/orderRequest'

dotenv.config()

const BASE_URL = process.env.BASE_URL

const addFood = async(name: string, price: string, image: Buffer): Promise<string> => {
    try {
        const newFood = await FoodRepository.addFood(name, price, image);
        if(newFood){
            return 'Add food successfully!'
        }
        return 'Error occurred while creating new food. Please try again later !'
    } catch (error) {
        console.error(error);
        return 'Error occurred while creating new food. Please try again later !'
    }

}

const addCombo = async(name: string, price: string, image: Buffer): Promise<string> => {
    try {
        const newCombo = await FoodRepository.addCombo(name, price, image);
        if(newCombo){
            return 'Add food successfully!'
        }
        return 'Error occurred while creating new food. Please try again later !'
    } catch (error) {
        console.error(error);
        return 'Error occurred while creating new food. Please try again later !'
    }
}

const getImageFromFoodId = async(id:number) : Promise<Buffer | null> => {
    const image = await FoodRepository.getImageFromFoodId(id)
    return image
}

const getImageFromComboId = async(id:number) : Promise<Buffer | null> => {
    const image = await FoodRepository.getImageFromComboId(id)
    return image
}

const getAllFood = async() => {
    const foods = await FoodRepository.getAllFood()
    const result = foods.map((food) => {
        return {
            ...food,
            image: `${BASE_URL}/foods/getImageFromFoodId/${food.id}`
        }
    })
    return result
}

const getAllCombo = async() => {
    const combos = await FoodRepository.getAllCombo()
    const result = combos.map((combo) => {
        return {
            ...combo,
            image: `${BASE_URL}/foods/getImageFromFoodId/${combo.id}`
        }
    })
    return result
}

const orderFood = async(customerId: number, totalPrice: string, foodIdList: foodList, comboIdList: foodList ) => {
   const newOrder = await OrderRepository.addIntoOrder(customerId, totalPrice)
   const orderId: number = newOrder!.id
   const response = await Promise.all([OrderService.addFoodIntoOrderDetail(orderId, foodIdList), OrderService.addComboIntoOrderDetail(orderId, comboIdList)])
   if(response){
    return "Successfully"
   }
   return "Error occured when creating new order"
   
}


export default {
    addFood,
    addCombo,
    getImageFromFoodId,
    getImageFromComboId,
    getAllFood,
    getAllCombo,
    orderFood
}