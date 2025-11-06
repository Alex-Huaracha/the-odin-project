import { Router } from 'express';
import { MessageController } from '../controllers/messagesController.js';

export const messagesRouter = Router();

messagesRouter.get('/', MessageController.getAll);
messagesRouter.get('/new', MessageController.getNew);
messagesRouter.post('/new', MessageController.create);
messagesRouter.get('/:id', MessageController.getById);
