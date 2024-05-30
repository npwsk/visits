import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { description, validityPeriod, conditions } = req.body;

  try {
    const discount = await prisma.discount.create({
      data: {
        description,
        validityPeriod: new Date(validityPeriod),
        conditions,
      },
    });
    res.json(discount);
  } catch (error) {
    res.status(400).json({ error: 'Error creating discount' });
  }
});

router.get('/', async (req, res) => {
  try {
    const discounts = await prisma.discount.findMany();
    res.json(discounts);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching discounts' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description, validityPeriod, conditions } = req.body;

  try {
    const discount = await prisma.discount.update({
      where: { id: Number(id) },
      data: {
        description,
        validityPeriod: new Date(validityPeriod),
        conditions,
      },
    });
    res.json(discount);
  } catch (error) {
    res.status(400).json({ error: 'Error updating discount' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.discount.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Discount deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting discount' });
  }
});

export default router;
