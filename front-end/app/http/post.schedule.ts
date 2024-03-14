import { IitemSchedule } from '@/models/itemSchedule.interface';
import { tokens } from '@/providers/TokensSession';
import { newTokensProvider } from '@/providers/newTokens';
import axios, { AxiosError } from 'axios';

export const postSchedule = async ({
  date,
  roomId,
}: {
  date: string;
  roomId: string;
}) => {
  try {
    const item = await axios.post<IitemSchedule>(
      'http://localhost:8081/api/v1/schedule',
      {
        date,
        roomId,
      },
      {
        headers: {
          'access-token': tokens.accessToken,
        },
      },
    );

    return item.data.data;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) return;

    const messageError = error.response?.data?.message;

    if (messageError === 'jwt expired') {
      console.log('A CLEIDE É UMA ESTUPRADA!');
      await newTokensProvider();
      await postSchedule({ date, roomId });
    }
  }
};
