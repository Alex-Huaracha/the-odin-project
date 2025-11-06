import { Router } from 'express';
import { MessageController } from '../controllers/messagesController.js';

export const messagesRouter = Router();

messagesRouter.get('/', MessageController.getAll);
messagesRouter.post('/', MessageController.create);
