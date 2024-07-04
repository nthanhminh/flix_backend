/*
  Warnings:

  - Added the required column `hour` to the `MovieSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minute` to the `MovieSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieSchedule" ADD COLUMN     "hour" INTEGER NOT NULL,
ADD COLUMN     "minute" INTEGER NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;
