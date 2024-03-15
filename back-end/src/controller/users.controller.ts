import { FastifyReply, FastifyRequest } from "fastify";
import { GetUsersStrangersUseCase } from "../usecase/GetUsersStrangers.usecase";
import { UpdateRoleUserUseCase } from "../usecase/UpdateRoleUser.usecase";

class UsersController {
  async updateRoleUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const params = req.params as { userId: string };
      const usecase = new UpdateRoleUserUseCase();
      const output = usecase.execute(params.userId);
      reply.send({
        statusCode: 200,
        message: "OK",
        data: output || "",
      });
    } catch (error) {
      reply.status(500);
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unexpected Error",
      };
    }
  }

  async getUsersStrangers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const usecase = new GetUsersStrangersUseCase();
      const output = await usecase.execute();

      reply.send({
        statusCode: 200,
        message: "OK",
        data: output,
      });
    } catch (error) {
      reply.status(500);
      return {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unexpected Error",
      };
    }
  }
}

export default new UsersController();
