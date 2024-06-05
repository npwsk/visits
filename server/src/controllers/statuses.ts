import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllStatuses = async (req: Request, res: Response) => {
    try {
        const users = await prisma.status.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch statuses' });
    }
};
