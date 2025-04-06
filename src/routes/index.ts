import { Router } from "express";
import userRoutes from "./auth.route";
import botRoutes from "./bot.route";
import chatRoutes from "./chat.route";

const router = Router();

router.use("/user", userRoutes);
router.use("/bot", botRoutes);
router.use("/chat", chatRoutes);

export default router;