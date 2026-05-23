import { Router } from 'express';
import { handlePaddle, handleSlack } from '../controllers/webhook.controller.js';

const webhookRouter = Router();

webhookRouter.post('/paddle', handlePaddle);
webhookRouter.post('/slack', handleSlack);

export default webhookRouter;