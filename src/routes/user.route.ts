import { Router } from 'express';
import * as userController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/create", userController.createUser);

export default userRoutes;