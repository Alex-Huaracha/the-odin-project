import { Router } from 'express';
import {
  createShareLink,
  getShareLink,
} from '../controllers/share.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/folders/:id/share', isAuthenticated, createShareLink);
router.get('/share/:id', getShareLink);

export default router;
