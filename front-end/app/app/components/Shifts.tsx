import { Dispatch } from 'react';
import { FiSun } from 'react-icons/fi';
import { IoIosMoon } from 'react-icons/io';
import { PiSunHorizon } from 'react-icons/pi';
import { shift } from '../page';

interface ShiftsProps {
  setShift: Dispatch<shift>;
}

export function Shifts({ setShift }: ShiftsProps) {
  return (
    <div className="border-b mt-8">
      <div className="flex gap-8 font-semibold">
        <span
          className="flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none"
          onClick={() => setShift('morning')}
        >
          <FiSun />
          MATUTINO
        </span>

        <span
          className="flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none"
          onClick={() => setShift('aftermoon')}
        >
          <PiSunHorizon />
          VESPERTINO
        </span>

        <span
          className="flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none"
          onClick={() => setShift('night')}
        >
          <IoIosMoon />
          NOTURNO
        </span>
      </div>
    </div>
  );
}
