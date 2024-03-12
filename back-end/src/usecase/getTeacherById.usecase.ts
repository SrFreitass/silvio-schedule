import { prisma } from "../../prisma";

export class GetTeacherByIdUseCase {
  async execute({ teacherId }: { teacherId: string }) {
    if (!teacherId) throw new Error("ID is invalid!");

    const teacher = await prisma.users.findUnique({
      where: {
        id: teacherId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        Schedule: true,
      },
    });

    return teacher;
  }
}
