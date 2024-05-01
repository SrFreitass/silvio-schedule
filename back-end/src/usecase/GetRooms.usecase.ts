import { prisma } from "../../prisma";

export class GetRoomsUseCase {
  async execute() {
    return await prisma.rooms.findMany();
  }
}
