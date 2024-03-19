import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import { week } from '@/providers/getWeek';
import dayjs from 'dayjs';
import { Dispatch } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import { shift } from '../page';
import shiftHours from '../shiftHours.json';
import { Hour } from './Hour';
import { ScheduleDate } from './ScheduleDate';
import { convertHourStringToNumber } from './ToSchedule';
import { Weekday } from './Weekday';

interface DatesProps {
  admin?: boolean;
  setActiveAside: Dispatch<boolean>;
  shift: shift;
  setDate: Dispatch<{ day: Date; hour: string } | null>;
  schedule: IscheduleRoomData[];
  room: string;
  fetchSchedule: () => void;
}

const convertDayISO = ({ day, hour }: { day: Date; hour: string }) => {
  const { hour: hourConverted, minute } = convertHourStringToNumber(hour);
  return dayjs(day)
    .hour(hourConverted)
    .minute(minute)
    .second(0)
    .millisecond(0)
    .subtract(3, 'hours')
    .toISOString();
};

const dateExpired = ({ day, hour }: { day: Date; hour: string }) => {
  return (
    new Date(dayjs(convertDayISO({ day, hour })).add(3, 'hours').toDate()) <
    new Date()
  );
};

export function ScheduleDates({
  admin,
  setActiveAside,
  setDate,
  shift,
  schedule,
  room,
  fetchSchedule,
}: DatesProps) {
  const handleSchedule = ({ day, hour }: { hour: string; day: Date }) => {
    setDate({
      day,
      hour,
    });
    setActiveAside(true);
  };

  const isReserverd = ({
    day,
    hour,
    indexHour,
    reserved,
  }: {
    day: Date;
    hour: string;
    indexHour: number;
    reserved: {
      condition: boolean;
    };
  }) => {
    return schedule.map((item, key) => {
      if (item.date === convertDayISO({ day, hour })) {
        reserved.condition = true;
        return (
          <ScheduleDate
            reservedProps={{
              date: item.date,
              class: item.class,
              teacher: item.teacher.name,
              lessonNumber: indexHour + 1,
              id: item.id,
            }}
            fetchSchedule={fetchSchedule}
            status="reserved"
            room={room}
            key={key}
            admin={admin}
          />
        );
      }

      return <></>;
    });
  };

  return (
    <ScrollContainer className="flex gap-[2.6rem] max-h-[41rem] border-t overflow-scroll">
      {week.map((day, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col items-center p-4 border-l font-medium ${index === 4 && 'border-r'}`}
          >
            <Weekday day={day} index={index} />
            <div className="mt-6 flex flex-row-reverse gap-8 ">
              <div className="flex flex-col gap-4">
                {shiftHours[shift].map((hour, indexHour) => {
                  let expiredDate = false;
                  const reserved = {
                    condition: false,
                  };
                  return (
                    <div
                      className="flex flex-col items-center gap-4 pr-4 pb-2"
                      key={index}
                    >
                      <div className="flex items-center text-nowrap">
                        {index > 0 ? null : (
                          <Hour hour={hour} indexHour={indexHour} />
                        )}
                        {dateExpired({ day, hour }) && (expiredDate = true)}
                        {isReserverd({ day, hour, indexHour, reserved })}
                        {!reserved.condition && expiredDate && (
                          <ScheduleDate
                            status="expired"
                            room={room}
                            admin={admin}
                          />
                        )}
                        {!reserved.condition && !expiredDate && (
                          <div onClick={() => handleSchedule({ day, hour })}>
                            <ScheduleDate
                              status="free"
                              room={room}
                              admin={admin}
                            />
                          </div>
                        )}
                      </div>
                      <span
                        className={`${index < 4 ? 'w-row' : 'w-row-last'} h-[0.5px] border`}
                      ></span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </ScrollContainer>
  );
}
