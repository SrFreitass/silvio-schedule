import { ITokens } from '@/models/tokens.interface';
import { axiosInstace } from './axios';

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const tokens = await axiosInstace.post<ITokens>('auth/login', {
    email,
    password,
  });

  return tokens.data;
};
