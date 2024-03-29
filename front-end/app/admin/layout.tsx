'use client';

import { RouterPrivateAdmin } from '@/router/RouterPrivateAdmin';
import { ReactNode } from 'react';

export default function adminLayout({ children }: { children: ReactNode }) {
  return <RouterPrivateAdmin>{children}</RouterPrivateAdmin>;
}
