import { FastifyInstance } from "fastify";
import authController from "../controller/auth.controller";
import scheduleController from "../controller/schedule.controller";
import teacherController from "../controller/teacher.controller";

export class Router {
    constructor(private readonly fastify: FastifyInstance, private readonly baseUrl: string) {
        fastify.post(`${baseUrl}/auth/register`, authController.register)
        fastify.post(`${baseUrl}/auth/login`, authController.login)

        fastify.post(`${baseUrl}/schedule`, scheduleController.toSchedule)
        fastify.get(`${baseUrl}/schedules/:room`, scheduleController.getScheduleByRoom)

        fastify.get(`${baseUrl}/teacher/:teacherId`, teacherController.getTeacherById)
    }
}