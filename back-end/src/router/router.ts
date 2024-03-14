import { FastifyInstance } from "fastify";
import authController from "../controller/auth.controller";
import scheduleController from "../controller/schedule.controller";
import teacherController from "../controller/teacher.controller";
import { verifyAuth } from "../middleware/auth.middleware";

export class Router {
  constructor(
    private readonly fastify: FastifyInstance,
    private readonly baseUrl: string,
  ) {
    fastify.get(
      `${baseUrl}/autheticated`,
      { preHandler: verifyAuth },
      authController.verifyAuthenticated,
    );
    fastify.post(`${baseUrl}/auth/refresh/token`, authController.refreshToken);

    fastify.post(`${baseUrl}/auth/register`, authController.register);
    fastify.post(`${baseUrl}/auth/login`, authController.login);

    fastify.post(
      `${baseUrl}/schedule`,
      { preHandler: verifyAuth },
      scheduleController.toSchedule,
    );
    fastify.get(
      `${baseUrl}/schedule/:roomId`,
      { preHandler: verifyAuth },
      scheduleController.getScheduleByRoom,
    );
    fastify.get(`${baseUrl}/schedule/excel`, scheduleController.excel);

    fastify.get(
      `${baseUrl}/teachers/:teacherId`,
      { preHandler: verifyAuth },
      teacherController.getTeacherById,
    );
  }
}
