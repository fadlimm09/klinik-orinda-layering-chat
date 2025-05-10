/*
  Warnings:

  - You are about to drop the column `userId` on the `RoomChat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctor]` on the table `RoomChat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctor` to the `RoomChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RoomChat_name_key";

-- AlterTable
ALTER TABLE "RoomChat" DROP COLUMN "userId",
ADD COLUMN     "doctor" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomChat_doctor_key" ON "RoomChat"("doctor");
