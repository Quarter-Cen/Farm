/*
  Warnings:

  - You are about to drop the `vaccinations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `vaccinations` DROP FOREIGN KEY `vaccinations_cowId_fkey`;

-- DropForeignKey
ALTER TABLE `vaccinations` DROP FOREIGN KEY `vaccinations_veterianId_fkey`;

-- DropTable
DROP TABLE `vaccinations`;
