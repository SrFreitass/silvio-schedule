import { prisma } from "../../prisma";

const rooms = {'STE3': true, 'STE2': true, 'LABORÁTORIO DE MATEMÁTICA': true,  'LABORÁTORIO DE QUÍMICA': true}

export class toScheduleUseCase {
    async execute({ date, room, teacherId}: { room: string; teacherId: string; date: Date }) {
        if(!date || !room || !teacherId) throw new Error('Body is missing');

        if(!rooms[room.toUpperCase() as keyof typeof rooms]) throw new Error('Room is invalid');

        const item = await prisma.schedule.create({
            data: {
                date,
                room: room.toUpperCase(), 
                teacher_id: teacherId
            }
        })

        return item;
    }
}