/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);
