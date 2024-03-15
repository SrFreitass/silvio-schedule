import { FastifyReply, FastifyRequest } from "fastify";
import { decode, verify } from "jsonwebtoken";
import { prisma } from "../../prisma";

export async function verifyAuth(
  req: FastifyRequest,
  reply: FastifyReply,
  next: any,
) {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  if (!TOKEN_SECRET) throw new Error("Unexpected Error");
  const token = req.headers["access-token"] as string;

  if (!token) throw new Error("Unauthenticated");

  verify(token, TOKEN_SECRET);
  const { userId } = decode(token) as { userId: string };

  console.log(userId, "USER_ID");

  const user = await prisma.users.findUnique({
    where: {
      id: userId || "",
    },
  });

  if (!user?.id) throw new Error("Unauthenticated");

  if (user.role === "stranger") throw new Error("Unauthorized");

  req.headers.userId = user.id;

  return next();
}
