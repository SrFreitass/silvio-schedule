import { http } from './http.interface';

export interface IitemScheduleData {
  id: string;
  date: Date;
  teacher_id: string;
  room_id: string;
}

export type IitemSchedule = http<IitemScheduleData>;
