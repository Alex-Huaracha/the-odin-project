import { Router } from 'express';
import { createShareLink } from '../controllers/share.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/folders/:id/share', isAuthenticated, createShareLink);

export default router;
