import * as botController from '../controllers/bot.controller';
import { Router } from 'express';

const router = Router();

router.post('/create', botController.createBot);
router.get('/:id', botController.findBotById);

export default router;