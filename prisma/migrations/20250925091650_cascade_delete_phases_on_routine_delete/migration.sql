-- DropForeignKey
ALTER TABLE "Phase" DROP CONSTRAINT "Phase_timerSetId_fkey";

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_timerSetId_fkey" FOREIGN KEY ("timerSetId") REFERENCES "TimerSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
