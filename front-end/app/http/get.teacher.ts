import { http } from '@/models/http.interface';
import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import { ITeacherData } from '@/models/teacher.interface';
import axios from 'axios';

export const getTeacher = async ({
  accessToken,
  userId,
}: {
  userId: string;
  accessToken: string;
}) => {
  const teacher = await axios.get<
    http<ITeacherData & { Schedule: IscheduleRoomData }>
  >(`http://localhost:8081/api/v1/teachers/${userId}`, {
    headers: {
      'access-token': accessToken,
    },
  });

  return teacher.data;
};
