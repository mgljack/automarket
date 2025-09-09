'use client';

import Link from 'next/link';
import CarCard from '@/app/components/CarCard';
import { Car } from '@/types/car';

type Size = 'base' | 'sm' | 'xs';
const sizeWrap: Record<Size, string> = {
  base: 'w-[260px]',  // Premium
  sm: 'w-[232px]',    // Plus
  xs: 'w-[204px]',    // General
};

export default function CarRow({
  title,
  href,
  cars,
  count,
  size = 'base',
  showBanner = false,
  onLikeToggle
}: {
  title: string;
  href: string;
  cars: Car[];
  count: number;
  size?: Size;
  showBanner?: boolean;
  onLikeToggle?: (carId: string, isLiked: boolean) => void;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between">
        <Link href={href} className="text-xl font-bold hover:underline">{title}</Link>
      </div>
      <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto snap-x pb-2">
        {cars.slice(0, count).map((car) => (
          <div key={car.id} className={`${sizeWrap[size]} shrink-0 snap-start`}>
            <CarCard car={car} onLikeToggle={onLikeToggle} />
          </div>
        ))}
        
        {/* 작은 배너 추가 (Plus와 General에만) */}
        {showBanner && (
          <div className={`${sizeWrap[size]} shrink-0 snap-start`}>
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 h-full flex flex-col justify-center items-center text-white text-center">
              <div className="mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm mb-1">광고</h3>
              <p className="text-xs opacity-90">더 많은 차량을</p>
              <p className="text-xs opacity-90">확인해보세요</p>
              <Link 
                href="/buy" 
                className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
              >
                보러가기
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
