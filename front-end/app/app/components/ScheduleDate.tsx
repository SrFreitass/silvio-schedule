import { IoMdCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface ScheduleDate {
  reserved: boolean;
  room: string;
}

export function ScheduleDate({ room, reserved }: ScheduleDate) {
  return (
    <div className="min-w-[13rem] pl-4 gap-4 flex items-center cursor-pointer">
      {reserved ? (
        <IoMdCloseCircle className="text-red-500" />
      ) : (
        <IoCheckmarkCircle className="text-green-500" />
      )}
      <div>
        <h2 className="text-xl font-semibold">{room}</h2>
        <h2>{reserved ? 'Reservado' : 'Livre para reservas'}</h2>
      </div>
    </div>
  );
}
