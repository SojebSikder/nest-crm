-- AlterTable
ALTER TABLE `workspace_team_users` ADD COLUMN `tenant_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `workspace_users` ADD COLUMN `tenant_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `workspace_users` ADD CONSTRAINT `workspace_users_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_team_users` ADD CONSTRAINT `workspace_team_users_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
