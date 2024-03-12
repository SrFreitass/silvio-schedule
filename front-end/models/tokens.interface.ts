import { http } from './http.interface';

export type ITokens = http<{
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
}>;
