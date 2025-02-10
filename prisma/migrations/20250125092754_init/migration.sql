/*
  Warnings:

  - Added the required column `recordedAt` to the `cows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cows` ADD COLUMN `recordedAt` DATETIME(3) NOT NULL;
