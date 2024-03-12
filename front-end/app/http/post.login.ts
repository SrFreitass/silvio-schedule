import { ITokens } from '@/models/tokens.interface';
import axios from 'axios';

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const tokens = await axios.post<ITokens>(
    'http://localhost:8081/api/v1/auth/login',
    {
      email,
      password,
    },
  );

  return tokens.data;
};
