import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                roleId: true,
                role: true,
            },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
};
