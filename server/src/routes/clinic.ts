import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { name, address, phone, email, legalName, inn, notes } = req.body;

  try {
    const clinic = await prisma.clinic.create({
      data: {
        name,
        address,
        phone,
        email,
        legalName,
        inn,
        notes,
      },
    });
    res.json(clinic);
  } catch (error) {
    res.status(400).json({ error: 'Error creating clinic' });
  }
});

router.get('/', async (req, res) => {
  try {
    const clinics = await prisma.clinic.findMany();
    res.json(clinics);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching clinics' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, legalName, inn, notes } = req.body;

  try {
    const clinic = await prisma.clinic.update({
      where: { id: Number(id) },
      data: {
        name,
        address,
        phone,
        email,
        legalName,
        inn,
        notes,
      },
    });
    res.json(clinic);
  } catch (error) {
    res.status(400).json({ error: 'Error updating clinic' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.clinic.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Clinic deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting clinic' });
  }
});

export default router;
