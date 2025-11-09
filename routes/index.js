import express from 'express';

import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => res.render('index', { title: 'Home' }));

router.get('/sign-up', userController.user_signup_get);

router.post('/sign-up', userController.user_signup_post);

export default router;
