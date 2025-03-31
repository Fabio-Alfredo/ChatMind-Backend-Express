import * as botController from '../controllers/bot.controller';
import { Router } from 'express';
import { createValidator } from '../validators/bot.validator';
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
router.get('/:id', botController.findBotById);

export default router;