import { Router } from "express";
import userRoutes from "./auth.route";

const router = Router();

router.use("/user", userRoutes);

export default router;