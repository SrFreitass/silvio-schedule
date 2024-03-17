import { ITokens } from '@/models/tokens.interface';
import { axiosInstace } from './axios';

export const postRefreshToken = async ({
  refreshToken,
  userId,
}: {
  refreshToken: string;
  userId: string;
}) => {
  const newTokens = await axiosInstace.post<ITokens>('/auth/refresh/token', {
    refreshToken,
    userId,
  });

  return newTokens.data.data;
};
