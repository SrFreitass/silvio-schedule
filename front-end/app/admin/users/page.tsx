'use client';

import { Header } from '@/app/components/Header';
import { getUsersStrangers } from '@/app/http/get.usersStrangers';
import { ITeacherData } from '@/models/teacher.interface';
import { RouterPrivateAdmin } from '@/router/RouterPrivateAdmin';
import { useEffect, useState } from 'react';
import { FaUserShield } from 'react-icons/fa6';
import { User } from './components/User';

export default function UsersPage() {
  const [usersStrangers, setUsersStrangers] = useState<ITeacherData[]>(
    [] as ITeacherData[],
  );

  useEffect(() => {
    const fetchUsersStrangers = async () => {
      const users = await getUsersStrangers();

      setUsersStrangers(users);
    };

    fetchUsersStrangers();
  }, []);

  return (
    <RouterPrivateAdmin>
      <Header userAdmin={true} />
      <div className="mt-12">
        <h2 className="text-2xl max-sm:text-xl font-semibold flex max-sm:flex-col max-sm:items-start items-center gap-2">
          <FaUserShield size={32} />
          Usuários que fizeram cadastro recentemente
        </h2>
        <div className="mt-8 flex flex-col gap-8">
          {usersStrangers?.map((user, index) => {
            return <User {...user} key={index} />;
          })}
        </div>
      </div>
    </RouterPrivateAdmin>
  );
}
