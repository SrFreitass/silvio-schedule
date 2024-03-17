import { Dispatch } from 'react';
import { FiSun } from 'react-icons/fi';
import { IoIosMoon } from 'react-icons/io';
import { PiSunHorizon } from 'react-icons/pi';
import { shift } from '../page';

interface ShiftsProps {
  shift: shift;
  setShift: Dispatch<shift>;
}

export function Shifts({ setShift, shift }: ShiftsProps) {
  return (
    <div className="mt-8">
      <div className="flex gap-8 max-sm:justify-between max-[485px]:flex-col font-semibold">
        <span
          className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none 
          ${shift === 'morning' && 'bg-blue-100 dark:text-black'}
          `}
          onClick={() => setShift('morning')}
        >
          <FiSun />
          MATUTINO
        </span>

        <span
          className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none 
          ${shift === 'aftermoon' && 'bg-blue-100 dark:text-black'}
          `}
          onClick={() => setShift('aftermoon')}
        >
          <PiSunHorizon />
          VESPERTINO
        </span>

        <span
          className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none 
          ${shift === 'night' && 'bg-blue-100 dark:text-black'}
          `}
          onClick={() => setShift('night')}
        >
          <IoIosMoon />
          NOTURNO
        </span>
      </div>
    </div>
  );
}
