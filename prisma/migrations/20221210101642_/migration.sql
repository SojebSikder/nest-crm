/*
  Warnings:

  - You are about to drop the column `text_body` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `messages` DROP COLUMN `text_body`,
    ADD COLUMN `body_text` VARCHAR(191) NULL;
