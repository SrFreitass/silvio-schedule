'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { postRegister } from '@/http/post.register';
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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailAlready, setEmailAlready] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const signUpNewUser: SubmitHandler<Inputs> = async ({
    email,
    name,
    password,
    confirmPassword,
  }) => {
    try {
      setEmailAlready(false);

      if (confirmPassword !== password) return setConfirmPasswordError(true);
      const { data } = await postRegister({ email, name, password });
      toast({
        action: <FaCircleNotch className="animate-pulse" />,
        title: 'Registrando sua conta!',
        description: 'Um instante.',
      });

      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      toast({
        action: <IoCheckmarkCircle className="text-green-500" />,
        title: 'Conta registrada com sucesso!',
        description: 'Você será redirecionado a agenda em segundos...',
      });

      router.push('/');
    } catch (error) {
      if (!(error instanceof AxiosError)) return;

      if (error.response?.data?.message === 'E-mail already exists') {
        setEmailAlready(true);
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
        onSubmit={handleSubmit(signUpNewUser)}
      >
        <div>
          <label>Nome completo</label>
          <Input
            placeholder="Fulano de tal"
            {...register('name', { required: true, minLength: 8 })}
          />
          {errors.name?.type === 'required' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              Nome inválido
            </p>
          )}
          {errors.name?.type === 'minLength' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              Minímo 8 caracters.
            </p>
          )}
        </div>
        <div>
          <label>E-mail</label>
          <Input
            placeholder="example@gmail.com"
            {...register('email', {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              E-mail inválido
            </p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              E-mail inválido
            </p>
          )}
          {emailAlready && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              E-mail já está cadastrado.
            </p>
          )}
        </div>
        <div>
          <label>Senha</label>
          <div className="flex items-center justify-end">
            <Input
              placeholder="Sua senha"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
              })}
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
          {errors.password?.type === 'required' && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              Senha inválida
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <div className="text-red-500 font-medium flex flex-col items-start gap-2 mt-2">
              <span className="flex items-center gap-2">
                <BiSolidError size={24} />
                Senha inválida.
              </span>
              <span className="flex items-center gap-2">
                <BiSolidError size={36} /> É preciso de 8 caracteres, 1
                caractere especial e 1 número
              </span>
            </div>
          )}
        </div>
        <div>
          <label>Confirmar senha</label>
          <Input
            placeholder="Confirme a senha"
            type="password"
            {...register('confirmPassword', { required: true })}
          />
          {confirmPasswordError && (
            <p className="text-red-500 font-medium flex items-center gap-2 mt-2">
              <BiSolidError />
              As Senha não se correspondem
            </p>
          )}
        </div>
        <Button>Registrar-se</Button>
      </form>
    </main>
  );
}
