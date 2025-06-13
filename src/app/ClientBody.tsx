"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import FloatingButton from '@/components/FloatingButton';

interface ClientBodyProps {
  children: React.ReactNode;
}

export function ClientBody({ children }: ClientBodyProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/sbk-admin');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>
    {children}
    {!isAdmin && <FloatingButton />}
    </>;
}
