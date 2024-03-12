import { http } from '@/models/http.interface';
import axios from 'axios';

export const getVerifyAuth = async (accessToken: string) => {
  const autheticated = await axios.get<http<string[]>>(
    'http://localhost:8081/api/v1/autheticated',
    {
      headers: {
        'access-token': accessToken,
      },
    },
  );

  return autheticated.data;
};
