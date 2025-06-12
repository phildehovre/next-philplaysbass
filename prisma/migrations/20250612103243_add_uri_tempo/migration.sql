/*
  Warnings:

  - Added the required column `tempo` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uri` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "tempo" INTEGER NOT NULL,
ADD COLUMN     "uri" TEXT NOT NULL;
