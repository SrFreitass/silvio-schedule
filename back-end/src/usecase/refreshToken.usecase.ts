import dayjs from "dayjs";
import { prisma } from "../../prisma";
import { NewTokenJWTProvider } from "../providers/newTokenJWT";

export class RefreshTokenUseCase {
  async execute({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: string;
  }) {
    if (!refreshToken) throw new Error("Refresh Token is missing");

    console.info(refreshToken, "Refresh Token Front-end");

    const user = await prisma.users.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        refreshToken: {
          select: {
            id: true,
            expiresIn: true,
            user_id: true,
          },
        },
      },
    });

    if (refreshToken !== user.refreshToken?.id) {
      throw new Error("Refresh Token is invalid");
    }

    if (new Date(user.refreshToken.expiresIn) < new Date()) {
      throw new Error("Refresh Token expired");
    }

    await prisma.refreshToken.delete({
      where: {
        user_id: user.id,
      },
    });

    const newTokenJWT = new NewTokenJWTProvider().execute(userId);

    const expiresIn = dayjs().add(30, "days").toISOString();

    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        expiresIn,
        user_id: userId,
      },
    });

    return {
      refreshToken: newRefreshToken.id,
      accessToken: newTokenJWT,
      expiresIn: newRefreshToken.expiresIn,
    };
  }
}
