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

    console.info(refreshToken, userId);

    const user = await prisma.users.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        refreshToken: {},
      },
    });

    if (user.refreshToken && refreshToken !== user.refreshToken.id) {
      throw new Error("Refresh Token is invalid");
    }

    if (
      user?.refreshToken &&
      new Date(user.refreshToken.expiresIn) < new Date()
    ) {
      throw new Error("Refresh Token expired");
    }

    await prisma.refreshToken.delete({
      where: {
        id: refreshToken,
      },
    });

    const expiresIn = new Date(new Date().getTime() + 2629746000).toISOString();
    const newRefreshToken = await prisma.refreshToken.create({
      data: {
        expiresIn,
        user_id: userId,
      },
    });

    const newTokenJWT = new NewTokenJWTProvider().execute(userId);

    return {
      accessToken: newTokenJWT,
      refreshToken: newRefreshToken.id,
      expiresIn: newRefreshToken.expiresIn,
    };
  }
}
