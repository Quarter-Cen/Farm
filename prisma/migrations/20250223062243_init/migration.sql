/*
  Warnings:

  - You are about to alter the column `healthStatus` on the `cows` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `cows` MODIFY `healthStatus` ENUM('HEALTHY', 'SICK', 'INJURED', 'DEAD') NOT NULL;
