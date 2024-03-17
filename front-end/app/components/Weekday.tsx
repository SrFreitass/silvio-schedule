export function Weekday({ day }: { day: Date }) {
  return (
    <div className="border-b text-center w-row py-2">
      <p>
        {day.toLocaleDateString('pt-BR', {
          weekday: 'short',
        })}
      </p>
      <p className="text-2xl font-semibold"> {day.getDate()}</p>
    </div>
  );
}
