import { Router } from 'express';
import { getClinics, getClinicsByUser, createClinic, updateClinic, deleteClinic } from '../controllers/clinics';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getClinics);
router.get('/by-user/:userId', authMiddleware, getClinicsByUser);
router.post('/', authMiddleware, createClinic);
router.put('/:id', authMiddleware, updateClinic);
router.delete('/:id', authMiddleware, deleteClinic);

export default router;
