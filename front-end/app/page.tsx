'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import {
  MdNavigateBefore,
  MdNavigateNext
} from 'react-icons/md';

const weekdays = {
  'segunda-feira': 0,
  'terça-feira': 1,
  'quarta-feira': 2,
  'quinta-feira': 3,
  'sexta-feira': 4,
  sabádo: 5,
  domingo: 6,
};

const dayMiliseconds = 86400000;

const convertDate = (date: Date) =>
  date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    weekday: 'long',
  });

export default function Home() {
  const [week, setWeek] = useState<Date[] | null>(null);

  const handleWeek = (option: 'before' | 'next') => {
    if (!week) return;

    if (option === 'before') {
      const beforeWeek = getCurrentWeek(
        new Date(week[0].getTime() - dayMiliseconds * 7),
      );
      setWeek(beforeWeek);
      return;
    }
    const nextWeek = getCurrentWeek(
      new Date(week[week?.length - 1].getTime() + dayMiliseconds * 8),
    );
    setWeek(nextWeek);
  };

  const getMoonday = () => {
    const day = convertDate(new Date());
    const weekday = day.split(',')[0] as keyof typeof weekdays;
    return new Date(new Date().getTime() - weekdays[weekday] * dayMiliseconds);
  };

  const getCurrentWeek = (moonday: Date) => {
    const currentWeek = [0, 1, 2, 3, 4, 5, 6].map((day) => {
      const currentDay = moonday.getTime() + dayMiliseconds * day;
      const weekday = convertDate(new Date(currentDay));
      // const weekday = convertDate(new Date(currentDay)).split(',')[0];

      return new Date(currentDay);
    });

    return currentWeek;
  };

  useEffect(() => {
    const currentWeek = getCurrentWeek(getMoonday());
    setWeek(currentWeek);
  }, []);
  console.log(week);

  return (
    <main className="min-w-full mt-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">
          Agenda da semana - STE 3
        </h1>
        <div className="flex items-center">
          {week ? (
            <>
              <MdNavigateBefore
                size={28}
                onClick={() => handleWeek('before')}
              />
              <p>{convertDate(week[0])}</p>
              {' - '}
              <p>{convertDate(week[week.length - 3])}</p>
              <MdNavigateNext size={28} onClick={() => handleWeek('next')} />
            </>
          ) : null}
        </div>
      </div>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o turno" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Turnos">Todos turnos</SelectItem>
          <SelectItem value="Matutino">Matutino</SelectItem>
          <SelectItem value="Vespertino">Vespertino</SelectItem>
          <SelectItem value="Noturno">Noturno</SelectItem>
        </SelectContent>
      </Select>
      <section className="flex flex-col gap-12 overflow-x-scroll py-4">
        <h2 className="text-xl font-semibold">Horarários da semana</h2>
        <div className="flex items-center  gap-6">
          <h2 className="font-semibold">11/03/24</h2>
          {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23].map(
            (hour, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex flex-col justify-center gap-2 px-4 border-x"
                  >
                    <div>
                      <div className="relative bottom-5 font-medium">
                        <p>{hour > 18 && 'Noturno'}</p>
                        <p>{hour > 12 && hour <= 18 && 'Vespertino'}</p>
                        <p>{hour > 6 && hour <= 12 && 'Matutino'}</p>
                      </div>
                      <p className="text-xl font-medium text-center">
                        {hour}:00
                      </p>
                    </div>
                    <div
                      className="p-4 py-2 bg-green-200 rounded-md"
                      title="Reservado"
                    >
                      Reser.
                    </div>
                  </div>
                </>
              );
            },
          )}
        </div>
      </section>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservado</DialogTitle>
            <DialogDescription>Segunda, 04/03/2023</DialogDescription>
            <p>Turma: 2-D</p>
            <p>Laborátorio: STE 3</p>
            <p>Professor: Jefferson</p>
            <p>Período: 10:30 até às 12:00 (2 Aulas)</p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservar</DialogTitle>
            <DialogDescription>Segunda, 04/03/2023</DialogDescription>
            <Input placeholder="Qual sua turma? Exemplo (2-A)" />
            <p>Laborátorio: STE 3</p>
            <p>Professor: Bacaninha</p>
            <div className="flex gap-4">
              <Button>Reservar</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <aside className="flex flex-col w-screen h-screen fixed top-[0%] bottom-[0%] right-[0%] bg-back">
        <div className="bg-white h-full w-1/3 self-end p-8 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold">Reservado</h2>
            <p className="text-slate-600">Segunda, 04/03/2023</p>
          </div>
          <div>
            <h2>Valdemir Cabeção - Matemática</h2>
            <p>Turma: 2-D</p>
            <p className="text-blue-400 font-medium">
              Laborátorio de Matemática
            </p>
          </div>
        </div>
      </aside> */}
    </main>
  );
}
