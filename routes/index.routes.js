import express from 'express'
import userRoutes from './user.routes.js';

const indexRoute = express.Router();

indexRoute.use('/user',userRoutes);

export default indexRoute;