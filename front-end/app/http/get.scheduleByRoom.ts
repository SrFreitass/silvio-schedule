import { IscheduleRoom } from '@/models/scheduleRoom.interface';
import { tokens } from '@/providers/TokensSession';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { axiosInstace } from './axios';

export const getScheduleByRoom = async (roomId: string) => {
  try {
    const schedule = await axiosInstace.get<IscheduleRoom>(
      `/schedule/${roomId}`,
      {
        headers: {
          'access-token': tokens.accessToken,
        },
      },
    );

    return schedule.data.data;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) return;

    const messageError = error.response?.data?.message;

    if (messageError === 'jwt expired') {
      await newTokensProvider();
      await getScheduleByRoom(roomId);
    }
  }
};
