/*
  Warnings:

  - A unique constraint covering the columns `[name,doctor]` on the table `RoomChat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoomChat_name_doctor_key" ON "RoomChat"("name", "doctor");
