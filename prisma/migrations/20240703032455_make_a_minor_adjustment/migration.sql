/*
  Warnings:

  - Added the required column `director` to the `Films` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Films" ADD COLUMN     "director" TEXT NOT NULL;
