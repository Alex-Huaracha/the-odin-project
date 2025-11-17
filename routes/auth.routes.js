import { Router } from 'express';
import passport from 'passport';
import {
  getRegister,
  postRegister,
  getLogin,
  postLogout,
  getDashboard,
  getIndex,
} from '../controllers/auth.controller.js';
import {
  isAuthenticated,
  isNotAuthenticated,
} from '../middleware/auth.middleware.js';

const router = Router();

// Routes accessible to non-authenticated users
router.get('/', isNotAuthenticated, getIndex);
router.get('/register', isNotAuthenticated, getRegister);
router.post('/register', isNotAuthenticated, postRegister);
router.get('/login', isNotAuthenticated, getLogin);
router.post(
  '/login',
  isNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

// Routes accessible to authenticated users
router.get('/dashboard', isAuthenticated, getDashboard);
router.post('/logout', isAuthenticated, postLogout);

export default router;
