interface HourProps {
  hour: string;
  indexHour: number;
}

export function Hour({ hour, indexHour }: HourProps) {
  return (
    <>
      {' '}
      <h2 className="min-w-[4.5rem] h-full text-lg font-semibold flex items-center">
        {hour} -{' '}
      </h2>
      <span className="min-w-8 font-semibold">{indexHour + 1}°</span>
      <span className="h-column border"></span>
    </>
  );
}
