-- CreateTable
CREATE TABLE "TimerSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Untitled Set',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TimerSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "initialDuration" INTEGER NOT NULL,
    "bpm" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "postCooldown" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "timerSetId" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimerSet" ADD CONSTRAINT "TimerSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_timerSetId_fkey" FOREIGN KEY ("timerSetId") REFERENCES "TimerSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
