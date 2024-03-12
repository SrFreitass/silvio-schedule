/*
  Warnings:

  - You are about to drop the column `roomId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_roomId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_teacherId_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "roomId",
DROP COLUMN "teacherId",
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
