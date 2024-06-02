import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

export const getVisitsByPeriod = async (req: Request, res: Response) => {
  const { startDate, endDate, userId } = req.query;

  try {
    const visits = await prisma.visit.findMany({
      where: {
        date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
        userId: userId ? parseInt(userId as string) : undefined,
      },
      include: {
        user: true,
        clinic: true,
        contact: true,
        status: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visits Report');
    worksheet.columns = [
      { header: 'User', key: 'user', width: 30 },
      { header: 'Clinic', key: 'clinic', width: 30 },
      { header: 'Contact', key: 'contact', width: 30 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Report', key: 'report', width: 50 },
    ];

    visits.forEach((visit) => {
      worksheet.addRow({
        user: `${visit.user.firstName} ${visit.user.lastName}`,
        clinic: visit.clinic.name,
        contact: `${visit.contact.firstName} ${visit.contact.lastName}`,
        date: visit.date.toISOString().split('T')[0],
        status: visit.status.name,
        report: visit.report,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=visits-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch report data' });
  }
};

// Добавить аналогичные функции для других отчетов

// Отчет 2: Список визитов с целями и отчетами за период
export const getVisitDetails = async (req: Request, res: Response) => {
  const { startDate, endDate, userId } = req.query;

  try {
    const visits = await prisma.visit.findMany({
      where: {
        date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
        userId: userId ? parseInt(userId as string) : undefined,
      },
      include: {
        user: true,
        clinic: true,
        contact: true,
        status: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visit Details');
    worksheet.columns = [
      { header: 'User', key: 'user', width: 30 },
      { header: 'Clinic', key: 'clinic', width: 30 },
      { header: 'Contact', key: 'contact', width: 30 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Start Time', key: 'startTime', width: 15 },
      { header: 'End Time', key: 'endTime', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Report', key: 'report', width: 50 },
    ];

    visits.forEach((visit) => {
      worksheet.addRow({
        user: `${visit.user.firstName} ${visit.user.lastName}`,
        clinic: visit.clinic.name,
        contact: `${visit.contact.firstName} ${visit.contact.lastName}`,
        date: visit.date.toISOString().split('T')[0],
        startTime: visit.startTime.toISOString().split('T')[1].split('.')[0],
        endTime: visit.endTime.toISOString().split('T')[1].split('.')[0],
        status: visit.status.name,
        report: visit.report,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=visit-details.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch report data' });
  }
};

// Отчет 3: Число визитов по специализациям врачей
export const getVisitsBySpecialization = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const visits = await prisma.visit.findMany({
      where: {
        date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
      include: {
        contact: true,
      },
    });

    const specializationCounts: { [key: string]: number } = {};

    visits.forEach((visit) => {
      const specialization = visit.contact.specialization;
      if (specializationCounts[specialization]) {
        specializationCounts[specialization]++;
      } else {
        specializationCounts[specialization] = 1;
      }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visits by Specialization');
    worksheet.columns = [
      { header: 'Specialization', key: 'specialization', width: 30 },
      { header: 'Visit Count', key: 'visitCount', width: 15 },
    ];

    Object.entries(specializationCounts).forEach(([specialization, visitCount]) => {
      worksheet.addRow({ specialization, visitCount });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=visits-by-specialization.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch report data' });
  }
};

// Отчет 4: Число клиник, закрепленных за каждым сотрудником
export const getClinicsByRep = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const clinics = await prisma.clinic.findMany({
      include: {
        responsibleRep: true,
        visits: {
          where: {
            date: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          },
        },
      },
    });

    const repClinics = clinics.reduce((acc, clinic) => {
      const repId = clinic.responsibleRepId;
      if (!acc[repId]) {
        acc[repId] = { name: clinic.responsibleRep?.firstName + ' ' + clinic.responsibleRep?.lastName, totalClinics: 0, visitedClinics: 0 };
      }
      acc[repId].totalClinics++;
      if (clinic.visits.length > 0) {
        acc[repId].visitedClinics++;
      }
      return acc;
    }, {});

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Clinics by Rep');
    worksheet.columns = [
      { header: 'Rep', key: 'rep', width: 30 },
      { header: 'Total Clinics', key: 'totalClinics', width: 15 },
      { header: 'Visited Clinics', key: 'visitedClinics', width: 15 },
    ];

    Object.values(repClinics).forEach((rep) => {
      worksheet.addRow(rep);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=clinics-by-rep.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch report data' });
  }
};

// Отчет 5: Список клиник, не посещенных медпредом
export const getUnvisitedClinics = async (req: Request, res: Response) => {
  const { startDate, endDate, userId } = req.query;

  try {
    const clinics = await prisma.clinic.findMany({
      where: {
        responsibleRepId: parseInt(userId as string),
        visits: {
          none: {
            date: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          },
        },
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Unvisited Clinics');
    worksheet.columns = [
      { header: 'Clinic', key: 'clinic', width: 30 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
    ];

    clinics.forEach((clinic) => {
      worksheet.addRow({
        clinic: clinic.name,
        address: clinic.address,
        phone: clinic.phone,
        email: clinic.email,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=unvisited-clinics.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch report data' });
  }
};

