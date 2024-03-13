import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface ScheduleDate {
  status: 'reserved' | 'expired' | 'free';
  room: string;
  reservedProps?: {
    teacher: string;
    class: string;
    date: string;
    lessonNumber: number;
  };
}

export function ScheduleDate({ room, status, reservedProps }: ScheduleDate) {
  const date = reservedProps?.date
    ? dayjs(reservedProps.date)
        .add(3, 'hours')
        .locale('pt-br')
        .format('DD/MM/YYYY dddd, HH:mm')
    : null;

  const content = (
    <div className="min-w-[13rem] pl-4 gap-4 flex items-center cursor-pointer">
      {status === 'reserved' || status === 'expired' ? (
        <IoMdCloseCircle className="text-red-500" />
      ) : (
        <IoCheckmarkCircle className="text-green-500" />
      )}
      <div>
        <h2 className="text-xl font-semibold text-start">{room}</h2>
        <h2>
          {status === 'reserved' && 'Reservado'}
          {status === 'expired' && 'Data indisponível'}
          {status === 'free' && 'Livre'}
        </h2>
      </div>
    </div>
  );

  return (
    <Dialog>
      {status === 'reserved' ? (
        <DialogTrigger>{content}</DialogTrigger>
      ) : (
        content
      )}
      <DialogContent>
        <h2 className="font-semibold flex items-center gap-2">
          <FaRegCalendarCheck size={24} />
          Esta sala já foi reservada.
        </h2>
        <p className="font-medium">
          {date} - {reservedProps?.lessonNumber}° Aula
        </p>
        <p className="font-medium">Professor: {reservedProps?.teacher}</p>
        <p className="font-medium">Turma: {reservedProps?.class}</p>
      </DialogContent>
    </Dialog>
  );
}
