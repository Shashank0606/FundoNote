import express from 'express';
import * as userController from '../controllers/user.controller';
import { LoginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth, userAuthforget } from '../middlewares/auth.middleware';
import { services } from '../services/user.service'

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.newUser);

// login
router.post('/login', userController.login);

// forget password
router.post("/forgetPass", userController.forgetPassword)

// Reset password
router.post("/reset/:token", userAuthforget, userController.resetPassword)

export default router;
