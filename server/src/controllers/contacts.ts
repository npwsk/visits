import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch contacts' });
  }
};

export const getContactsByClinic = async (req: Request, res: Response) => {
  const { clinicId } = req.params;

  try {
    const contacts = await prisma.contact.findMany({
      where: { clinics: { some: { clinicId: parseInt(clinicId, 10) } } },
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch contacts' });
  }
};

export const createContact = async (req: Request, res: Response) => {
  const { firstName, lastName, middleName, specialization, title, phone, email } = req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        middleName,
        specialization,
        title,
        phone,
        email,
      },
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create contact' });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, middleName, specialization, title, phone, email } = req.body;

  try {
    const contact = await prisma.contact.update({
      where: { id: parseInt(id, 10) },
      data: {
        firstName,
        lastName,
        middleName,
        specialization,
        title,
        phone,
        email,
      },
    });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update contact' });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.contact.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete contact' });
  }
};
