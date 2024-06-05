import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

const formatUser = (user?: User | null) => {
  if (!user) {
    return '';
  }
  return `${user.lastName} ${user.firstName[0]}.${user.middleName?.[0]}.`;
}

export const getVisitsByPeriod = async (req: Request, res: Response) => {
  const { startDate, endDate, userId, format } = req.query;

  try {
    const visits = await prisma.visit.findMany({
      where: {
        startTime: {
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

    if (format !== 'excel') {
      res.send(visits);
      return;
    }

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
        date: visit.startTime.toISOString().split('T')[0],
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
        startTime: {
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
        date: visit.startTime.toISOString().split('T')[0],
        startTime: visit.startTime.toISOString().split('T')[1].split('.')[0],
        endTime: visit.endTime?.toISOString().split('T')[1].split('.')[0],
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

export const getVisitsBySpecialization = async (req: Request, res: Response) => {
  const { startDate, endDate, format } = req.query;

  try {
    const visits = await prisma.visit.findMany({
      where: {
        startTime: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
      include: {
        contact: true,
        user: true,
      },
    });

    const userSpecializationCounts: { [userId: number]: { [specialization: string]: number } } = {};
    const specializationsSet: Set<string> = new Set();

    visits.forEach((visit) => {
      const userId = visit.user.id;
      const specialization = visit.contact.specialization || 'Не указано';

      if (!userSpecializationCounts[userId]) {
        userSpecializationCounts[userId] = {};
      }

      if (!userSpecializationCounts[userId][specialization]) {
        userSpecializationCounts[userId][specialization] = 0;
      }

      userSpecializationCounts[userId][specialization]++;
      specializationsSet.add(specialization);
    });

    const specializations = Array.from(specializationsSet);

    // Создание отчета в формате Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visits by Specialization');

    // Формирование шапки таблицы
    const columns = [
      { header: 'ID Пользователя', key: 'userId', width: 15 },
      { header: 'Имя пользователя', key: 'userName', width: 30 },
      ...specializations.map(spec => ({ header: spec, key: spec, width: 15 })),
    ];

    worksheet.columns = columns;

    // Добавление данных в таблицу
    const rows = Object.entries(userSpecializationCounts).map(([userId, specializationsCount]) => {
      const user = visits.find(visit => visit.user.id === Number(userId))?.user;
      return {
        userId,
        userName: user ? formatUser(user) : '',
        ...specializations.reduce((acc, spec) => {
          acc[spec] = specializationsCount[spec] || 0;
          return acc;
        }, {} as { [key: string]: number }),
      };
    });

    if (format !== 'excel') {
      res.send({ specializations, rows });
      return;
    }

    rows.forEach(row => worksheet.addRow(row));

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=visits-by-specialization.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Unable to fetch report data' });
  }
};

interface UserClinicStats {
  name: string;
  totalClinics: number;
  visitedClinics: number;
  notVisitedClinics: number;
}

type AllUsersClinicStats = Record<number, UserClinicStats>;

// Отчет 4: Число клиник, закрепленных за каждым сотрудником
export const getClinicsByRep = async (req: Request, res: Response) => {
  const { startDate, endDate, format } = req.query;

  try {
    const clinics = await prisma.clinic.findMany({
      include: {
        responsibleRep: true,
        visits: {
          where: {
            startTime: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          },
        },
      },
    });

    const repClinics = clinics.reduce((acc, clinic) => {
      const repId = clinic.responsibleRepId;
      if (!repId) {
        return acc;
      }
      if (!acc[repId]) {
        acc[repId] = { 
          name: formatUser(clinic.responsibleRep), 
          totalClinics: 0, 
          visitedClinics: 0,
          notVisitedClinics: 0
        };
      }
      acc[repId].totalClinics++;
      if (clinic.visits.length > 0) {
        acc[repId].visitedClinics++;
      }
      return acc;
    }, {} as AllUsersClinicStats);

    if (format !== 'excel') {
      res.send(Object.values(repClinics));
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Clinics by Rep');
    worksheet.columns = [
      { header: 'Сотрудник', key: 'rep', width: 30 },
      { header: 'Общее число клиник', key: 'totalClinics', width: 15 },
      { header: 'Число посещенных клиник', key: 'visitedClinics', width: 15 },
      { header: 'Число непосещенных клиник', key: 'visitedClinics', width: 15 },
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
  const { startDate, endDate, userId, format } = req.query;

  try {
    const clinics = await prisma.clinic.findMany({
      where: {
        responsibleRepId: parseInt(userId as string),
        visits: {
          none: {
            startTime: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          },
        },
      },
    });

    if (format !== 'excel') {
      res.send(clinics);
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Unvisited Clinics');
    worksheet.columns = [
      { header: 'Название', key: 'clinic', width: 30 },
      { header: 'Адрес', key: 'address', width: 30 },
      { header: 'Телефон', key: 'phone', width: 15 },
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

interface UserVisitStats {
  userName: string;
  totalVisits: number;
  successfulVisits: number;
  primaryVisitsForClinic: number;
  primaryVisitsForDoctor: number;
}

interface GroupedVisits { [userId: number]: UserVisitStats };


export const getVisitsStats = async (req: Request, res: Response) => {
    const { startDate, endDate, format } = req.query;

    try {
        // Получение визитов за указанный период
        const visits = await prisma.visit.findMany({
            where: {
                startTime: {
                    gte: new Date(startDate as string),
                    lte: new Date(endDate as string),
                },
            },
            include: {
                user: true,
                clinic: true,
                contact: true,
            },
        });

        // Группировка визитов по ID пользователя
        const groupedVisits = visits.reduce((acc, visit) => {
            const { userId, success, clinic, contact, user } = visit;
            if (!acc[userId]) {
                acc[userId] = {
                    userName: formatUser(user),
                    totalVisits: 0,
                    successfulVisits: 0,
                    primaryVisitsForClinic: 0,
                    primaryVisitsForDoctor: 0,
                };
            }
            acc[userId].totalVisits += 1;
            if (success) {
                acc[userId].successfulVisits += 1;
            }
            if (clinic) {
                acc[userId].primaryVisitsForClinic += 1;
            }
            if (contact) {
                acc[userId].primaryVisitsForDoctor += 1;
            }
            return acc;
        }, {} as GroupedVisits);

        if (format !== 'excel') {
          res.send(groupedVisits);
          return;
        }

        // Создание отчета в формате Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Report By Rep');

        worksheet.columns = [
            { header: 'Имя пользователя', key: 'userName' },
            { header: 'Общее количество визитов', key: 'totalVisits' },
            { header: 'Количество успешных визитов', key: 'successfulVisits' },
            { header: 'Количество первичных визитов для клиники', key: 'primaryVisitsForClinic' },
            { header: 'Количество первичных визитов для доктора', key: 'primaryVisitsForDoctor' },
        ];

        Object.values(groupedVisits).forEach((stats: UserVisitStats) => {
            worksheet.addRow({
                userName: `${stats.userName} `,
                totalVisits: stats.totalVisits,
                successfulVisits: stats.successfulVisits,
                primaryVisitsForClinic: stats.primaryVisitsForClinic,
                primaryVisitsForDoctor: stats.primaryVisitsForDoctor,
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reportByRep.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: 'Unable to generate report' });
    }
};