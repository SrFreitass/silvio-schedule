import { ITokens } from '@/models/tokens.interface';
import axios from 'axios';

export const postRefreshToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const newTokens = await axios.post<ITokens>(
    'http://localhost:8081/api/v1/refresh/token',
    {
      refreshToken,
    },
  );

  return newTokens.data;
};
