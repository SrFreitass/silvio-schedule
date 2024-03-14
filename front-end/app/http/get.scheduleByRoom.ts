import { IscheduleRoom } from '@/models/scheduleRoom.interface';
import { tokens } from '@/providers/TokensSession';
import { newTokensProvider } from '@/providers/newTokens';
import axios, { AxiosError } from 'axios';
import { baseURL } from './baseURL';

export const getScheduleByRoom = async (roomId: string) => {
  try {
    const schedule = await axios.get<IscheduleRoom>(
      `${baseURL}/schedule/${roomId}`,
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
      console.log('A CLEIDE É UMA ESTUPRADA!');
      await newTokensProvider();
      await getScheduleByRoom(roomId);
    }
  }
};
