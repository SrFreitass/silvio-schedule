import { IitemSchedule } from '@/models/itemSchedule.interface';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { axiosInstace } from './axios';

export const postSchedule = async ({
  date,
  roomId,
  schoolClass,
}: {
  date: string;
  roomId: string;
  schoolClass: string;
}) => {
  try {
    const item = await axiosInstace.post<IitemSchedule>('/schedule', {
      date,
      roomId,
      schoolClass,
    });

    return item.data.data;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) return;

    const messageError = error.response?.data?.message;

    if (messageError === 'jwt expired') {
      await newTokensProvider();
      await postSchedule({ date, roomId, schoolClass });
    }
  }
};
