/*
  Warnings:

  - A unique constraint covering the columns `[propertyName]` on the table `PropertyType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PropertyType_propertyName_key` ON `PropertyType`(`propertyName`);
