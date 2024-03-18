import { prisma } from "../../prisma";

export class DeleteScheduleDateUseCase {
  async execute(id: string) {
    return await prisma.schedule.delete({
      where: {
        id,
      },
    });
  }
}
