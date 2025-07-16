-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `Offer_adId_fkey`;

-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `Offer_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `Offer_senderId_fkey`;

-- DropIndex
DROP INDEX `Offer_adId_fkey` ON `Offer`;

-- DropIndex
DROP INDEX `Offer_receiverId_fkey` ON `Offer`;

-- DropIndex
DROP INDEX `Offer_senderId_fkey` ON `Offer`;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `Ad`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
