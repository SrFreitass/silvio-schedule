import { sign } from "jsonwebtoken";

export class NewTokenJWTProvider {
  execute(userId: string) {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;

    if (!TOKEN_SECRET) throw new Error("Unexpected Error");
    const accessToken = sign(
      {
        userId,
      },
      TOKEN_SECRET,
      {
        expiresIn: "30s",
      },
    );

    return accessToken;
  }
}
