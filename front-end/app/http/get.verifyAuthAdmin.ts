import { http } from '@/models/http.interface';
import { axiosInstace } from './axios';

export const getVerifyAuthAdmin = async () => {
  const autheticated = await axiosInstace.get<http<string[]>>('/admin');

  return autheticated.data;
};
