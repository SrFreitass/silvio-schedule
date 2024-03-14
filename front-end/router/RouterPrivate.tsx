import { getVerifyAuth } from '@/app/http/get.verifyAuth';
import { tokens } from '@/providers/TokensSession';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';

export function RouterPrivate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const { accessToken, refreshToken, userId } = tokens;

        const auth = await getVerifyAuth(tokens.accessToken);
        if (auth.message === 'Authenticated') {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        if (!(error instanceof AxiosError)) return;

        const messageError = error.response?.data?.message;

        if (messageError === 'jwt expired') {
          await newTokensProvider();
          location.reload();
        }

        if (error.response?.data?.message === 'Unauthenticated') {
          setAuthenticated(false);
        }
      }
    };

    verify();
  }, []);

  if (!authenticated && authenticated != null) {
    router.push('/auth/login');
  }

  if (authenticated) {
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
      <p className="font-semibold">
        Connectando a sua conta na agenda Silvio...
      </p>
    </div>
  );
}
