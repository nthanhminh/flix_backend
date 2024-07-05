/*
  Warnings:

  - Made the column `quantity` on table `OrderDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderDetails" ALTER COLUMN "quantity" SET NOT NULL;
