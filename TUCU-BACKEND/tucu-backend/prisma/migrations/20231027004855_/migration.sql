/*
  Warnings:

  - You are about to drop the column `id_address_fk` on the `DELIVERIES` table. All the data in the column will be lost.
  - You are about to drop the column `id_address_men_fk` on the `DELIVERYMEN` table. All the data in the column will be lost.
  - You are about to drop the column `id_address_fk_store` on the `STORES` table. All the data in the column will be lost.
  - You are about to drop the `ADDRESSES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CITY` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `COUNTRIES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PROVINCE` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `DELIVERIES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `DELIVERYMEN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `STORES` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ADDRESSES` DROP FOREIGN KEY `ADDRESSES_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `CITY` DROP FOREIGN KEY `CITY_id_province_fkey`;

-- DropForeignKey
ALTER TABLE `DELIVERIES` DROP FOREIGN KEY `DELIVERIES_id_address_fk_fkey`;

-- DropForeignKey
ALTER TABLE `DELIVERYMEN` DROP FOREIGN KEY `DELIVERYMEN_id_address_men_fk_fkey`;

-- DropForeignKey
ALTER TABLE `PROVINCE` DROP FOREIGN KEY `PROVINCE_id_country_fkey`;

-- DropForeignKey
ALTER TABLE `STORES` DROP FOREIGN KEY `STORES_id_address_fk_store_fkey`;

-- AlterTable
ALTER TABLE `DELIVERIES` DROP COLUMN `id_address_fk`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `DELIVERYMEN` DROP COLUMN `id_address_men_fk`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `STORES` DROP COLUMN `id_address_fk_store`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ADDRESSES`;

-- DropTable
DROP TABLE `CITY`;

-- DropTable
DROP TABLE `COUNTRIES`;

-- DropTable
DROP TABLE `PROVINCE`;
