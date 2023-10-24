/*
  Warnings:

  - You are about to drop the column `destination_addres` on the `DELIVERIES` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `DELIVERYMEN` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `STORES` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DELIVERIES` DROP COLUMN `destination_addres`;

-- AlterTable
ALTER TABLE `DELIVERYMEN` DROP COLUMN `address`;

-- AlterTable
ALTER TABLE `STORES` DROP COLUMN `address`;

-- CreateTable
CREATE TABLE `COUNTRIES` (
    `idCOUNTRIES` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCOUNTRIES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `STATES` (
    `idSTATES` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_country` INTEGER NOT NULL,

    PRIMARY KEY (`idSTATES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CITIES` (
    `idCITIES` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_state` INTEGER NOT NULL,

    PRIMARY KEY (`idCITIES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ADDRESSES` (
    `idADDRESSES` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NOT NULL,
    `cityId` INTEGER NOT NULL,

    PRIMARY KEY (`idADDRESSES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ADDRESSESToSTORES` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ADDRESSESToSTORES_AB_unique`(`A`, `B`),
    INDEX `_ADDRESSESToSTORES_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ADDRESSESToDELIVERYMEN` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ADDRESSESToDELIVERYMEN_AB_unique`(`A`, `B`),
    INDEX `_ADDRESSESToDELIVERYMEN_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ADDRESSESToDELIVERIES` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ADDRESSESToDELIVERIES_AB_unique`(`A`, `B`),
    INDEX `_ADDRESSESToDELIVERIES_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `STATES` ADD CONSTRAINT `STATES_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `COUNTRIES`(`idCOUNTRIES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CITIES` ADD CONSTRAINT `CITIES_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `STATES`(`idSTATES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ADDRESSES` ADD CONSTRAINT `ADDRESSES_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `CITIES`(`idCITIES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ADDRESSESToSTORES` ADD CONSTRAINT `_ADDRESSESToSTORES_A_fkey` FOREIGN KEY (`A`) REFERENCES `ADDRESSES`(`idADDRESSES`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ADDRESSESToSTORES` ADD CONSTRAINT `_ADDRESSESToSTORES_B_fkey` FOREIGN KEY (`B`) REFERENCES `STORES`(`idStores`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ADDRESSESToDELIVERYMEN` ADD CONSTRAINT `_ADDRESSESToDELIVERYMEN_A_fkey` FOREIGN KEY (`A`) REFERENCES `ADDRESSES`(`idADDRESSES`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ADDRESSESToDELIVERYMEN` ADD CONSTRAINT `_ADDRESSESToDELIVERYMEN_B_fkey` FOREIGN KEY (`B`) REFERENCES `DELIVERYMEN`(`idDELIVERYMEN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ADDRESSESToDELIVERIES` ADD CONSTRAINT `_ADDRESSESToDELIVERIES_A_fkey` FOREIGN KEY (`A`) REFERENCES `ADDRESSES`(`idADDRESSES`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ADDRESSESToDELIVERIES` ADD CONSTRAINT `_ADDRESSESToDELIVERIES_B_fkey` FOREIGN KEY (`B`) REFERENCES `DELIVERIES`(`idDELIVERIES`) ON DELETE CASCADE ON UPDATE CASCADE;
