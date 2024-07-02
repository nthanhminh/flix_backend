-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "usename" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
