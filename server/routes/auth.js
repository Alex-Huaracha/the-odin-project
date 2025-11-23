import { Router } from 'express';
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isAuthenticated, getCurrentUser);

export default router;
