import { IscheduleRoom } from '@/models/scheduleRoom.interface';
import { tokens } from '@/providers/TokensSession';
import axios from 'axios';
import { baseURL } from './baseURL';

export const getScheduleByRoom = async (roomId: string) => {
  const schedule = await axios.get<IscheduleRoom>(
    `${baseURL}/schedule/${roomId}`,
    {
      headers: {
        'access-token': tokens.accessToken,
      },
    },
  );

  return schedule.data.data;
};
