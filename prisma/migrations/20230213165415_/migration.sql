-- AlterTable
ALTER TABLE `messages` ADD COLUMN `message_data` LONGTEXT NULL,
    ADD COLUMN `parent_id` BIGINT NULL,
    MODIFY `body_text` LONGTEXT NULL;
