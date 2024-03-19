import cors from "@fastify/cors";
import fastify from "fastify";
import { Router } from "./src/router/router";

export const app = fastify();

const router = new Router(app, "/api/v1");

app.register(cors, {
  origin: "*",
  methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
});

app.listen({
  port: 8081,
});
