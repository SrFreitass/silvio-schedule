import { prisma } from "../../prisma";

export class GetScheduleByRoomUseCase {
    async execute({ room }: { room: string}) {
        if(!room) throw new Error('Body is missing')

        const scheduleByRoom = await prisma.schedule.findMany({
            where: {
                room,
            }
        })

        return scheduleByRoom;
    }
}