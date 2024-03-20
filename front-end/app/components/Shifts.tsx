import { Dispatch } from 'react';
import { shift } from '../page';

interface ShiftsProps {
  shift: shift;
  setShift: Dispatch<shift>;
}

const shifts = {
  morning: 'MATUTINO',
  aftermoon: 'VESPERTINO',
  night: 'NOTURNO',
};
export function Shifts({ setShift, shift: currentShift }: ShiftsProps) {
  return (
    <div className="mt-8">
      <div className="flex gap-8 max-sm:justify-between max-[485px]:flex-col font-semibold">
        {['morning', 'aftermoon', 'night'].map((shift, index) => {
          return (
            <span
              key={index}
              className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md rounded-b-none 
          ${currentShift === shift && 'bg-blue-100 dark:text-black'}
          `}
              onClick={() => setShift(shift as shift)}
            >
              {shifts[shift as shift]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
