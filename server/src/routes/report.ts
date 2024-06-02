import { Router } from 'express';
import { getVisitsByPeriod, getVisitDetails, getVisitsBySpecialization, getClinicsByRep, getUnvisitedClinics } from '../controllers/reports';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/visits-by-period', authMiddleware, getVisitsByPeriod);
router.get('/visit-details', authMiddleware, getVisitDetails);
router.get('/visits-by-specialization', authMiddleware, getVisitsBySpecialization);
router.get('/clinics-by-rep', authMiddleware, getClinicsByRep);
router.get('/unvisited-clinics', authMiddleware, getUnvisitedClinics);

export default router;
