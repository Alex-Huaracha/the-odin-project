import { Router } from 'express';
import { postFolder, getFolderById } from '../controllers/folder.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/folders', isAuthenticated, postFolder);
router.get('/folders/:id', isAuthenticated, getFolderById);

export default router;
