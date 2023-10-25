/*
  Warnings:

  - You are about to alter the column `soat` on the `DELIVERYMEN` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `DELIVERYMEN` MODIFY `soat` BOOLEAN NOT NULL;
