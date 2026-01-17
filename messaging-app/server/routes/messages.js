import { Router } from 'express';
import {
  sendMessage,
  getConversation,
} from '../controllers/messageController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = Router();

router.use(isAuthenticated);

router.post('/', sendMessage);

router.get('/:otherUserId', getConversation);

export default router;
