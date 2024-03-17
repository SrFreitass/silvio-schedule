import { FastifyInstance } from "fastify";
import authController from "../controller/auth.controller";
import scheduleController from "../controller/schedule.controller";
import teacherController from "../controller/teacher.controller";
import usersController from "../controller/users.controller";
import { verifyAuth } from "../middleware/auth.middleware";
import { verifyAuthAdmin } from "../middleware/authVerifyAdmin.middleware";

export class Router {
  constructor(
    private readonly fastify: FastifyInstance,
    private readonly baseUrl: string,
  ) {
    // Verify Auth Routers;
    fastify.get(
      `${baseUrl}/autheticated`,
      { preHandler: verifyAuth },
      authController.verifyAuthenticated,
    );
    fastify.get(
      `${baseUrl}/admin`,
      { preHandler: verifyAuthAdmin },
      authController.verifyAdmin,
    );

    // Users Router
    fastify.get(
      `${baseUrl}/admin/verification/users`,
      { preHandler: verifyAuthAdmin },
      usersController.getUsersStrangers,
    );
    fastify.patch(
      `${baseUrl}/admin/user/approve/:userId`,
      { preHandler: verifyAuthAdmin },
      usersController.updateRoleUser,
    );
    fastify.delete(
      `${baseUrl}/admin/user/disapprove/:userId`,
      { preHandler: verifyAuthAdmin },
      usersController.deleteUser,
    );

    // Auth Routers;
    fastify.post(`${baseUrl}/auth/refresh/token`, authController.refreshToken);
    fastify.post(`${baseUrl}/auth/register`, authController.register);
    fastify.post(`${baseUrl}/auth/login`, authController.login);

    // Schedule Routers;
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

    // Teacher Routers;
    fastify.get(
      `${baseUrl}/teachers/:teacherId`,
      { preHandler: verifyAuth },
      teacherController.getTeacherById,
    );
  }
}
