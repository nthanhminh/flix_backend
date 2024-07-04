import express, {Router} from 'express';
import upload from '../multer/multerStorage';
import FoodController from '../controllers/Order Food/FoodController';
const orderFoodRouter: Router = express.Router();

orderFoodRouter.post('/addFood', upload.fields([{name: 'data', maxCount: 1}]), FoodController.addFood);

orderFoodRouter.post('/addCombo', upload.fields([{name: 'data', maxCount: 1}]), FoodController.addCombo);

orderFoodRouter.get('/getImageFromFoodId/:id', FoodController.getImageFromFoodId)

orderFoodRouter.get('/getImageFromComboId/:id', FoodController.getImageFromComboId)

orderFoodRouter.get('/getImageFromComboId/:id', FoodController.getImageFromComboId)

orderFoodRouter.get('/getAllFood', FoodController.getAllFood)

orderFoodRouter.get('/getAllCombo', FoodController.getAllCombo)

orderFoodRouter.post('/orderFood', FoodController.orderFood)

export default orderFoodRouter