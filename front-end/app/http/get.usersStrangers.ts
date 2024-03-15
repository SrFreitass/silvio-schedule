import { http } from '@/models/http.interface';
import { ITeacherData } from '@/models/teacher.interface';
import { axiosInstace } from './axios';

export const getUsersStrangers = async () => {
  const item = await axiosInstace.get<http<ITeacherData[]>>(
    '/admin/verification/users',
  );

  return item.data.data;
};
