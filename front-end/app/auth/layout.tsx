'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { getVerifyAuth } from '../../http/get.verifyAuth';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLoginUser = async () => {
      try {
        await getVerifyAuth();
        setLoggedIn(true);
      } catch (error) {
        console.error(error);
        setLoggedIn(false);
      }
    };

    fetchLoginUser();
  }, []);

  const Navigate = ({ pathName }: { pathName: string }) => {
    router.push(pathName);
    return <></>;
  };

  return (
    <div className="max-w-[1600px] p-4 m-auto">
      {loggedIn && <Navigate pathName="/" />}
      {!loggedIn && loggedIn != null ? (
        children
      ) : (
        <div className="h-screen flex items-center justify-center">
          <LuCalendarCheck2 size={48} className="animate-pulse" />
        </div>
      )}
    </div>
  );
}
