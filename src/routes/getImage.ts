import express, { Router } from 'express'
import MovieController from '../controllers/Movies/MovieController'
import FoodController from '../controllers/Order Food/FoodController'
const getImage: Router = express.Router()

getImage.get('/getImageFromFilmId/:id', MovieController.getImageFromFilmId)

getImage.get('/getImageFromFoodId/:id', FoodController.getImageFromFoodId)

getImage.get('/getImageFromComboId/:id', FoodController.getImageFromComboId)

export default getImage
