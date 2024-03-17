import { prisma } from "../../prisma";

export class DeleteUserByIdUseCase {
  async execute(userId: string) {
    const userDeleted = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    return userDeleted;
  }
}
