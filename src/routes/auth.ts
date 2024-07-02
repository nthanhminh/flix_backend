import express, { Request, Response } from 'express';
import UserController from '../controllers/User/UserController';
const auth = express.Router();

auth.post('/register', UserController.register);

export default auth;
