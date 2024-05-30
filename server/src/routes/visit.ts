import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { userId, clinicId, contactId, date, startTime, endTime, status, report } = req.body;

  try {
    const visit = await prisma.visit.create({
      data: {
        userId,
        clinicId,
        contactId,
        date,
        startTime,
        endTime,
        status,
        report,
      },
    });
    res.json(visit);
  } catch (error) {
    res.status(400).json({ error: 'Error creating visit' });
  }
});

router.get('/', async (req, res) => {
  try {
    const visits = await prisma.visit.findMany();
    res.json(visits);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching visits' });
  }
});

export default router;
