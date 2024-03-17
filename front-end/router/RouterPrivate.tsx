import { getVerifyAuth } from '@/http/get.verifyAuth';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, useEffect, useState } from 'react';
import { LuCalendarCheck2 } from 'react-icons/lu';

export function RouterPrivate({
  children,
  setRenderized,
}: {
  children: React.ReactNode;
} & { setRenderized: Dispatch<boolean> }) {
  const [authenticated, setAuthenticated] = useState<
    'UNAUTHENTICATED' | 'AUTHENTICATED' | 'APPROVAL_REQUEST' | 'LOADING'
  >('LOADING');
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const auth = await getVerifyAuth();
        if (auth.message === 'Authenticated') {
          setAuthenticated('AUTHENTICATED');
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
            setAuthenticated('UNAUTHENTICATED');
          }
        }

        if (messageError === 'Unauthorized') {
          setAuthenticated('APPROVAL_REQUEST');
        }

        if (messageError === 'Unauthenticated') {
          setAuthenticated('UNAUTHENTICATED');
        }
      }
    };

    verify();
  }, []);

  if (authenticated === 'UNAUTHENTICATED') {
    router.push('/auth/login');
  }

  if (authenticated === 'APPROVAL_REQUEST') {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <LuCalendarCheck2 size={48} className="animate-pulse" />
        <p className="text-lg font-semibold text-center">
          Aguarde um momento, estamos validando sua conta! Isso pode demorar.
        </p>
      </div>
    );
  }

  if (authenticated === 'AUTHENTICATED') {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <LuCalendarCheck2 size={48} className="animate-pulse" />
      <p className="font-semibold text-center">
        Conectando a sua conta na agenda Silvio...
      </p>
    </div>
  );
}
