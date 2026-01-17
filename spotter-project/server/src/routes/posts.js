import { Router } from 'express';
import {
  createPost,
  deletePost,
  getFeed,
  updatePost,
  getPostById,
} from '../controllers/postController.js';
import { likePost, unlikePost } from '../controllers/likeController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

router.use(isAuthenticated);

router.get('/', getFeed);
router.post('/', createPost);
router.get('/:id', getPostById);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

// Like and Unlike Routes
router.post('/:id/like', likePost);
router.delete('/:id/like', unlikePost);

export default router;
