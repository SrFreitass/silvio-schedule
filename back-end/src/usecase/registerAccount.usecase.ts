import { genSaltSync, hashSync } from "bcrypt";
import { prisma } from "../../prisma";
import { NewTokenJWTProvider } from "../providers/newTokenJWT";

export class RegisterAccountUseCase {
  async execute({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    if (!name || !password || !email) throw new Error("Body is missing");

    const userExists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (userExists?.id) throw new Error("E-mail already exists");

    const salt = genSaltSync(10);
    const passwordHashed = hashSync(password, salt);
    const user = await prisma.users.create({
      data: {
        email,
        name,
        password: passwordHashed,
        role: "teacher",
      },
    });

    const tokenJWT = new NewTokenJWTProvider().execute(user.id);
    const expiresIn = new Date(new Date().getTime() + 2629746000).toISOString();
    const refreshToken = await prisma.refreshToken.create({
      data: {
        expiresIn,
        user_id: user.id,
      },
    });

    return {
      accessToken: tokenJWT,
      refreshToken: refreshToken.id,
      expiresIn,
    };
  }
}
