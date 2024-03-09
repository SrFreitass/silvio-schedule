import { prisma } from "../../prisma";

export class GetTeacherByIdUseCase {
    async execute({ teacherId }: { teacherId: string}) {
        if(!teacherId) throw new Error('ID is invalid!')

        const teacher = await prisma.users.findUnique({
            where: {
                id: teacherId,
            },
            include: {
                Schedule: {}
            }
        })

        return teacher;
    }
}