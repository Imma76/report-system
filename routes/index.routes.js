import express from 'express'
import authController from '../controllers/auth.controller.js';
import userRoutes from './user.routes.js';

const indexRoute = express.Router();

indexRoute.use('/user', userRoutes);
indexRoute.use('/token',authController.getToken);

export default indexRoute;