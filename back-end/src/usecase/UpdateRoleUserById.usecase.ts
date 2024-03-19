import { prisma } from "../../prisma";

export class UpdateRoleUserUseCase {
  async execute(userId: string) {
    if (!userId) throw new Error("UserId is missing");

    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        role: "teacher",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
