import { IitemSchedule } from '@/models/itemSchedule.interface';
import { tokens } from '@/providers/TokensSession';
import axios from 'axios';

export const postSchedule = async ({
  date,
  roomId,
}: {
  date: string;
  roomId: string;
}) => {
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
};
