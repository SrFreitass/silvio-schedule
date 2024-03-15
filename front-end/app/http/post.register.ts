import { ITokens } from '@/models/tokens.interface';
import { axiosInstace } from './axios';

export const postRegister = async ({
  email,
  name,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const tokens = await axiosInstace.post<ITokens>('/auth/register', {
    name,
    email,
    password,
  });

  return tokens.data;
};
