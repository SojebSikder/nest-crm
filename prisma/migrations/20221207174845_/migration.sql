-- AlterTable
ALTER TABLE `contacts` ADD COLUMN `country_id` INTEGER NULL,
    ADD COLUMN `email` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
