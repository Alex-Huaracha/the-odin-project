import { Router } from 'express';
import {
  followUser,
  unfollowUser,
  getProfile,
  getUserPosts,
  updateProfile,
} from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/:username', getProfile);
router.get('/:username/posts', getUserPosts);

// Protected routes
router.patch('/profile', isAuthenticated, updateProfile);
router.post('/:id/follow', isAuthenticated, followUser);
router.delete('/:id/follow', isAuthenticated, unfollowUser);

export default router;
