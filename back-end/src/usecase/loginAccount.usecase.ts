import { compareSync } from "bcrypt";
import { prisma } from "../../prisma";
import { RefreshTokenUseCase } from "./refreshToken.usecase";

export class LoginAccountUseCase {
  async execute({ email, password }: { email: string; password: string }) {
    if (!password || !email) throw new Error("Body is missing");

    const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

    if (!TOKEN_SECRET) throw new Error("Unexpected Error");

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        refreshToken: {},
      },
    });

    if (!user) throw new Error("E-mail or password invalid");

    const userPassword = compareSync(password, user?.password);

    if (!userPassword) throw new Error("E-mail or password invalid");

    if (!user.refreshToken?.id) throw new Error("Unexpected Error");

    const refreshTokenUseCase = new RefreshTokenUseCase();
    const newTokens = await refreshTokenUseCase.execute({
      refreshToken: user.refreshToken.id,
      userId: user.id,
    });

    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
      expiresIn: newTokens.expiresIn,
    };
  }
}
