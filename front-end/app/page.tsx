'use client';

import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import { ITeacherData } from '@/models/teacher.interface';
import { RouterPrivate } from '@/router/RouterPrivate';

import { getRooms } from '@/http/get.rooms';
import { tokens } from '@/providers/TokensSession';
import { useEffect, useState } from 'react';
import { getScheduleByRoom } from '../http/get.scheduleByRoom';
import { getTeacher } from '../http/get.teacher';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Room } from './components/Room';
import { ScheduleDates } from './components/ScheduleDates';
import { Shifts } from './components/Shifts';
import { ToSchedule } from './components/ToSchedule';
const weekdayoff = {
  sabádo: true,
  domingo: true,
};

export type shift = 'Matutino' | 'Vespertino' | 'Noturno';

export default function MainPage() {
  const [renderized, setRenderized] = useState<boolean>(false);
  const [activeAside, setActiveAside] = useState(false);
  const [shift, setShift] = useState<shift>('Matutino');
  const [date, setDate] = useState<{ day: Date; hour: string } | null>(null);
  const [room, setRoom] = useState<string>('Sala de Artes');
  const [schedule, setSchedule] = useState<IscheduleRoomData[] | null>(null);
  const [teacher, setTeacher] = useState<
    (ITeacherData & { Schedule: IscheduleRoomData }) | null
  >(null);
  let [rooms, setRooms] = useState<Record<string, string>>();

  const newDate = new Date().toLocaleDateString('pt-BR', {
    dateStyle: 'full',
  });
  const userRole = teacher?.role;

  const fetchRooms = async () => {
    const rooms = await getRooms();
    const roomsObject: Record<string, string> = {};

    rooms.forEach((room: { name: string; id: string }) => {
      roomsObject[room.name as string] = room.id;
    });

    return roomsObject;
  };

  const fetchSchedule = async () => {
    if (!rooms) {
      rooms = await fetchRooms();
      setRooms(rooms);
    }

    const currentRoom = rooms[room];

    if (!currentRoom) return;

    const currentSchedule = await getScheduleByRoom(currentRoom);

    if (!currentSchedule) return;

    setSchedule(currentSchedule);
  };

  const fetchTeacher = async () => {
    const { userId } = tokens;

    const currentTeacher = await getTeacher(userId);
    setTeacher(currentTeacher.data);
  };

  useEffect(() => {
    if (!renderized) return;

    fetchTeacher();
    fetchSchedule();
  }, [renderized]);

  useEffect(() => {
    fetchSchedule();
  }, [room]);

  return (
    <RouterPrivate setRenderized={setRenderized}>
      <Header userAdmin={userRole === 'admin'} />
      <div className="mt-12">
        <h1 className="text-2xl font-semibold">
          Bem-vindo(a) de volta, {teacher?.name} 👋{' '}
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
        <ScheduleDates
          setActiveAside={setActiveAside}
          setDate={setDate}
          shift={shift}
          schedule={schedule}
          admin={teacher?.role === 'admin'}
          room={room}
          fetchSchedule={fetchSchedule}
        />
      ) : null}
      {activeAside && rooms ? (
        <ToSchedule
          setActiveAside={setActiveAside}
          date={date}
          room={room}
          rooms={rooms}
          setSchedule={setSchedule}
        />
      ) : null}
      <Footer />
    </RouterPrivate>
  );
}
