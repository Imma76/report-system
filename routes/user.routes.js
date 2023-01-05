import express from 'express'
import authController from '../controllers/auth.controller.js';
import formid from '../middlewares/image.middlewares.js';
import { check,body } from 'express-validator/check/index.js';
const userRoutes = express.Router();

userRoutes.post('/', [check('email').isEmail().withMessage('enter a valid email'), body('password', 'password should contain letters and numbers').isLength({ min: 5 }).isAlphanumeric(), body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords have to match');
    }
    return true;
})],authController.createUser);
userRoutes.post('/login', authController.loginUser);
// userRoutes.post('/imageUpload',formid, authController.uploadImage);

// userRoutes.delete('/imageDelete/:imageName', authController.deleteImage);


export default userRoutes;