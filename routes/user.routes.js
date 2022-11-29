import express from 'express'
import authController from '../controllers/auth.controller.js';


const userRoutes = express.Router();

userRoutes.post('/', authController.createUser);


export default userRoutes;