'use client';

import { Toaster } from '@/components/ui/toaster';
import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import './globals.css';

export const poppins = Poppins({
  subsets: ['devanagari'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.body.classList.add(
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
    );
  }, []);

  return (
    <html lang="en">
      <body className={`${poppins.className} dark:bg-zinc-900`}>
        <div className="max-w-[1600px] p-4 m-auto">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
