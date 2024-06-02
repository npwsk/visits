/*
  Warnings:

  - You are about to drop the column `credentials` on the `Contact` table. All the data in the column will be lost.
  - The primary key for the `ContactClinic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ContactClinic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the `Discount` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `notes` on table `Clinic` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ALTER COLUMN "notes" SET NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "credentials",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContactClinic" DROP CONSTRAINT "ContactClinic_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ContactClinic_pkey" PRIMARY KEY ("contactId", "clinicId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "role",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "roleId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Discount";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
