import { Router } from 'express';
import * as userController from "../controllers/auth.controller";

const userRoutes = Router();

userRoutes.post("/create", userController.createUser);

export default userRoutes;