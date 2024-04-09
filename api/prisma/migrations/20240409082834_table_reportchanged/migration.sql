/*
  Warnings:

  - You are about to drop the column `reportReason` on the `report` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Payment_propertyId_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `report` DROP COLUMN `reportReason`;
