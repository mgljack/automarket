'use client';

import { usePathname } from 'next/navigation';

export default function AdBottomGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // /cars/[id] 경로에서만 하단 광고 숨김
  const hide = /^\/cars\/[^/]+$/.test(pathname ?? '');
  if (hide) return null;
  return <>{children}</>;
}
