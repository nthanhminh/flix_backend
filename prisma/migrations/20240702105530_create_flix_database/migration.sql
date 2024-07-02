/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Films" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "mainActors" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Films_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentShowing" (
    "id" SERIAL NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "CurrentShowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComingSoon" (
    "id" SERIAL NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "ComingSoon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieSchedule" (
    "id" SERIAL NOT NULL,
    "filmId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "location" INTEGER NOT NULL,

    CONSTRAINT "MovieSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalPrice" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" BYTEA NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Combo" (
    "id" SERIAL NOT NULL,
    "price" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodCombo" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "comboId" INTEGER NOT NULL,

    CONSTRAINT "FoodCombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetails" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "foodId" INTEGER,
    "comboId" INTEGER,
    "seatValue" TEXT,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatingOrderDetails" (
    "id" SERIAL NOT NULL,
    "orderDetailId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "movieScheduleId" INTEGER NOT NULL,

    CONSTRAINT "SeatingOrderDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentShowing_filmId_key" ON "CurrentShowing"("filmId");

-- CreateIndex
CREATE UNIQUE INDEX "ComingSoon_filmId_key" ON "ComingSoon"("filmId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieSchedule_filmId_key" ON "MovieSchedule"("filmId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_customerId_key" ON "Orders"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "SeatingOrderDetails_orderDetailId_key" ON "SeatingOrderDetails"("orderDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "SeatingOrderDetails_movieScheduleId_key" ON "SeatingOrderDetails"("movieScheduleId");

-- AddForeignKey
ALTER TABLE "CurrentShowing" ADD CONSTRAINT "CurrentShowing_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComingSoon" ADD CONSTRAINT "ComingSoon_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSchedule" ADD CONSTRAINT "MovieSchedule_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodCombo" ADD CONSTRAINT "FoodCombo_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodCombo" ADD CONSTRAINT "FoodCombo_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatingOrderDetails" ADD CONSTRAINT "SeatingOrderDetails_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatingOrderDetails" ADD CONSTRAINT "SeatingOrderDetails_movieScheduleId_fkey" FOREIGN KEY ("movieScheduleId") REFERENCES "MovieSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
