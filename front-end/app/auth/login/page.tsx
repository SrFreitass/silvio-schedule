'use client';

import { postLogin } from '@/app/http/post.login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSolidError } from 'react-icons/bi';
import { FaCalendarCheck } from 'react-icons/fa';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const login: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const { data } = await postLogin({ email, password });
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      router.push('/app');
    } catch (error) {
      if (!(error instanceof AxiosError)) return;

      if (error.response?.data?.message === 'E-mail or password invalid') {
        setEmailOrPasswordError(true);
      }
    }
  };

  return (
    <main className="h-screen flex flex-col gap-8 items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <FaCalendarCheck size={28} />
        <h2 className="text-2xl text-center font-semibold">
          Agenda de salas silvio
        </h2>
      </div>
      <form
        className="flex flex-col justify-center gap-5 w-1/4 min-w-96 max-sm:min-w-full sm:px-4"
        onSubmit={handleSubmit(login)}
      >
        <div>
          <label>E-mail</label>
          <Input
            placeholder="example@gmail.com"
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              E-mail inválido
            </p>
          )}
          {emailOrPasswordError && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              E-mail ou senha incorreta!
            </p>
          )}
        </div>
        <div>
          <label>Senha</label>
          <Input
            placeholder="Sua senha"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              Senha inválida
            </p>
          )}
          {emailOrPasswordError && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              E-mail ou senha incorreta!
            </p>
          )}
        </div>
        <Button>Entrar</Button>
      </form>
    </main>
  );
}
