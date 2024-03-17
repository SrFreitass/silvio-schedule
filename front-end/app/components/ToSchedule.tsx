import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postSchedule } from '@/http/post.schedule';
import dayjs from 'dayjs';
import { Dispatch, MouseEvent } from 'react';
import { IoClose } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';
import roomsId from '../roomsId.json';

interface ToScheduleProps {
  setActiveAside: Dispatch<boolean>;
  room: string;
  date: { day: Date; hour: string } | null;
}

export const convertHourStringToNumber = (hour: string) => {
  const hourSplited = hour.split('h');
  return {
    hour: Number(hourSplited[0]),
    minute: Number(hourSplited[1]),
  };
};

export function ToSchedule({ setActiveAside, date, room }: ToScheduleProps) {
  const handleToSchedule = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { hour, minute } = convertHourStringToNumber(date?.hour || '');
    const dateToSchedule = dayjs(date?.day)
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0)
      .subtract(3, 'hours')
      .toISOString();

    const roomId = roomsId[room as keyof typeof roomsId] || '';

    const item = await postSchedule({
      date: dateToSchedule,
      roomId,
    });

    console.log(item);
  };

  return (
    <div className="fixed h-screen w-screen bg-back top-0 right-0 left-0">
      <div className="w-full h-full flex justify-end">
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
            <Input />
            <Button onClick={handleToSchedule}>Agendar</Button>
          </form>
        </aside>
      </div>
    </div>
  );
}
