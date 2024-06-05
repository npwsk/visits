/*
  Warnings:

  - Added the required column `goal` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "success" BOOLEAN,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "report" DROP NOT NULL;
