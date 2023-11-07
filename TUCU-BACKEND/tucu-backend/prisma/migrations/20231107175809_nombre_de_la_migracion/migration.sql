-- CreateTable
CREATE TABLE `HISTORIES` (
    `idHISTORIES` INTEGER NOT NULL AUTO_INCREMENT,
    `modified` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp` DATETIME(3) NOT NULL,
    `preparation_time` INTEGER NOT NULL,
    `state` INTEGER NOT NULL,
    `id_users_fk` INTEGER NOT NULL,
    `id_stores_fk` INTEGER NOT NULL,
    `id_deliverymen_fk` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `idDELIVERIES_fk` INTEGER NULL,

    PRIMARY KEY (`idHISTORIES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HISTORIES` ADD CONSTRAINT `HISTORIES_id_users_fk_fkey` FOREIGN KEY (`id_users_fk`) REFERENCES `users`(`idUSERS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HISTORIES` ADD CONSTRAINT `HISTORIES_id_stores_fk_fkey` FOREIGN KEY (`id_stores_fk`) REFERENCES `STORES`(`idStores`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HISTORIES` ADD CONSTRAINT `HISTORIES_id_deliverymen_fk_fkey` FOREIGN KEY (`id_deliverymen_fk`) REFERENCES `DELIVERYMEN`(`idDELIVERYMEN`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HISTORIES` ADD CONSTRAINT `HISTORIES_idDELIVERIES_fk_fkey` FOREIGN KEY (`idDELIVERIES_fk`) REFERENCES `DELIVERIES`(`idDELIVERIES`) ON DELETE SET NULL ON UPDATE CASCADE;
