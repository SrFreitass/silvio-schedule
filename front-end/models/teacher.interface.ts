import { http } from './http.interface';

export interface ITeacherData {
  id: string;
  role: string;
  name: string;
  email: string;
  date: Date;
  createdAt: string;
}

export type ITeacher = http<ITeacherData>;
