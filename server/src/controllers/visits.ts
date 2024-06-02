import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVisits = async (req: Request, res: Response) => {
  try {
    const visits = await prisma.visit.findMany({
      include: {
        user: true,
        clinic: true,
        contact: true,
        status: true,
      },
    });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch visits' });
  }
};

export const createVisit = async (req: Request, res: Response) => {
  const { date, startTime, endTime, report, statusId, userId, contactId, clinicId } = req.body;

  try {
    const visit = await prisma.visit.create({
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        report,
        statusId: parseInt(statusId, 10),
        userId: parseInt(userId, 10),
        contactId: parseInt(contactId, 10),
        clinicId: parseInt(clinicId, 10),
      },
    });
    res.status(201).json(visit);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create visit' });
  }
};

export const updateVisit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, startTime, endTime, report, statusId, userId, contactId, clinicId } = req.body;

  try {
    const visit = await prisma.visit.update({
      where: { id: parseInt(id, 10) },
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        report,
        statusId: parseInt(statusId, 10),
        userId: parseInt(userId, 10),
        contactId: parseInt(contactId, 10),
        clinicId: parseInt(clinicId, 10),
      },
    });
    res.json(visit);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update visit' });
  }
};

export const deleteVisit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.visit.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete visit' });
  }
};

