import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', categoryController.category_list);
router.get('/category/create', categoryController.category_create_get);
router.post('/category/create', categoryController.category_create_post);
router.get('/category/:id', categoryController.category_detail);
router.get('/category/:id/delete', categoryController.category_delete_get);
router.post('/category/:id/delete', categoryController.category_delete_post);
router.get('/category/:id/update', categoryController.category_update_get);
router.post('/category/:id/update', categoryController.category_update_post);

export default router;
