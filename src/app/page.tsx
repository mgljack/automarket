'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import CarCard from '@/app/components/CarCard';
import CarRow from '@/app/components/CarRow';
import { NEWS } from '@/lib/data';
import { NewsItem } from '@/lib/types';
import { Car } from '@/types/car';
import { normalize } from '@/lib/normalize';
import { resolveTier } from '@/lib/tier';
import { likesMock } from '@/lib/likes-mock';

const TopAdHeroModern = dynamic(() => import('./components/TopAdHeroModern'), { ssr: false });
const HomeSearchHero = dynamic(() => import('./components/HomeSearchHero'), { ssr: false });
const WeeklyDeals = dynamic(() => import('./components/WeeklyDeals'), { ssr: false });

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // seed.json에서 차량 데이터 fetch
    fetch('/seed.json')
      .then(res => res.json())
      .then(data => {
        const normalizedCars = data.cars.map(normalize);
        setCars(normalizedCars);
      })
      .catch(err => console.error('Failed to fetch cars:', err));

    // 뉴스 데이터
    setNews(NEWS);
  }, []);

  // 좋아요 토글 핸들러
  const handleLikeToggle = (carId: string, isLiked: boolean) => {
    if (isLiked) {
      likesMock.addLike(carId);
    } else {
      likesMock.removeLike(carId);
    }
    
    // 상태 업데이트 (선택사항 - 실시간 반영을 위해)
    setCars(prev => 
      prev.map(car => 
        car.id.toString() === carId ? { ...car, isLiked } : car
      )
    );
  };


  return (
    <div className="min-h-screen">

      {/* Modern Top Ad Banner */}
      <TopAdHeroModern
        title="프리미엄 & 신규 매물 특별전"
        subtitle="오늘의 추천 차량을 만나보세요. 한정 혜택 진행 중!"
        ctaPrimary={{ label: "프리미엄 보러가기", href: "/cars?tier=premium" }}
        ctaSecondary={{ label: "프로모션 안내", href: "/ads" }}
        imageSrc="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&h=240&fit=crop&crop=center"
        imageAlt="Premium car"
      />

      {/* Home Search Hero */}
      <HomeSearchHero />

      {/* Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              최근 등록된 차량
            </h2>
            <p className="text-lg text-gray-600">
              새로 등록된 인기 차량들을 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {cars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href="/buy" className="btn-primary px-8">
              더 많은 차량 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Weekly Deals */}
      <WeeklyDeals />

      {/* ▼▼▼ "최근 등록된 차량" 섹션 렌더 바로 아래에 다음 코드 블록 추가 ▼▼▼ */}
      {/* Tier-based Car Rows */}
      {cars.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* cars 상태가 이미 있다면 그대로 사용, 없다면 동일 방식으로 seed.json을 fetch (기존 로직 재사용) */}
            {(() => {
              const allCars = cars.map((c: any, i: number) => normalize(c));
              
              const premium = allCars.filter((c: any, i: number) => resolveTier(c, i) === 'premium').slice(0, 6);
              const plus = allCars.filter((c: any, i: number) => resolveTier(c, i) === 'plus').slice(0, 6);
              const general = allCars.filter((c: any, i: number) => resolveTier(c, i) === 'general').slice(0, 10);

              return (
                <>
                  {/* Premium 행 (6개, 기본 크기) */}
                  <CarRow 
                    title="Premium" 
                    href="/cars?tier=premium" 
                    cars={premium.length ? premium : allCars.slice(0, 6)} 
                    count={6} 
                    size="base" 
                    onLikeToggle={handleLikeToggle}
                  />

                  {/* Plus 행 (6개, 조금 작게) */}
                  <CarRow 
                    title="Plus" 
                    href="/cars?tier=plus" 
                    cars={plus.length ? plus : allCars.slice(6, 12)} 
                    count={6} 
                    size="sm"
                    showBanner={true}
                    onLikeToggle={handleLikeToggle}
                  />

                  {/* General 행 (10개, 가장 작게) */}
                  <CarRow 
                    title="General" 
                    href="/cars?tier=general" 
                    cars={general.length ? general : allCars.slice(0, 10)} 
                    count={10} 
                    size="xs"
                    showBanner={true}
                    onLikeToggle={handleLikeToggle}
                  />
                </>
              );
            })()}
          </div>
        </section>
      )}
      {/* ▲▲▲ 이 블록만 추가하고, 기존 코드는 손대지 말 것 ▲▲▲ */}

      {/* News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              자동차 뉴스
            </h2>
            <p className="text-lg text-gray-600">
              자동차 시장의 최신 소식과 정보를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(article => (
              <article key={article.id} className="card hover:shadow-soft-lg transition-shadow duration-200">
                <div className="relative h-48 mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{article.publishedAt.toLocaleDateString('ko-KR')}</span>
                  <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            AutoMarket.mn에서 안전하고 편리하게 중고차를 거래하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buy" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8">
              차량 구매하기
            </Link>
            <Link href="/sell" className="btn-accent bg-accent-600 hover:bg-accent-700 text-white px-8">
              차량 판매하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
