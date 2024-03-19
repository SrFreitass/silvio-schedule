import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteScheduleDate } from '@/http/delete.scheduleDate';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface ScheduleDate {
  admin?: boolean;
  status: 'reserved' | 'expired' | 'free';
  room: string;
  reservedProps?: {
    id: string;
    teacher: string;
    class: string;
    date: string;
    lessonNumber: number;
  };
  fetchSchedule?: () => void;
}

export function ScheduleDate({
  room,
  status,
  reservedProps,
  admin,
  fetchSchedule,
}: ScheduleDate) {
  const [isDialogProps, setIsDialogProps] = useState(true);

  const date = reservedProps?.date
    ? dayjs(reservedProps.date)
        .add(3, 'hours')
        .locale('pt-br')
        .format('DD/MM/YYYY dddd, HH:mm')
    : null;

  const handleDeleteSchedule = async () => {
    if (!reservedProps?.id || !fetchSchedule) return;

    await deleteScheduleDate(reservedProps.id);
    fetchSchedule();
  };

  const content = (
    <div className="min-w-[13.5rem] pl-4 gap-4 flex items-center cursor-pointer">
      {status === 'reserved' || status === 'expired' ? (
        <IoMdCloseCircle className="text-red-500" />
      ) : (
        <IoCheckmarkCircle className="text-green-500" />
      )}
      <div onClick={() => setIsDialogProps(true)}>
        <h2 className="text-xl font-semibold text-start">{room}</h2>
        <h2 className="text-start">
          {status === 'reserved' && 'Reservado'}
          {status === 'expired' && 'Data indisponível'}
          {status === 'free' && 'Livre'}
        </h2>
      </div>
      {reservedProps?.date && admin && (
        <FaTrashAlt
          className="text-red-500 relative left-[30%]"
          onClick={() => setIsDialogProps(false)}
        />
      )}
    </div>
  );

  return (
    <Dialog>
      {status === 'reserved' ? (
        <DialogTrigger>{content}</DialogTrigger>
      ) : (
        content
      )}
      <DialogContent className={isDialogProps ? '' : 'w-96'}>
        {isDialogProps ? (
          <>
            <h2 className="font-semibold flex items-center gap-2">
              <FaRegCalendarCheck size={24} />
              Esta sala já foi reservada.
            </h2>
            <p className="font-medium">
              {date} - {reservedProps?.lessonNumber}° Aula
            </p>
            <p className="font-medium">Professor: {reservedProps?.teacher}</p>
            <p className="font-medium">Turma: {reservedProps?.class}</p>
          </>
        ) : (
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              Tem certeza de sua ação?
            </h2>
            <div className="flex justify-center gap-4 mt-8">
              <Button
                className="w-full max-w-40"
                onClick={handleDeleteSchedule}
              >
                Sim
              </Button>
              <DialogClose className="w-full">
                <Button className="w-full max-w-40">Não</Button>
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
