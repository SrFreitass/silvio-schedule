import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dispatch, FocusEvent } from 'react';
import { shift } from '../page';

interface ShiftsProps {
  shift: shift;
  setShift: Dispatch<shift>;
}

export function Shifts({ setShift, shift: currentShift }: ShiftsProps) {
  const handleShift = (e: FocusEvent<HTMLButtonElement>) => {
    const selectShift = e?.target?.querySelector('span');
    if (selectShift) {
      setShift(selectShift.innerText as shift);
    }
  };

  return (
    <div className="mb-8 mt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold mb-1">Turno</h2>
        <Select>
          <SelectTrigger onFocus={handleShift}>
            <SelectValue placeholder="Matutino" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Matutino</SelectItem>
            <SelectItem value="2">Vespertino</SelectItem>
            <SelectItem value="3">Noturno</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
