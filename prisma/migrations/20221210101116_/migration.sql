/*
  Warnings:

  - You are about to drop the column `creator_id` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `creator_type` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `messaging_product` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `participant_id` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `participant_type` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_type` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `sender_type` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `conversations` DROP COLUMN `creator_id`,
    DROP COLUMN `creator_type`,
    DROP COLUMN `messaging_product`,
    DROP COLUMN `participant_id`,
    DROP COLUMN `participant_type`,
    ADD COLUMN `contact_id` INTEGER NULL,
    ADD COLUMN `tenant_id` INTEGER NULL,
    ADD COLUMN `workspace_channel_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `receiver_id`,
    DROP COLUMN `receiver_type`,
    DROP COLUMN `sender_id`,
    DROP COLUMN `sender_type`,
    DROP COLUMN `text`,
    ADD COLUMN `contact_id` INTEGER NULL,
    ADD COLUMN `message_id` VARCHAR(191) NULL,
    ADD COLUMN `messaging_product` VARCHAR(191) NULL DEFAULT 'whatsapp',
    ADD COLUMN `text_body` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NULL DEFAULT 'text',
    ADD COLUMN `workspace_channel_id` INTEGER NULL,
    MODIFY `conversation_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_workspace_channel_id_fkey` FOREIGN KEY (`workspace_channel_id`) REFERENCES `whatsapp_channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_workspace_channel_id_fkey` FOREIGN KEY (`workspace_channel_id`) REFERENCES `whatsapp_channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
