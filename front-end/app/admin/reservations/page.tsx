'use client';

import { Header } from '@/app/components/Header';
import { Room } from '@/app/components/Room';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';
import { deleteScheduleDate } from '@/http/delete.scheduleDate';
import { getScheduleByRoom } from '@/http/get.scheduleByRoom';
import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { LuCalendarCheck2 } from 'react-icons/lu';
import roomsId from '../../roomsId.json';

export default function ReservartionsPage() {
  const [reservation, setReservation] = useState<IscheduleRoomData[]>();
  const [room, setRoom] = useState('Sala de Artes');

  const fetchReservations = async () => {
    const currentRoom = roomsId[room as keyof typeof roomsId];

    const data = await getScheduleByRoom(currentRoom);
    console.log(data);
    setReservation(data);
  };

  const dateLocaleBR = (date: string) =>
    dayjs(date).add(3, 'hours').toDate().toLocaleDateString('pt-BR', {
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleDeleteSchedule = async (id: string) => {
    await deleteScheduleDate(id);
    await fetchReservations();
  };

  useEffect(() => {
    fetchReservations();
  }, [room]);

  return (
    <>
      <Header userAdmin={true} />
      <main>
        <h2 className="text-2xl font-semibold mt-12">Reservas avulso</h2>
        <Room room={room} setRoom={setRoom} />
        <div className="flex flex-wrap gap-8 max-h-[60vh] overflow-auto mt-8">
          {reservation?.map(
            ({ class: classRoom, date, id, room_id, teacher, teacher_id }) => {
              return (
                <Dialog key={id}>
                  <div className="flex justify-between items-center border rounded-md p-3 min-w-52 h-44 max-w-52">
                    <div className="flex flex-col gap-2">
                      <LuCalendarCheck2 size={24} />
                      <time>{dateLocaleBR(date)}</time>
                      <p>{teacher.name}</p>
                      <p>Turma: {classRoom}</p>
                    </div>
                    <DialogTrigger className="self-start">
                      <Button className="bg-transparent hover:bg-transparent">
                        {' '}
                        <FaTrashAlt className="text-red-500" />
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent className="max-w-96">
                    <h2 className="font-semibold flex items-center gap-2">
                      Tem certeza de sua ação?
                    </h2>
                    <div className="flex justify-center gap-4 mt-2">
                      <Button
                        className="w-full"
                        onClick={() => handleDeleteSchedule(id)}
                      >
                        Sim
                      </Button>
                      <DialogClose className="w-full">
                        <Button className="w-full">Não</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            },
          )}
        </div>
      </main>
    </>
  );
}
