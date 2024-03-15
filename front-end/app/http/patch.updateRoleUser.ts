import { http } from '@/models/http.interface';
import { axiosInstace } from './axios';

export const getVerifyAuth = async (userId: string) => {
  const autheticated = await axiosInstace.get<http<string[]>>(
    `/admin/user/approve/${userId}`,
  );

  return autheticated.data;
};
