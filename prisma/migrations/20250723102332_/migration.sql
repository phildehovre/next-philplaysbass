/*
  Warnings:

  - You are about to drop the column `bpm` on the `PracticeSession` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `PracticeSession` table. All the data in the column will be lost.
  - You are about to drop the column `scaleType` on the `PracticeSession` table. All the data in the column will be lost.
  - You are about to drop the column `withTimer` on the `PracticeSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PracticeSession" DROP COLUMN "bpm",
DROP COLUMN "key",
DROP COLUMN "scaleType",
DROP COLUMN "withTimer";
