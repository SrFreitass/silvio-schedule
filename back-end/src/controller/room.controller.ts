import { FastifyReply, FastifyRequest } from "fastify";
import { GetRoomsUseCase } from "../usecase/GetRooms.usecase";

class RoomsController {
  async getRooms(req: FastifyRequest, reply: FastifyReply) {
    const usecase = new GetRoomsUseCase();
    const output = await usecase.execute();

    return {
      statusCode: 200,
      message: "OK",
      output,
    };
  }
}

export default new RoomsController();
