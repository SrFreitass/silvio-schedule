'use client';

import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import { ITeacherData } from '@/models/teacher.interface';
import { RouterPrivate } from '@/router/RouterPrivate';

import { tokens } from '@/providers/TokensSession';
import { useEffect, useState } from 'react';
import { getScheduleByRoom } from '../http/get.scheduleByRoom';
import { getTeacher } from '../http/get.teacher';
import { Room } from './components/Room';
import { Dates } from './components/Schedule';
import { Shifts } from './components/Shifts';
import { ToSchedule } from './components/ToSchedule';
import roomsId from './roomsId.json';
const weekdayoff = {
  sabádo: true,
  domingo: true,
};

export type shift = 'morning' | 'aftermoon' | 'night';

export default function MainPage() {
  const [activeAside, setActiveAside] = useState(false);
  const [shift, setShift] = useState<shift>('morning');
  const [date, setDate] = useState<{ day: Date; hour: string } | null>(null);
  const [room, setRoom] = useState<string>('Sala de Artes');
  const [schedule, setSchedule] = useState<IscheduleRoomData[] | null>(null);
  const [teacher, setTeacher] = useState<
    (ITeacherData & { Schedule: IscheduleRoomData }) | null
  >(null);
  const newDate = new Date().toLocaleDateString('pt-BR', {
    dateStyle: 'full',
  });

  const fetchSchedule = async () => {
    const currentSchedule = await getScheduleByRoom(
      roomsId[room as keyof typeof roomsId] || '',
    );
    console.log(currentSchedule);
    setSchedule(currentSchedule);
  };

  const fetchTeacher = async () => {
    const { accessToken, refreshToken, userId } = tokens;

    const currentTeacher = await getTeacher({
      userId,
      accessToken,
    });
    setTeacher(currentTeacher.data);
  };

  useEffect(() => {
    fetchTeacher();
    fetchSchedule();
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [room]);

  return (
    <RouterPrivate>
      <div className="mt-12">
        <h1 className="text-2xl font-semibold">
          Bem-vindo(a) de volta, {teacher?.name} 👋
        </h1>
        <h2 className="flex items-center gap-2">
          {weekdayoff[newDate.split(',')[0] as keyof typeof weekdayoff] ? (
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          ) : (
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          )}

          {newDate}
        </h2>
      </div>
      <Room room={room} setRoom={setRoom} />
      <Shifts setShift={setShift} shift={shift} />
      {schedule ? (
        <Dates
          setActiveAside={setActiveAside}
          setDate={setDate}
          shift={shift}
          schedule={schedule}
        />
      ) : null}
      {activeAside ? (
        <ToSchedule setActiveAside={setActiveAside} date={date} room={room} />
      ) : null}
    </RouterPrivate>
  );
}
