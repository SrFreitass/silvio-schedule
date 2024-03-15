import { http } from '@/models/http.interface';
import { axiosInstace } from './axios';

export const getVerifyAuth = async () => {
  const autheticated = await axiosInstace.get<http<string[]>>('/autheticated');

  return autheticated.data;
};
