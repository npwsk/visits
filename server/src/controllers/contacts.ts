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

export const getContactById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const contact = await prisma.contact.findUnique({
            where: { id: Number(id) },
            include: {
                contactClinics: {
                    include: {
                        clinic: true,
                    },
                },
            },
        });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch contact' });
    }
};

export const getContactClinics = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      const contactClinic = await prisma.contactClinic.findMany({
          where: {
              contactId: Number(id),
          },
          include: {
              clinic: true,
          },
      });
      res.status(200).json(contactClinic);
  } catch (error) {
      res.status(500).json({ error: 'Unable to find contact clinic link' });
  }
};

export const createContactClinic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { clinicId, position } = req.body;
    try {
        const contactClinic = await prisma.contactClinic.create({
            data: {
                contactId: Number(id),
                clinicId: Number(clinicId),
                position,
            },
            include: {
                clinic: true,
            },
        });
        res.status(201).json(contactClinic);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create contact clinic link' });
    }
};

export const updateContactClinic = async (req: Request, res: Response) => {
    const { id, clinicId } = req.params;
    const { position } = req.body;
    try {
        const contactClinic = await prisma.contactClinic.update({
            where: {
                contactId_clinicId: {
                    contactId: Number(id),
                    clinicId: Number(clinicId),
                },
            },
            data: { position },
            include: {
                clinic: true,
            },
        });
        res.json(contactClinic);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update contact clinic link' });
    }
};

export const deleteContactClinic = async (req: Request, res: Response) => {
    const { id, clinicId } = req.params;
    try {
        await prisma.contactClinic.delete({
            where: {
                contactId_clinicId: {
                    contactId: Number(id),
                    clinicId: Number(clinicId),
                },
            },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete contact clinic link' });
    }
};
