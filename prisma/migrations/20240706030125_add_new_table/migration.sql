-- CreateTable
CREATE TABLE "TicetkPrices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "TicetkPrices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicetkPrices" ADD CONSTRAINT "TicetkPrices_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
