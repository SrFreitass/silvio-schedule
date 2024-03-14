import { FastifyReply, FastifyRequest } from "fastify";
import { GetScheduleByRoomUseCase } from "../usecase/GetScheduleByRoom.usecase";
import { ToScheduleUseCase } from "../usecase/toSchedule.usecase";

class ScheduleController {
  async toSchedule(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = req.headers.userId as string;
      const body = req.body as {
        roomId: string;
        date: string;
      };
      const useCase = new ToScheduleUseCase();
      const output = await useCase.execute({ ...body, teacherId: userId });
      return {
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

  // async excel() {
  //   const data = [
  //     ["Sala de Tecnlogia 3"],
  //     ["Horário", "Turma", "Professor"],
  //     ["7:00", "2-A", "Gilmar"],
  //     ["7:00", "2-A", "Gilmar"],
  //     ["7:00", "2-A", "Gilmar"],
  //     ["7:00", "2-A", "Gilmar"],
  //   ];
  //   const sheetOptions = {
  //     "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }],
  //   };

  //   const buffer = xlsx.build([{ name: "mySheetName", data, options: {} }], {
  //     sheetOptions,
  //   });

  //   writeFileSync(__dirname + "test.xlsx", buffer);
  // }
}

export default new ScheduleController();
