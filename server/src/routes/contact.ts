import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { firstName, middleName, lastName, specialization, credentials, phone, email } = req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        firstName,
        middleName,
        lastName,
        specialization,
        credentials,
        phone,
        email,
      },
    });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Error creating contact' });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching contacts' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, specialization, credentials, phone, email } = req.body;

  try {
    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        firstName,
        middleName,
        lastName,
        specialization,
        credentials,
        phone,
        email,
      },
    });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Error updating contact' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.contact.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting contact' });
  }
});

export default router;
