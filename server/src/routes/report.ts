import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/visits', async (req, res) => {
  try {
    const reports = await prisma.visit.findMany({
      include: {
        user: true,
        clinic: true,
        contact: true,
      },
    });
    res.json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching visit reports' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const reports = await prisma.user.findMany({
      include: {
        visits: {
          include: {
            clinic: true,
            contact: true,
          },
        },
      },
    });
    res.json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user reports' });
  }
});

export default router;
