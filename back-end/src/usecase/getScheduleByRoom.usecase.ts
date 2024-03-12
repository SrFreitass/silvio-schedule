import { prisma } from "../../prisma";

export class GetScheduleByRoomUseCase {
  async execute({ roomId }: { roomId: string }) {
    if (!roomId) throw new Error("Params is missing");
    const scheduleByRoom = await prisma.schedule.findMany({
      where: {
        room_id: roomId,
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
