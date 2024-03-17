'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { postLogin } from '@/http/post.login';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSolidError } from 'react-icons/bi';
import { FaCalendarCheck, FaCircleNotch } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const login: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      toast({
        action: <FaCircleNotch className="animate-pulse" />,
        title: 'Efetuando login!',
        description: 'Um instante.',
      });

      const { data } = await postLogin({ email, password });
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      toast({
        action: <IoCheckmarkCircle className="text-green-500" />,
        title: 'Login efetuado com sucesso!',
        description: 'Você será redirecionado a agenda em segundos...',
      });

      router.push('/');
      location.reload();
    } catch (error) {
      if (!(error instanceof AxiosError)) return;

      if (error.response?.data?.message === 'E-mail or password invalid') {
        setEmailOrPasswordError(true);
      }

      toast({
        action: <IoMdCloseCircle className="text-red-500" />,
        title: 'Houve algum problema...!',
        description: 'Um erro inesperado ocorreu.',
      });
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
          <div className="flex items-center justify-end">
            <Input
              className="pr-10"
              placeholder="Sua senha"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
            />
            {showPassword ? (
              <VscEye
                size={28}
                className="absolute mr-2"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <VscEyeClosed
                size={28}
                className="absolute mr-2"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
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
