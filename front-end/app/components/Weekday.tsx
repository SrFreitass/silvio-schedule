export function Weekday({ day, index }: { day: Date; index: number }) {
  return (
    <div
      className={`border-b text-center ${index < 4 ? 'w-row' : 'w-row-last-weekday'} py-2`}
    >
      <p>
        {day.toLocaleDateString('pt-BR', {
          weekday: 'short',
        })}
      </p>
      <p className="text-2xl font-semibold"> {day.getDate()}</p>
    </div>
  );
}
