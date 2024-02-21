/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyImageId]` on the table `PropertyImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyTypeId]` on the table `PropertyType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rentId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Payment_paymentId_key` ON `Payment`(`paymentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Property_propertyId_key` ON `Property`(`propertyId`);

-- CreateIndex
CREATE UNIQUE INDEX `PropertyImage_propertyImageId_key` ON `PropertyImage`(`propertyImageId`);

-- CreateIndex
CREATE UNIQUE INDEX `PropertyType_propertyTypeId_key` ON `PropertyType`(`propertyTypeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rent_rentId_key` ON `Rent`(`rentId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_userId_key` ON `User`(`userId`);
