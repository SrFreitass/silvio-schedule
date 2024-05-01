import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { getScheduleByRoom } from '@/http/get.scheduleByRoom';
import { postSchedule } from '@/http/post.schedule';
import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import { tokens } from '@/providers/TokensSession';
import dayjs from 'dayjs';
import { Dispatch, MouseEvent, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';

interface ToScheduleProps {
  setActiveAside: Dispatch<boolean>;
  room: string;
  rooms: Record<string, string>;
  date: { day: Date; hour: string } | null;
  setSchedule: Dispatch<IscheduleRoomData[]>;
}

export const convertHourStringToNumber = (hour: string) => {
  const hourSplited = hour.split('h');
  return {
    hour: Number(hourSplited[0]),
    minute: Number(hourSplited[1]),
  };
};

export function ToSchedule({
  setActiveAside,
  setSchedule,
  date,
  room,
  rooms,
}: ToScheduleProps) {
  const classRef = useRef<HTMLInputElement | null>(null);
  const handleToSchedule = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const schoolClass = classRef.current?.value;

    if (!schoolClass) {
      toast({
        title: 'Turma inválida',
        description: 'Insira uma turma válida por exemplo: 1-A',
      });

      return;
    }

    const { hour, minute } = convertHourStringToNumber(date?.hour || '');
    const dateToSchedule = dayjs(date?.day)
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0)
      .subtract(3, 'hours')
      .toISOString();

    const roomId = rooms[room];

    if (!roomId) {
      toast({
        title: 'Houve algum erro.',
        description: 'Não se preocupe foi um erro interno.',
      });

      return;
    }

    console.log(tokens.userId);

    await postSchedule({
      date: dateToSchedule,
      roomId,
      schoolClass,
    });

    toast({
      title: `${room} reservado com sucesso!`,
      description: `Turma: ${schoolClass}`,
    });

    const currentSchedule = await getScheduleByRoom(roomId);

    if (!currentSchedule) return;

    setSchedule(currentSchedule);
  };

  return (
    <div className="fixed h-screen w-screen bg-back top-0 right-0 left-0">
      <div className="w-full h-full flex justify-end">
        <div
          className="w-full h-full max-sm:w-0 max-sm:h-0"
          onClick={() => setActiveAside(false)}
        ></div>
        <aside
          className={`
          min-w-[30rem] w-1/3 h-full max-sm:min-w-full p-10
          flex flex-col gap-4
          bg-white dark:bg-[#050f2e] shadow-md
          animate-aside
          `}
        >
          <IoClose
            size={24}
            className="self-end cursor-pointer"
            onClick={() => setActiveAside(false)}
          />
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <SiGoogleclassroom />
            Reservar uma sala
          </h2>
          <form className="flex flex-col gap-4">
            <p className="text-medium">Sala</p>
            <Input disabled placeholder={room || ''} />
            <p className="text-medium">Horário</p>
            <Input disabled placeholder={`Horário ${date?.hour}`} />
            <p className="text-medium">Qual a turma?</p>
            <Input ref={classRef} />
            <Button onClick={handleToSchedule}>Agendar</Button>
          </form>
        </aside>
      </div>
    </div>
  );
}
