import { Router } from 'express';
import {
  getPublishedPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { createComment } from '../controllers/commentController.js';

const router = Router();

router.get('/', getPublishedPosts);
router.get('/:id', getPostById);

router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

router.post('/:postId/comments', createComment);

export default router;
