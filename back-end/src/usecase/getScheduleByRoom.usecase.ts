import dayjs from "dayjs";
import { prisma } from "../../prisma";

export class GetScheduleByRoomUseCase {
  async execute({ roomId }: { roomId: string }) {
    if (!roomId) throw new Error("Params is missing");
    const scheduleByRoom = await prisma.schedule.findMany({
      where: {
        AND: [
          {
            room_id: roomId,
          },
          {
            date: {
              gte: dayjs().day(0).hour(1).toISOString(),
            },
          },
        ],
      },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    return scheduleByRoom;
  }
}
