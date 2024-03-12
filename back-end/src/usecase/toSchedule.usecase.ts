import { prisma } from "../../prisma";

export class ToScheduleUseCase {
  async execute({
    date,
    roomId,
    teacherId,
  }: {
    roomId: string;
    teacherId: string;
    date: string;
  }) {
    if (!date || !roomId || !teacherId) throw new Error("Body is missing");

    const itemsSchedule = await prisma.schedule.findMany({
      where: {
        AND: [
          {
            room_id: roomId,
          },
          {
            date,
          },
        ],
      },
    });

    console.log(itemsSchedule);

    if (itemsSchedule.length > 0)
      throw new Error("This room is already reserved at this time");

    const item = await prisma.schedule.create({
      data: {
        date,
        teacher_id: teacherId,
        room_id: roomId,
      },
    });

    return item;
  }
}
