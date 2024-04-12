/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Admin_username_key` ON `admin`;

-- AlterTable
ALTER TABLE `rent` ADD COLUMN `isAccepted` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_password_key` ON `Admin`(`password`);
