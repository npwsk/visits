import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'Медицинский представитель' },
      { name: 'Руководитель' },
    ],
  });

  console.log('Roles created');

  await prisma.status.createMany({
    data: [
      { name: 'Запланирован' },
      { name: 'Состоялся' },
      { name: 'Не состоялся' },
    ],
  });

  console.log('Статусы визитов созданы');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });