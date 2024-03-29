import { axiosInstace } from './axios';

export const getDay = async () => {
  return (await axiosInstace.get('/day')).data;
};
