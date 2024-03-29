'use client';

import { Header } from '@/app/components/Header';
import { getUsersStrangers } from '@/http/get.usersStrangers';
import { ITeacherData } from '@/models/teacher.interface';
import { useEffect, useState } from 'react';
import { FaUserShield } from 'react-icons/fa6';
import { User } from './components/User';

export default function UsersPage() {
  const [renderized, setRenderized] = useState<boolean>(false);
  const [usersStrangers, setUsersStrangers] = useState<ITeacherData[]>(
    [] as ITeacherData[],
  );

  const fetchUsersStrangers = async () => {
    const users = await getUsersStrangers();
    setUsersStrangers(users);
  };

  useEffect(() => {
    if (!renderized) return;
    fetchUsersStrangers();
  }, [renderized]);

  return (
    <>
      <Header userAdmin={true} />
      <div className="mt-12">
        <h2 className="text-2xl max-sm:text-xl font-semibold flex max-sm:flex-col max-sm:items-start items-center gap-2">
          <FaUserShield size={32} />
          Usuários que fizeram cadastro recentemente
        </h2>
        <div className="mt-8 flex flex-col gap-8">
          {usersStrangers?.map((user, index) => {
            return (
              <User {...user} key={index} fetchUsers={fetchUsersStrangers} />
            );
          })}
        </div>
      </div>
    </>
  );
}
