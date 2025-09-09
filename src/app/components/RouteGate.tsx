'use client';

import { usePathname } from 'next/navigation';

export default function RouteGate({
  children,
  hideOn = ['/'],
}: { 
  children: React.ReactNode; 
  hideOn?: string[] 
}) {
  const pathname = usePathname() ?? '/';
  return hideOn.includes(pathname) ? null : <>{children}</>;
}
