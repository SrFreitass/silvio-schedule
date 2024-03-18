interface HourProps {
  hour: string;
  indexHour: number;
}

export function Hour({ hour, indexHour }: HourProps) {
  return (
    <>
      {' '}
      <h2 className="min-w-[4.5rem] max-[5rem] h-full text-lg font-semibold flex items-center justify-center">
        {indexHour + 1}°
      </h2>
      <span className="h-column border-l"></span>
    </>
  );
}
