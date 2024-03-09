-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "teacher_id" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
