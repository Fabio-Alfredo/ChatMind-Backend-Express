import { Router } from "express";
import * as chatController from "../controllers/chat.controller";
import validatorMiddleware from "../middleware/validator.middleware";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";
import { createValidator, findByIdValidator, updateValidator, createMessagesValidator } from "../validators/chat.validator";

const chatRoutes = Router();

chatRoutes.post(
    "/create",
    authMiddleware,
    roleMiddleware(["user"]),
    createValidator,
    validatorMiddleware,
    chatController.createChat
);

chatRoutes.post(
    "/messages",
    authMiddleware,
    createMessagesValidator,
    validatorMiddleware,
    chatController.createChatMessage
)

chatRoutes.get(
    "/findId/:id",
    authMiddleware,
    roleMiddleware(["user"]),
    findByIdValidator,
    validatorMiddleware,
    chatController.findChatById
);
chatRoutes.get(
    "/findAll",
    authMiddleware,
    roleMiddleware(["user"]),
    updateValidator,
    validatorMiddleware,
    chatController.findAllByUserId
);

chatRoutes.put(
    "/update/:id",
    authMiddleware,
    roleMiddleware(["user"]),
    findByIdValidator,
    updateValidator,
    validatorMiddleware,
    chatController.updateChat
);
chatRoutes.delete(
    "/delete/:id",
    authMiddleware,
    roleMiddleware(["user"]),
    findByIdValidator,
    validatorMiddleware,
    chatController.deleteChat
);


export default chatRoutes;