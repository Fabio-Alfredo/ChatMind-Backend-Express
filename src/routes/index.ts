import { Router } from "express";
import userRoutes from "./auth.route";
import botRoutes from "./bot.route";

const router = Router();

router.use("/user", userRoutes);
router.use("/bot", botRoutes);

export default router;