/*
  Warnings:

  - Added the required column `totalScore` to the `UserStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStats" ADD COLUMN     "totalScore" INTEGER NOT NULL;
