import { Router } from 'express';
import {
  getPublishedPosts,
  getPostById,
  createPost,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get('/', getPublishedPosts);
router.get('/:id', getPostById);

router.post('/', verifyToken, createPost);

export default router;
