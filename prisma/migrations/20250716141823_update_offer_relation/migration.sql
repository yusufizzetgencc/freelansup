-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `Offer_adId_fkey`;

-- DropIndex
DROP INDEX `Offer_adId_fkey` ON `Offer`;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `Ad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
