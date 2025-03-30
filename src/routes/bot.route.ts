import * as botController from '../controllers/bot.controller';
import { Router } from 'express';
import { createValidator } from '../validators/bot.validator';
import validatorMiddleware from '../middleware/validator.middleware';

const router = Router();

router.post(
    '/create',
    createValidator,
    validatorMiddleware,
    botController.createBot
);
router.get('/:id', botController.findBotById);

export default router;