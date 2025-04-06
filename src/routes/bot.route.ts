import * as botController from '../controllers/bot.controller';
import { Router } from 'express';
import { createValidator, updateValidator, findByIdValidator } from '../validators/bot.validator';
import validatorMiddleware from '../middleware/validator.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post(
    '/create',
    authMiddleware,
    createValidator,
    validatorMiddleware,
    botController.createBot
);
router.get(
    '/:id',
    authMiddleware,
    findByIdValidator,
    validatorMiddleware,
    botController.findBotById
);

router.get(
    '/',
    authMiddleware,
    botController.findAll
);
router.put(
    '/:id',
    authMiddleware,
    findByIdValidator,
    createValidator,
    validatorMiddleware,
    botController.updateBot
);

export default router;