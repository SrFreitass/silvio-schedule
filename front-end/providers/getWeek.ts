import { getDay } from '@/http/get.day';
import dayjs from 'dayjs';

export const week = async () => {
  const currentDay = await getDay();
  return Promise.all(
    [1, 2, 3, 4, 5].map(async (day) => {
      return dayjs(currentDay).day(day).hour(1).minute(0).toDate();
    }),
  );
};
