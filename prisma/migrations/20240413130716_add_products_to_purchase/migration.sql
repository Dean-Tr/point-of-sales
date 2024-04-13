/*
  Warnings:

  - Added the required column `products` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `products` JSON NOT NULL;
