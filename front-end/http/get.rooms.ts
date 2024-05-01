import { axiosInstace } from './axios';

export async function getRooms() {
  return (await axiosInstace.get('/rooms')).data.output;
}
