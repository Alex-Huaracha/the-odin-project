import { Router } from 'express';
import {
  createPost,
  deletePost,
  getFeed,
  updatePost,
} from '../controllers/postController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

router.use(isAuthenticated);

router.get('/', getFeed);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
