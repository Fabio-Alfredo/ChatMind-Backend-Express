import { Router } from 'express';
import * as userController from "../controllers/auth.controller";
import validatorMiddleware from '../middleware/validator.middleware';
import { registerValidator } from '../validators/auth.validator';

const userRoutes = Router();

userRoutes.post(
    "/create",
    registerValidator,
    validatorMiddleware,
    userController.createUser
);

userRoutes.post(
    "/login",
    userController.loginUser
);
export default userRoutes;