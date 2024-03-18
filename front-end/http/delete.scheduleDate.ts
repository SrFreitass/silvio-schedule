import { http } from '@/models/http.interface';
import { IscheduleRoom } from '@/models/scheduleRoom.interface';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { axiosInstace } from './axios';

export const deleteScheduleDate = async (id: string) => {
  try {
    const scheduleDateDeleted = await axiosInstace.delete<http<IscheduleRoom>>(
      `/schedule/${id}`,
    );
    return scheduleDateDeleted.data;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) return;

    const messageError = error.response?.data?.message;

    if (messageError === 'jwt expired') {
      await newTokensProvider();
      await deleteScheduleDate(id);
    }
  }
};
