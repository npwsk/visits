import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
