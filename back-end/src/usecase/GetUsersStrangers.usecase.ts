import { prisma } from "../../prisma";

export class GetUsersStrangersUseCase {
  async execute() {
    const usersStrangers = await prisma.users.findMany({
      where: {
        role: "stranger",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return usersStrangers;
  }
}
