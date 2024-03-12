import { FastifyReply, FastifyRequest } from "fastify";
import { GetTeacherByIdUseCase } from "../usecase/getTeacherById.usecase";

class TeacherController {
  async getTeacherById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const params = req.params as { teacherId: string };
      const useCase = new GetTeacherByIdUseCase();
      const output = await useCase.execute({ ...params });
      reply.send({
        statusCode: 200,
        message: "OK",
        data: output || "",
      });
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

export default new TeacherController();
