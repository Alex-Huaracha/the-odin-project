import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = Router();

// GET /api/users (Protegido)
router.get('/', isAuthenticated, getUsers);

export default router;
