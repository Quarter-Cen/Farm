-- DropForeignKey
ALTER TABLE `treatments` DROP FOREIGN KEY `treatments_cowId_fkey`;

-- DropIndex
DROP INDEX `treatments_cowId_fkey` ON `treatments`;

-- AddForeignKey
ALTER TABLE `treatments` ADD CONSTRAINT `treatments_cowId_fkey` FOREIGN KEY (`cowId`) REFERENCES `cows`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
