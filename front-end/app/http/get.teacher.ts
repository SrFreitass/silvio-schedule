import { http } from '@/models/http.interface';
import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import { ITeacherData } from '@/models/teacher.interface';
import { axiosInstace } from './axios';

export const getTeacher = async (userId: string) => {
  const teacher = await axiosInstace.get<
    http<ITeacherData & { Schedule: IscheduleRoomData }>
  >(`/teachers/${userId}`);

  return teacher.data;
};
