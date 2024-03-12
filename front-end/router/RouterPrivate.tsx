import { getVerifyAuth } from '@/app/http/get.verifyAuth';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RouterPrivate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const tokens = JSON.parse(localStorage.getItem('tokens') || '{}') as {
          accessToken: string;
          refreshToken: string;
        };

        const auth = await getVerifyAuth(tokens.accessToken);
        if (auth.message === 'Authenticated') {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        if (!(error instanceof AxiosError)) return;

        if (error.response?.data?.message === 'jwt expired') {
          await newTokensProvider();
          verify();
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

  return <p>Carregando...</p>;
}
