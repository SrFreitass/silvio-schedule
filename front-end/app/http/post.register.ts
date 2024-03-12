import { ITokens } from '@/models/tokens.interface';
import axios from 'axios';

export const postRegister = async ({
  email,
  name,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const tokens = await axios.post<ITokens>(
    'http://localhost:8081/api/v1/auth/register',
    {
      name,
      email,
      password,
    },
  );

  return tokens.data;
};
