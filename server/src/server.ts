import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import clinicRoutes from './routes/clinic';
import contactRoutes from './routes/contact';
import reportRoutes from './routes/report';
import visitRoutes from './routes/visit';
import userRoutes from './routes/user';
import statusRoutes from './routes/status';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/statuses', statusRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const visits = [
  {
    "id": 1,
    "startTime": "2024-06-01 13:46:55",
    "endTime": "2024-06-01 16:46:55",
    "goal": "Демонстрация возможностей программного обеспечения",
    "success": true,
    "report": "Цель визита достигнута. Обсуждены условия сотрудничества, договор подписан.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 2,
    "startTime": "2024-05-30 08:43:23",
    "endTime": "2024-05-30 11:43:23",
    "goal": "Обсуждение условий сотрудничества",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 3,
    "startTime": "2024-06-01 23:59:02",
    "endTime": "2024-06-02 00:59:02",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Клиент доволен, запланирован следующий визит.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 4,
    "startTime": "2024-06-02 23:28:21",
    "endTime": "2024-06-03 02:28:21",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 5,
    "startTime": "2024-06-03 09:10:41",
    "endTime": "2024-06-03 11:10:41",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Обсуждены условия сотрудничества, договор подписан.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 6,
    "startTime": "2024-06-01 19:04:12",
    "endTime": "2024-06-01 22:04:12",
    "goal": "Знакомство с ассортиментом",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 7,
    "startTime": "2024-06-10 13:22:46",
    "endTime": null,
    "goal": "Заключение сделки",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 8,
    "startTime": "2024-05-30 12:56:17",
    "endTime": "2024-05-30 15:56:17",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 9,
    "startTime": "2024-06-11 07:45:02",
    "endTime": null,
    "goal": "Обсуждение условий сотрудничества",
    "success": null,
    "report": "Цель визита не достигнута. Клиент попросил отложить обсуждение.",
    "statusId": 3,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 10,
    "startTime": "2024-06-12 08:26:08",
    "endTime": null,
    "goal": "Презентация нового оборудования",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 3,
    "contactId": 1,
    "clinicId": 1
  },
  {
    "id": 11,
    "startTime": "2024-05-30 12:15:29",
    "endTime": "2024-05-30 15:15:29",
    "goal": "Знакомство с ассортиментом",
    "success": true,
    "report": "Цель визита достигнута. Заключена сделка.",
    "statusId": 2,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 12,
    "startTime": "2024-06-11 14:35:24",
    "endTime": "2024-06-11 16:35:24",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Клиент доволен, запланирован следующий визит.",
    "statusId": 2,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 13,
    "startTime": "2024-06-03 23:45:02",
    "endTime": "2024-06-04 02:45:02",
    "goal": "Заключение сделки",
    "success": true,
    "report": "Цель визита достигнута. Заключена сделка.",
    "statusId": 2,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 14,
    "startTime": "2024-06-02 12:15:29",
    "endTime": "2024-06-02 15:15:29",
    "goal": "Знакомство с ассортиментом",
    "success": true,
    "report": "Цель визита достигнута. Обсуждены условия сотрудничества, договор подписан.",
    "statusId": 2,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 15,
    "startTime": "2024-06-01 05:41:52",
    "endTime": "2024-06-01 07:41:52",
    "goal": "Заключение сделки",
    "success": true,
    "report": "Цель визита достигнута. Заключена сделка.",
    "statusId": 2,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 16,
    "startTime": "2024-06-01 20:32:13",
    "endTime": null,
    "goal": "Презентация нового оборудования",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 17,
    "startTime": "2024-06-02 13:22:46",
    "endTime": null,
    "goal": "Заключение сделки",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 18,
    "startTime": "2024-05-30 12:56:17",
    "endTime": "2024-05-30 15:56:17",
    "goal": "Знакомство с ассортиментом",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 19,
    "startTime": "2024-06-10 07:55:59",
    "endTime": null,
    "goal": "Презентация нового оборудования",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 20,
    "startTime": "2024-05-31 20:22:13",
    "endTime": null,
    "goal": "Обсуждение условий сотрудничества",
    "success": null,
    "report": "Цель визита не достигнута. Клиент попросил отложить обсуждение.",
    "statusId": 3,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 21,
    "startTime": "2024-05-30 07:28:21",
    "endTime": null,
    "goal": "Презентация нового оборудования",
    "success": null,
    "report": "Цель визита не достигнута. Клиент не заинтересован.",
    "statusId": 3,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 22,
    "startTime": "2024-06-12 14:34:02",
    "endTime": null,
    "goal": "Презентация нового оборудования",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 4,
    "contactId": 2,
    "clinicId": 2
  },
  {
    "id": 23,
    "startTime": "2024-05-30 13:45:23",
    "endTime": "2024-05-30 16:45:23",
    "goal": "Демонстрация возможностей программного обеспечения",
    "success": true,
    "report": "Цель визита достигнута. Презентация прошла успешно, клиент заинтересован.",
    "statusId": 2,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 24,
    "startTime": "2024-06-11 09:43:23",
    "endTime": "2024-06-11 12:43:23",
    "goal": "Заключение сделки",
    "success": true,
    "report": "Цель визита достигнута. Заключена сделка.",
    "statusId": 2,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 25,
    "startTime": "2024-06-03 13:59:02",
    "endTime": "2024-06-03 15:59:02",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Клиент доволен, запланирован следующий визит.",
    "statusId": 2,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 26,
    "startTime": "2024-06-05 16:28:21",
    "endTime": "2024-06-05 18:28:21",
    "goal": "Заключение сделки",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 27,
    "startTime": "2024-06-02 19:10:41",
    "endTime": "2024-06-02 20:10:41",
    "goal": "Знакомство с ассортиментом",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 28,
    "startTime": "2024-06-04 09:04:12",
    "endTime": null,
    "goal": "Демонстрация возможностей программного обеспечения",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 29,
    "startTime": "2024-06-05 13:22:46",
    "endTime": null,
    "goal": "Заключение сделки",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 30,
    "startTime": "2024-06-06 10:00:40",
    "endTime": "2024-06-06 11:00:40",
    "goal": "Презентация нового оборудования",
    "success": true,
    "report": "Цель визита достигнута. Достигнуты договоренности о следующем визите.",
    "statusId": 2,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 31,
    "startTime": "2024-06-07 14:52:41",
    "endTime": null,
    "goal": "Заключение сделки",
    "success": null,
    "report": "Цель визита не достигнута. Презентация прошла плохо.",
    "statusId": 3,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 32,
    "startTime": "2024-06-08 18:03:20",
    "endTime": null,
    "goal": "Демонстрация возможностей программного обеспечения",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 33,
    "startTime": "2024-06-09 13:53:08",
    "endTime": null,
    "goal": "Заключение сделки",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  },
  {
    "id": 34,
    "startTime": "2024-06-11 12:28:43",
    "endTime": null,
    "goal": "Заключение сделки",
    "success": null,
    "report": null,
    "statusId": 1,
    "userId": 5,
    "contactId": 3,
    "clinicId": 3
  }
];


// const main = async () => {
//   const prisma = new PrismaClient();

//   const res = await prisma.visit.createMany({
//     data: visits.map((visit) => ({...visit, startTime: new Date(visit.startTime), endTime: visit.endTime ? new Date(visit.endTime) : null })),
//   });

//   console.log(res)
// };

// main()
