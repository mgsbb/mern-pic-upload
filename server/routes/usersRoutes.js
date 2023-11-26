import express from 'express';

import {
	signIn,
	signUp,
	deleteUser,
	getUserDetails,
	updateUser,
	getUsers,
} from '../controllers/userControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

// ============================================================================================
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.delete('/:userId', authMiddleware, deleteUser);
router.patch('/:userId', authMiddleware, updateUser);
router.get('/:userId', authMiddleware, getUserDetails);
router.get('/', authMiddleware, getUsers);

// ============================================================================================
export default router;
