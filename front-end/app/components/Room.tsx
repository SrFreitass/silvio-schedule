import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dispatch, FocusEvent } from 'react';
import { SiGoogleclassroom } from 'react-icons/si';

interface RoomProps {
  room: string;
  setRoom: Dispatch<string>;
}

export function Room({ setRoom, room }: RoomProps) {
  const handleRoom = (e: FocusEvent<HTMLButtonElement>) => {
    const selectRoom = e?.target?.querySelector('span');
    if (selectRoom) {
      setRoom(selectRoom.innerText);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 mt-4">
      <h2 className="text-lg font-semibold mb-1">Sala</h2>
      <Select>
        <SelectTrigger onFocus={handleRoom}>
          <SelectValue placeholder="Sala de Artes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Sala de Artes</SelectItem>
          <SelectItem value="2">Lab. Biologia</SelectItem>
          <SelectItem value="3">Sala de vídeo</SelectItem>
          <SelectItem value="4">Lab. Matemática</SelectItem>
          <SelectItem value="5">Lab. Química</SelectItem>
          <SelectItem value="6">STE 2</SelectItem>
          <SelectItem value="7">STE 3</SelectItem>
        </SelectContent>
      </Select>
      <h3 className="text-lg font-semibold flex items-center gap-2 mt-4">
        <SiGoogleclassroom size={24} /> {room || ''} - Semana
      </h3>
    </div>
  );
}
