/*
  Warnings:

  - Added the required column `image` to the `Combo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "image" BYTEA NOT NULL;
