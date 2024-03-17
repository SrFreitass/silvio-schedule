import dayjs from 'dayjs';

export const week = [1, 2, 3, 4, 5].map((day) => {
  return dayjs().day(day).hour(1).minute(0).toDate();
});
