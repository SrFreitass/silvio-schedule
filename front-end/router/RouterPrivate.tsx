import { getVerifyAuth } from '@/app/http/get.verifyAuth';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';

export function RouterPrivate({ children }: { children: React.ReactNode }) {
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

        if (error.response?.data?.message === 'Unauthorized') {
          setAuthenticated('APPROVAL_REQUEST');
        }

        if (error.response?.data?.message === 'Unauthenticated') {
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
    <p>Aguarde um momento, estamos validando sua conta</p>;
  }

  if (authenticated === 'AUTHENTICATED') {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#19BAFF"
        secondaryColor="#19BAFF"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="font-semibold text-center">
        Connectando a sua conta na agenda Silvio...
      </p>
    </div>
  );
}
