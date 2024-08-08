import { Router } from 'express';
import { verifyWebhook, processMessage } from '../controllers/whatsappController.js';

const whatsappRouter = Router();

whatsappRouter.get('/webhook', verifyWebhook);

whatsappRouter.post('/webhook', processMessage);

export default whatsappRouter;