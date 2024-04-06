/*
  Warnings:

  - You are about to drop the column `catId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `catTitle` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_catId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `catId`,
    ADD COLUMN `catTitle` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_title_key` ON `Category`(`title`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_catTitle_fkey` FOREIGN KEY (`catTitle`) REFERENCES `Category`(`title`) ON DELETE RESTRICT ON UPDATE CASCADE;
