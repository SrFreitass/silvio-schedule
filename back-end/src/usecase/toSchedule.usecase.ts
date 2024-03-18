import { prisma } from "../../prisma";

export class ToScheduleUseCase {
  async execute({
    date,
    roomId,
    teacherId,
    schoolClass,
  }: {
    roomId: string;
    teacherId: string;
    date: string;
    schoolClass: string;
  }) {
    if (!date || !roomId || !teacherId || !schoolClass)
      throw new Error("Body is missing");

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

    if (itemsSchedule.length > 0)
      throw new Error("This room is already reserved at this time");

    const item = await prisma.schedule.create({
      data: {
        date,
        teacher_id: teacherId,
        room_id: roomId,
        class: schoolClass,
      },
    });

    const items = await prisma.schedule.findMany({
      orderBy: {
        version: "asc",
      },
      where: {
        AND: [
          {
            room_id: item.room_id,
          },
          {
            date: item.date,
          },
        ],
      },
    });

    if (items?.length > 1) {
      items.forEach(async (item, index) => {
        try {
          if (index < 1) return;
          const itemDeleted = await prisma.schedule.delete({
            where: {
              id: item.id,
            },
          });

          if (itemDeleted.id === item.id) {
            throw new Error("This room is already reserved at this time");
          }
        } catch (error) {
          console.error(error);
        }
      });
    }

    return item;
  }
}
