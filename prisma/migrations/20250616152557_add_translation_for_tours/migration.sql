/*
  Warnings:

  - You are about to drop the column `description` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `descriptionCRO` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionENG` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameCRO` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameENG` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descriptionCRO" TEXT NOT NULL,
ADD COLUMN     "descriptionENG" TEXT NOT NULL,
ADD COLUMN     "nameCRO" TEXT NOT NULL,
ADD COLUMN     "nameENG" TEXT NOT NULL;
