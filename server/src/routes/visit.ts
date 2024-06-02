import { Router } from 'express';
import { getVisits, createVisit, updateVisit, deleteVisit } from '../controllers/visits';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getVisits);
router.post('/', authMiddleware, createVisit);
router.put('/:id', authMiddleware, updateVisit);
router.delete('/:id', authMiddleware, deleteVisit);

export default router;
