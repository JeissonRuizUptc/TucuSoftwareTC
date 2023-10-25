/*
  Warnings:

  - You are about to alter the column `timestamp` on the `DELIVERIES` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the `HISTORIES` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `HISTORIES` DROP FOREIGN KEY `HISTORIES_id_delivey_fk_fkey`;

-- AlterTable
ALTER TABLE `DELIVERIES` MODIFY `idDELIVERIES` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `timestamp` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `HISTORIES`;
