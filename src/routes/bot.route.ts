import * as botController from '../controllers/bot.controller';
import { Router } from 'express';
import { createValidator, updateValidator, findByIdValidator } from '../validators/bot.validator';
import validatorMiddleware from '../middleware/validator.middleware';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post(
    '/create',
    authMiddleware,
    roleMiddleware(["admin"]),
    createValidator,
    validatorMiddleware,
    botController.createBot
);
router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(["admin"]),
    findByIdValidator,
    validatorMiddleware,
    botController.findBotById
);

router.get(
    '/',
    authMiddleware,
    roleMiddleware(["admin"]),
    botController.findAll
);
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(["admin"]),
    findByIdValidator,
    createValidator,
    validatorMiddleware,
    botController.updateBot
);

router.patch(
    "desactivate/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    findByIdValidator,
    validatorMiddleware,
    botController.desactivateBot
)

export default router;