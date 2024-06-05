import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { isFuture } from 'date-fns';

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

export const deleteVisit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.visit.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete visit' });
  }
};

export const getVisitById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const visit = await prisma.visit.findUnique({
            where: { id: Number(id) },
        });
        if (!visit) {
            return res.status(404).json({ error: 'Visit not found' });
        }
        res.json(visit);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch visit' });
    }
};

export const createVisit = async (req: Request, res: Response) => {
    const { date, time, clinicId, contactId, goal } = req.body;
    const { userId } = req.user;

    // Склеивание даты и времени в одно поле startTime
    const startTime = new Date(`${date}T${time}:00`);

    // Проверка, что дата и время в будущем
    if (!isFuture(startTime)) {
        return res.status(400).json({ error: 'Visit must be scheduled for a future date and time' });
    }

    try {
        const visit = await prisma.visit.create({
            data: {
                startTime,
                clinicId: Number(clinicId),
                contactId: Number(contactId),
                goal,
                statusId: 1, // Assuming 1 is 'Запланирован'
                userId: Number(userId),
            },
        });
        res.status(201).json(visit);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create visit' });
    }
};

export const updateVisit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, time, endTime, goal, statusId, report, success } = req.body;
    try {
        const visit = await prisma.visit.findUnique({
            where: { id: Number(id) },
        });

        if (!visit) {
            return res.status(404).json({ error: 'Visit not found' });
        }

        // Проверка, что визит ещё не начался
        if (new Date(visit.startTime) < new Date()) {
            return res.status(400).json({ error: 'Cannot edit past or ongoing visits' });
        }

        // Склеивание даты и времени в одно поле startTime
        const startTime = date && time ? new Date(`${date}T${time}:00`) : undefined;

        const updatedVisit = await prisma.visit.update({
            where: { id: Number(id) },
            data: {
                startTime,
                endTime: endTime ? new Date(endTime) : undefined,
                goal: goal || undefined,
                statusId: statusId || undefined,
                report: report || undefined,
                success: success || undefined,
            },
        });
        res.json(updatedVisit);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update visit' });
    }
};

export const updateVisitStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { statusId, success, report } = req.body;
    try {
        const visit = await prisma.visit.findUnique({
            where: { id: Number(id) },
        });

        if (!visit) {
            return res.status(404).json({ error: 'Visit not found' });
        }

        // Проверка, что визит уже начался или завершился
        if (new Date(visit.startTime) > new Date()) {
            return res.status(400).json({ error: 'Cannot update status of a future visit' });
        }

        const updatedVisit = await prisma.visit.update({
            where: { id: Number(id) },
            data: {
                statusId,
                success: success || undefined,
                report: report || undefined,
            },
        });
        res.json(updatedVisit);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update visit status' });
    }
};
