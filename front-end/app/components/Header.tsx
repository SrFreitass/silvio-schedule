import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { useState } from 'react';
import { LuCalendarCheck2 } from 'react-icons/lu';

interface HeaderProps {
  userAdmin: boolean;
}

export function Header({ userAdmin }: HeaderProps) {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  const handleTheme = () => {
    const body = document.body;
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
      return;
    }

    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setTheme('dark');
  };

  return (
    <header className="py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold flex items-center gap-2 max-sm:text-lg">
        <LuCalendarCheck2 size={24} />
        <Link href={'/'}>Agenda Silvio</Link>
      </h2>
      <nav>
        <ul className="flex gap-4 max-[560px]:invisible">
          <li className="hover:text-zinc-500 font-medium">
            <Link href={'/admin/users'}>{userAdmin && 'Administração'}</Link>
          </li>
          <li>
            <Switch
              id="airplane-mode"
              onClick={handleTheme}
              checked={theme === 'dark'}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
