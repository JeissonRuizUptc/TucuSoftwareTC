/*
  Warnings:

  - You are about to drop the column `id_placess_fk` on the `DELIVERYMEN` table. All the data in the column will be lost.
  - You are about to drop the column `id_place_fk` on the `STORES` table. All the data in the column will be lost.
  - You are about to drop the `CITIES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PLACES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `STATES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ADDRESSESToDELIVERIES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ADDRESSESToDELIVERYMEN` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ADDRESSESToSTORES` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_address_fk` to the `DELIVERIES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_address_men_fk` to the `DELIVERYMEN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_address_fk_store` to the `STORES` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ADDRESSES` DROP FOREIGN KEY `ADDRESSES_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `CITIES` DROP FOREIGN KEY `CITIES_id_state_fkey`;

-- DropForeignKey
ALTER TABLE `DELIVERYMEN` DROP FOREIGN KEY `DELIVERYMEN_id_placess_fk_fkey`;

-- DropForeignKey
ALTER TABLE `STATES` DROP FOREIGN KEY `STATES_id_country_fkey`;

-- DropForeignKey
ALTER TABLE `STORES` DROP FOREIGN KEY `STORES_id_place_fk_fkey`;

-- DropForeignKey
ALTER TABLE `_ADDRESSESToDELIVERIES` DROP FOREIGN KEY `_ADDRESSESToDELIVERIES_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ADDRESSESToDELIVERIES` DROP FOREIGN KEY `_ADDRESSESToDELIVERIES_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ADDRESSESToDELIVERYMEN` DROP FOREIGN KEY `_ADDRESSESToDELIVERYMEN_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ADDRESSESToDELIVERYMEN` DROP FOREIGN KEY `_ADDRESSESToDELIVERYMEN_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ADDRESSESToSTORES` DROP FOREIGN KEY `_ADDRESSESToSTORES_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ADDRESSESToSTORES` DROP FOREIGN KEY `_ADDRESSESToSTORES_B_fkey`;

-- AlterTable
ALTER TABLE `DELIVERIES` ADD COLUMN `id_address_fk` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `DELIVERYMEN` DROP COLUMN `id_placess_fk`,
    ADD COLUMN `id_address_men_fk` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `STORES` DROP COLUMN `id_place_fk`,
    ADD COLUMN `id_address_fk_store` INTEGER NOT NULL;

-- DropTable
DROP TABLE `CITIES`;

-- DropTable
DROP TABLE `PLACES`;

-- DropTable
DROP TABLE `STATES`;

-- DropTable
DROP TABLE `_ADDRESSESToDELIVERIES`;

-- DropTable
DROP TABLE `_ADDRESSESToDELIVERYMEN`;

-- DropTable
DROP TABLE `_ADDRESSESToSTORES`;

-- CreateTable
CREATE TABLE `PROVINCE` (
    `idPROVINCE` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_country` INTEGER NOT NULL,

    PRIMARY KEY (`idPROVINCE`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CITY` (
    `idCITY` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_province` INTEGER NOT NULL,

    PRIMARY KEY (`idCITY`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PROVINCE` ADD CONSTRAINT `PROVINCE_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `COUNTRIES`(`idCOUNTRIES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CITY` ADD CONSTRAINT `CITY_id_province_fkey` FOREIGN KEY (`id_province`) REFERENCES `PROVINCE`(`idPROVINCE`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ADDRESSES` ADD CONSTRAINT `ADDRESSES_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `CITY`(`idCITY`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DELIVERYMEN` ADD CONSTRAINT `DELIVERYMEN_id_address_men_fk_fkey` FOREIGN KEY (`id_address_men_fk`) REFERENCES `ADDRESSES`(`idADDRESSES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `STORES` ADD CONSTRAINT `STORES_id_address_fk_store_fkey` FOREIGN KEY (`id_address_fk_store`) REFERENCES `ADDRESSES`(`idADDRESSES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DELIVERIES` ADD CONSTRAINT `DELIVERIES_id_address_fk_fkey` FOREIGN KEY (`id_address_fk`) REFERENCES `ADDRESSES`(`idADDRESSES`) ON DELETE RESTRICT ON UPDATE CASCADE;
