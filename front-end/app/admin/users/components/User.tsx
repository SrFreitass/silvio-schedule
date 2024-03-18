import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { deleteUser } from '@/http/delete.user';
import { patchUpdateRoleUser } from '@/http/patch.updateRoleUser';

interface UserProps {
  id: string;
  name: string;
  email: string;
  fetchUsers: () => void;
}

export function User({ id, name, email, fetchUsers }: UserProps) {
  const handleApproveUser = async (id: string) => {
    await patchUpdateRoleUser(id);
    toast({
      title: `Usuário ${name} aprovado!`,
      description: `Ele terá a permissão de Ler e Escrever na agenda`,
    });
    fetchUsers();
  };

  const handleDisapproveUser = async (id: string) => {
    await deleteUser(id);
    toast({
      title: `Usuário ${name} foi deletado!`,
      description: `Ele não foi autorizado a ter acesso a agenda Silvio`,
    });
    fetchUsers();
  };

  return (
    <div>
      <h3 className="font-medium">Nome: {name}</h3>
      <p className="text-zinc-600 dark:text-zinc-300">E-mail: {email}</p>
      <p className="text-zinc-600 dark:text-zinc-300">ID: {id}</p>

      <div className="flex gap-4">
        <Button className="min-w-24" onClick={() => handleApproveUser(id)}>
          Aprovar
        </Button>
        <Button className="min-w-24" onClick={() => handleDisapproveUser(id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
}
