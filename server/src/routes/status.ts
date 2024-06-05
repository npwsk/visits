import { Router } from 'express';
import { getAllStatuses } from '../controllers/statuses';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getAllStatuses);

export default router;
