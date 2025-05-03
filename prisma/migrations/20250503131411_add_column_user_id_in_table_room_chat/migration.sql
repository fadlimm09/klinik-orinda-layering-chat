/*
  Warnings:

  - Added the required column `userId` to the `RoomChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomChat" ADD COLUMN     "userId" TEXT NOT NULL;
