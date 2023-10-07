/*
  Warnings:

  - You are about to drop the `USERS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DELIVERIES` DROP FOREIGN KEY `DELIVERIES_id_users_fk_fkey`;

-- DropForeignKey
ALTER TABLE `USERS` DROP FOREIGN KEY `USERS_id_roles_fk_fkey`;

-- DropForeignKey
ALTER TABLE `USERS` DROP FOREIGN KEY `USERS_id_stores_fk_fkey`;

-- DropTable
DROP TABLE `USERS`;

-- CreateTable
CREATE TABLE `users` (
    `idUSERS` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `enabled` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_stores_fk` INTEGER NOT NULL,
    `id_roles_fk` INTEGER NOT NULL,

    PRIMARY KEY (`idUSERS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_stores_fk_fkey` FOREIGN KEY (`id_stores_fk`) REFERENCES `STORES`(`idStores`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_roles_fk_fkey` FOREIGN KEY (`id_roles_fk`) REFERENCES `ROLES`(`idROLES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DELIVERIES` ADD CONSTRAINT `DELIVERIES_id_users_fk_fkey` FOREIGN KEY (`id_users_fk`) REFERENCES `users`(`idUSERS`) ON DELETE RESTRICT ON UPDATE CASCADE;
