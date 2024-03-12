import { http } from './http.interface';

export interface ITeacherData {
  id: string;
  role: string;
  name: string;
  email: string;
  date: Date;
  teacher_id: string;
}

export type ITeacher = http<ITeacherData>;
