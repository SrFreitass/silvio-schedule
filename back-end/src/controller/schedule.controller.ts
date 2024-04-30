import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteScheduleDateUseCase } from "../usecase/DeleteScheduleDate.usecase";
import { GetScheduleByRoomUseCase } from "../usecase/getScheduleByRoom.usecase";
import { ToScheduleUseCase } from "../usecase/toSchedule.usecase";

class ScheduleController {
  async deleteScheduleDate(req: FastifyRequest, reply: FastifyReply) {
    try {
      const params = req.params as { id: string };
      const useCase = new DeleteScheduleDateUseCase();
      const output = await useCase.execute(params.id);
      return {
        statusCode: 200,
        message: "DELETED",
        data: output,
      };
    } catch (error) {
      reply.status(500);
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unexpected Error",
      };
    }
  }

  async toSchedule(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = req.headers.userId as string;

      const body = req.body as {
        roomId: string;
        date: string;
        schoolClass: string;
      };

      const useCase = new ToScheduleUseCase();
      const output = await useCase.execute({ ...body, teacherId: userId });
      return {
        statusCode: 200,
        message: "OK",
        data: output,
      };
    } catch (error) {
      reply.status(500);
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unexpected Error",
      };
    }
  }

  async getScheduleByRoom(req: FastifyRequest, reply: FastifyReply) {
    try {
      const params = req.params as { roomId: string };
      const useCase = new GetScheduleByRoomUseCase();
      const output = await useCase.execute({ ...params });
      return {
        statusCode: 200,
        message: "OK",
        data: output,
      };
    } catch (error) {
      console.error(error);
      reply.status(500);
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unexpected Error",
      };
    }
  }
}

export default new ScheduleController();
