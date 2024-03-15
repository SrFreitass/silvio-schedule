import { FastifyReply, FastifyRequest } from "fastify";
import { LoginAccountUseCase } from "../usecase/loginAccount.usecase";
import { RefreshTokenUseCase } from "../usecase/refreshToken.usecase";
import { RegisterAccountUseCase } from "../usecase/registerAccount.usecase";

class AuthController {
  async verifyAuthenticated(req: FastifyRequest, reply: FastifyReply) {
    return {
      statusCode: 200,
      message: "Authenticated",
    };
  }

  async verifyAdmin(req: FastifyRequest, reply: FastifyReply) {
    return {
      statusCode: 200,
      message: "User is admin",
    };
  }

  async refreshToken(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body as { refreshToken: string; userId: string };
      const useCase = new RefreshTokenUseCase();
      const output = await useCase.execute({ ...body });
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

  async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body as {
        name: string;
        email: string;
        password: string;
      };
      const useCase = new RegisterAccountUseCase();
      const output = await useCase.execute({ ...body });
      return {
        statusCode: 201,
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

  async login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body as { email: string; password: string };
      const useCase = new LoginAccountUseCase();
      const output = await useCase.execute({ ...body });
      return {
        statusCode: 200,
        message: "Authenticated",
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

export default new AuthController();
