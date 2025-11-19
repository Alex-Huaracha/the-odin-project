import { Router } from 'express';
import {
  getPublishedPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllPostsAdmin,
  getPostByIdAdmin,
} from '../controllers/postController.js';
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js';
import { createComment } from '../controllers/commentController.js';

const router = Router();

router.get('/', getPublishedPosts);
router.get('/:id', getPostById);
router.get('/admin/all', verifyToken, verifyAdmin, getAllPostsAdmin);
router.get('/admin/:id', verifyToken, verifyAdmin, getPostByIdAdmin);

router.post('/', verifyToken, verifyAdmin, createPost);
router.put('/:id', verifyToken, verifyAdmin, updatePost);
router.delete('/:id', verifyToken, verifyAdmin, deletePost);

router.post('/:postId/comments', verifyToken, createComment);

export default router;
