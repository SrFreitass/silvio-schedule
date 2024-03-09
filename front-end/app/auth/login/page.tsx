'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { MouseEvent, useRef } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function login(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    const res = await fetch('http://localhost:8081/api/v1/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
          <label>E-mail</label>
          <Input placeholder="example@gmail.com" ref={emailRef} />
        </div>
        <div>
          <label>Senha</label>
          <Input placeholder="Sua senha" ref={passwordRef} type="password" />
        </div>
        <Button onClick={login}>Entrar</Button>
      </form>
    </main>
  );
}
