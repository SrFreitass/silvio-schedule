'use client';

import Link from 'next/link';
import { FaUserShield } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { Header } from '../components/Header';

export default function AdminPage() {
  const pages = [
    {
      title: 'Gerenciar usuários',
      description: 'Veja todos os usuários que fizeram cadastro.',
      key: 1 + Math.floor(Math.random() * 10),
      url: '/users',
      icon: <FaUserShield size={24} />,
    },
    {
      title: 'Todas as reservas avulso',
      description: 'Veja todas as reservas em avulso, fora do calendário.',
      key: 2 + Math.floor(Math.random() * 10),
      icon: <LuCalendarCheck2 size={24} />,
      url: '/reservations',
    },
  ];

  return (
    <>
      <Header userAdmin={true} />
      <main>
        <h2 className="text-2xl font-semibold mt-12">Hub - Administração</h2>
        <div className="flex flex-wrap items-center gap-8 mt-8">
          {pages.map(({ title, description, url, icon, key }) => {
            return (
              <Link href={`./admin/${url}`} key={key}>
                <div className="flex flex-col w-72 max-[350px]:w-full cursor-pointer">
                  {icon}
                  <h2 className="text-semibold text-lg">{title}</h2>
                  <p>{description}</p>
                  <FaArrowUpRightFromSquare className="self-end mt-2" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
