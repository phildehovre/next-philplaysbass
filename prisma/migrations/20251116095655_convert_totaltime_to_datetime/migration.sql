/*
  Warnings:

  - Changed the type of `totalTime` on the `UserStats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserStats"
  ALTER COLUMN "totalTime" TYPE TIMESTAMP
  USING to_timestamp("totalTime" / 1000.0);
