import { FastifyReply, FastifyRequest } from "fastify";
import { LoginAccountUseCase } from "../usecase/loginAccount.usecase";
import { RegisterAccountUseCase } from "../usecase/registerAccount.usecase";

class AuthController {
    async register(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as { name: string; email: string; password: string }
            const useCase = new RegisterAccountUseCase()
            const output = await useCase.execute({...body})
            return {
               statusCode: 201,
                message: 'OK',
                data: output
            }
        } catch(error) {
            console.error(error);
            reply.status(500)
            return {
                statusCode: 500,
                message: 'Unexpected Error',
            }
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as { email: string; password: string }
            const useCase = new LoginAccountUseCase()
            const output = await useCase.execute({ ...body })
            return {
               statusCode: 200,
                message: 'OK',
                data: output
            }
        } catch(error) {
            console.error(error);
            reply.status(500)
            return {
                statusCode: 500,
                message: 'Unexpected Error',
            }
        }
    }
}

export default new AuthController()