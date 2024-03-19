import { http } from './http.interface';

export interface IscheduleRoomData {
  id: string;
  room_id: string;
  date: string;
  class: string;
  teacher_id: string;
  teacher: {
    name: string;
  };
}

export type IscheduleRoom = http<IscheduleRoomData[]>;
