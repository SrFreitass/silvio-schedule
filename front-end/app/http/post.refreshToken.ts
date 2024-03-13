import { ITokens } from '@/models/tokens.interface';
import axios from 'axios';

export const postRefreshToken = async ({
  refreshToken,
  userId,
}: {
  refreshToken: string;
  userId: string;
}) => {
  const newTokens = await axios.post<ITokens>(
    'http://localhost:8081/api/v1/auth/refresh/token',
    {
      refreshToken,
      userId,
    },
  );

  return newTokens.data.data;
};
