import express from 'express';

import * as userController from '../controllers/userController.js';
import * as messageController from '../controllers/messageController.js';
const router = express.Router();

// Principal Route
router.get('/', messageController.message_list_get);
// Sign Up Routes
router.get('/sign-up', userController.user_signup_get);
router.post('/sign-up', userController.user_signup_post);

// Log In Routes
router.get('/log-in', userController.user_login_get);
router.post('/log-in', userController.user_login_post);

// Log Out Route
router.get('/log-out', userController.user_logout_get);

// Membership Join Group
router.get('/join-club', userController.join_club_get);
router.post('/join-club', userController.join_club_post);

// Create message
router.get('/create-message', messageController.message_create_get);
router.post('/create-message', messageController.message_create_post);

// Delete message (Admin only)
router.post('/delete-message', messageController.message_delete_post);

export default router;
