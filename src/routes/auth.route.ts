import { Router } from 'express';
import * as userController from "../controllers/auth.controller";
import validatorMiddleware from '../middleware/validator.middleware';
import { registerValidator, loginValidator } from '../validators/auth.validator';

const userRoutes = Router();

userRoutes.post(
    "/create",
    registerValidator,
    validatorMiddleware,
    userController.createUser
);

userRoutes.post(
    "/login",
    loginValidator,
    validatorMiddleware,
    userController.loginUser
);

userRoutes.post(
    "/auth/google",
    userController.googleAuth
)
export default userRoutes;