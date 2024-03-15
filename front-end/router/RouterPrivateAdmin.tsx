import { getVerifyAuthAdmin } from '@/app/http/get.verifyAuthAdmin';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';

export function RouterPrivateAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const auth = await getVerifyAuthAdmin();
        if (auth.message === 'User is admin') {
          setIsAdmin(true);
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
            router.push('/app');
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
    router.push('/app');
  }

  if (isAdmin) {
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
        Connectando a sua conta na administração da agenda Silvio...
      </p>
    </div>
  );
}
