import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClinics = async (req: Request, res: Response) => {
  try {
    const clinics = await prisma.clinic.findMany();
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch clinics' });
  }
};

export const getClinicsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const clinics = await prisma.clinic.findMany({
      where: { responsibleRepId: parseInt(userId, 10) },
    });
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch clinics' });
  }
};

export const createClinic = async (req: Request, res: Response) => {
  const { name, address, phone, email, legalName, inn, notes, responsibleRepId } = req.body;

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
        responsibleRepId: responsibleRepId ? parseInt(responsibleRepId, 10) : null,
      },
    });
    res.status(201).json(clinic);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create clinic' });
  }
};

export const updateClinic = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address, phone, email, legalName, inn, notes, responsibleRepId } = req.body;

  try {
    const clinic = await prisma.clinic.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        address,
        phone,
        email,
        legalName,
        inn,
        notes,
        responsibleRepId: responsibleRepId ? parseInt(responsibleRepId, 10) : null,
      },
    });
    res.json(clinic);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update clinic' });
  }
};

export const deleteClinic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.clinic.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete clinic' });
  }
};
