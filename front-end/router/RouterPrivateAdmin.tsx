import { getVerifyAuthAdmin } from '@/http/get.verifyAuthAdmin';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, useEffect, useState } from 'react';
import { LuCalendarCheck2 } from 'react-icons/lu';

export function RouterPrivateAdmin({
  children,
  setRenderized,
}: {
  children: React.ReactNode;
} & { setRenderized: Dispatch<boolean> }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const auth = await getVerifyAuthAdmin();
        if (auth.message === 'User is admin') {
          setIsAdmin(true);
          setRenderized(true);
        }
      } catch (error) {
        console.error(error);
        if (!(error instanceof AxiosError)) return;

        const messageError = error.response?.data?.message;

        if (messageError === 'jwt expired') {
          try {
            await newTokensProvider();
            location.reload();
          } catch (err) {
            router.push('/');
          }
        }

        if (error.response?.data?.message === "User not's admin") {
          setIsAdmin(false);
        }
      }
    };

    verify();
  }, []);

  if (!isAdmin && isAdmin != null) {
    router.push('/');
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <LuCalendarCheck2 size={48} className="animate-pulse" />
      <p className="font-semibold text-center">
        Connectando a sua conta na administração da agenda Silvio...
      </p>
    </div>
  );
}
