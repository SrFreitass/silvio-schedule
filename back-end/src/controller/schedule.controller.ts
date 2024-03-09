import { FastifyReply, FastifyRequest } from "fastify";
import { GetScheduleByRoomUseCase } from "../usecase/getScheduleByRoom.usecase";
import { toScheduleUseCase } from "../usecase/toSchedule.usecase";

class ScheduleController {
    async toSchedule(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as { room: string; teacherId: string; date: Date }
            const useCase = new toScheduleUseCase()
            const output = await useCase.execute({ ...body })
            return {
                data: output
            }
        } catch (error) {
            console.error(error);
            reply.status(500)
            return {
                statusCode: 500,
                message: 'Unexpected Error',
            }
        }
    }

    async getScheduleByRoom(req: FastifyRequest, reply: FastifyReply) {
        try {
            const params = req.params as { room: string; }
            const useCase = new GetScheduleByRoomUseCase()
            const output = await useCase.execute({ ...params })
            return {
                statusCode: 200,
                message: 'OK',
                data: output
            }
        } catch (error) {
            console.error(error);
            reply.status(500)
            return {
                statusCode: 500,
                message: 'Unexpected Error',
            }
        }
    }
}

export default new ScheduleController()