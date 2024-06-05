import { Router } from 'express';
import { getVisitsByPeriod, getVisitDetails, getVisitsBySpecialization, getClinicsByRep, getUnvisitedClinics, getVisitsStats } from '../controllers/reports';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/visits-by-period', getVisitsByPeriod);
router.get('/visit-details', getVisitDetails);
router.get('/visits-by-specialization', getVisitsBySpecialization);
router.get('/clinics-by-rep', getClinicsByRep);
router.get('/unvisited-clinics', getUnvisitedClinics);
router.get('/visits-stats', authMiddleware, getVisitsStats);

export default router;
