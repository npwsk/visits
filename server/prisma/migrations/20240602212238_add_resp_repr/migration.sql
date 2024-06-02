-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "responsibleRepId" INTEGER;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_responsibleRepId_fkey" FOREIGN KEY ("responsibleRepId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
