import { Button } from '@/components/ui/button';

interface UserProps {
  name: string;
  email: string;
}

export function User({ name, email }: UserProps) {
  return (
    <div>
      <h3 className="font-medium">{name}</h3>
      <p className="text-zinc-600 dark:text-zinc-300">{email}</p>

      <div className="flex gap-4">
        <Button className="min-w-24">Aprovar</Button>
        <Button className="min-w-24">Excluir</Button>
      </div>
    </div>
  );
}
