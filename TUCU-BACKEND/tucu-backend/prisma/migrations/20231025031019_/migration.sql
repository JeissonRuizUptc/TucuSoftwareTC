/*
  Warnings:

  - You are about to alter the column `preparation_time` on the `DELIVERIES` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `DELIVERIES` MODIFY `preparation_time` INTEGER NOT NULL;
