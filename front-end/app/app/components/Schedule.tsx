import { IscheduleRoomData } from '@/models/scheduleRoom.interface';
import dayjs from 'dayjs';
import { Dispatch } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import { shift } from '../page';
import { ScheduleDate } from './ScheduleDate';
import { convertHourStringToNumber } from './ToSchedule';

interface DatesProps {
  setActiveAside: Dispatch<boolean>;
  shift: shift;
  setDate: Dispatch<{ day: Date; hour: string } | null>;
  schedule: IscheduleRoomData[];
}

const weekdayoff = {
  sábado: true,
  domingo: true,
};

const shiftsHours = {
  morning: ['07h00', '08h40', '09h25', '10h40', '11h20', '12h00'],
  aftermoon: ['13h00', '14h40', '15h25', '16h40', '17h20', '18h00'],
  night: ['19h00', '20h50', '21h25', '22h00', '22h40', '23h00'],
};

const oneWeek = [1, 2, 3, 4, 5].map((day) => {
  return new Date(dayjs().day(day).hour(1).minute(0).toString());
});

const convertDayJS = ({ day, hour }: { day: Date; hour: string }) => {
  const { hour: hourConverted, minute } = convertHourStringToNumber(hour);
  return dayjs(day)
    .hour(hourConverted)
    .minute(minute)
    .second(0)
    .millisecond(0)
    .subtract(3, 'hours')
    .toISOString();
};

export function Dates({
  setActiveAside,
  setDate,
  shift,
  schedule,
}: DatesProps) {
  const handleSchedule = ({ day, hour }: { hour: string; day: Date }) => {
    setDate({
      day,
      hour,
    });
    setActiveAside(true);
  };

  // const mapped = oneWeek.map((weekday) => {
  //   if (weekday) {
  //     console.log(schedule);
  //     shiftsHours[shift]?.map((hour) => {
  //       schedule.map((item) =>
  //         console.log(item.date === convertDayJS({ day: weekday, hour })),
  //       );
  //     });
  //   }
  // });

  return (
    <ScrollContainer className="flex flex-col gap-12 min-h-[80vh] border-t overflow-scroll">
      <div className="flex justify-between gap-8">
        {oneWeek.map((day, index) => {
          return (
            <>
              {day && (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 border-l font-medium ${index === 4 && 'border-r'}`}
                >
                  <div className="border-b text-center w-row py-2">
                    <p>
                      {day.toLocaleDateString('pt-BR', {
                        weekday: 'short',
                      })}
                    </p>
                    <p className="text-2xl font-semibold"> {day.getDate()}</p>
                  </div>

                  <div className="mt-6 flex flex-row-reverse gap-8 ">
                    <div className="flex flex-col gap-4">
                      {shiftsHours[shift].map((hour, indexHour) => {
                        let expiredDate = false;
                        let reserved = false;
                        return (
                          <div
                            className="flex flex-col items-center gap-4 pr-4 pb-2"
                            key={index}
                          >
                            <div className="flex items-center text-nowrap">
                              {index > 0 ? null : (
                                <>
                                  <h2 className="min-w-[4.5rem] h-full text-lg font-semibold flex items-center">
                                    {hour} -{' '}
                                  </h2>
                                  <span className="min-w-8 font-semibold">
                                    {indexHour + 1}°
                                  </span>
                                  <span className="h-column border"></span>
                                </>
                              )}
                              {new Date(day) < new Date() &&
                                (expiredDate = true)}
                              {schedule.map((item, key) => {
                                const condition =
                                  item.date === convertDayJS({ day, hour });

                                if (condition) {
                                  reserved = !reserved;
                                  return (
                                    <ScheduleDate
                                      reservedProps={{
                                        date: item.date,
                                        class: '2-D',
                                        teacher: item.teacher.name,
                                        lessonNumber: indexHour + 1,
                                      }}
                                      status="reserved"
                                      room="STE3"
                                      key={key}
                                    />
                                  );
                                }
                              })}
                              {!reserved && expiredDate && (
                                <ScheduleDate status="expired" room="STE3" />
                              )}
                              {!reserved && !expiredDate && (
                                <div
                                  onClick={() => handleSchedule({ day, hour })}
                                >
                                  <ScheduleDate status="free" room="STE3" />
                                </div>
                              )}
                            </div>
                            <span className="w-row h-[0.5px] border"></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </ScrollContainer>
  );
}
