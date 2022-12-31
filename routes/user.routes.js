import express from 'express'
import authController from '../controllers/auth.controller.js';
import formid from '../middlewares/image.middlewares.js';

const userRoutes = express.Router();

userRoutes.post('/', authController.createUser);
userRoutes.post('/login', authController.loginUser);
userRoutes.post('/imageUpload',formid, authController.uploadImage);

userRoutes.delete('/imageDelete/:imageName', authController.deleteImage);


export default userRoutes;