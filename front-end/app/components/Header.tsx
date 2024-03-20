import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { useState } from 'react';
import { LiaUserShieldSolid } from 'react-icons/lia';
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
        <Link href={'/'} className="flex gap-2">
          <LuCalendarCheck2 size={24} />
          <span className="none">Agenda Silvio</span>
        </Link>
      </h2>
      <nav>
        <ul className="flex gap-4 items-center">
          <li className="hover:text-zinc-500 font-medium">
            <Link href={'/admin/users'} className="flex items-center">
              {userAdmin && (
                <>
                  <LiaUserShieldSolid
                    className="max-[550px]:visible invisible"
                    size={24}
                  />
                  <span className="none">Administração</span>
                </>
              )}
            </Link>
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
