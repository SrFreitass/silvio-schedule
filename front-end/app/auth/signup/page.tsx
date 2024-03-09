'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';

import { MouseEvent, useRef } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

export default function SignUpPage() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  async function signUpNewUser(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const nameValue = nameRef.current?.value;
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    const res = await fetch('http://localhost:8081/api/v1/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    });

    const json = await res.json();

    console.log(json);

    localStorage.setItem('token', json?.data['access-token']);
    router.push('../app');
  }
  return (
    <main className="h-screen flex flex-col gap-8 items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <FaCalendarCheck size={28} />
        <h2 className="text-2xl text-center font-semibold">
          Agenda de salas silvio
        </h2>
      </div>
      <form className="flex flex-col justify-center gap-5 w-1/4 min-w-96 max-sm:min-w-full sm:px-4">
        <div>
          <label>Nome completo</label>
          <Input placeholder="Fulano de tal" ref={nameRef} />
        </div>
        <div>
          <label>E-mail</label>
          <Input placeholder="example@gmail.com" ref={emailRef} />
        </div>
        <div>
          <label>Senha</label>
          <Input placeholder="Sua senha" ref={passwordRef} type="password" />
        </div>
        <div>
          <label>Confirmar senha</label>
          <Input
            placeholder="Confirme a senha"
            ref={confirmPasswordRef}
            type="password"
          />
        </div>
        <Button onClick={signUpNewUser}>Registrar-se</Button>
      </form>
    </main>
  );
}
