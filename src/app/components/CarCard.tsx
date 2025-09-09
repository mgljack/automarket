'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/types/car';
import { formatKm, formatPriceMNT, joinDot } from '@/lib/format';
import { likesMock } from '@/lib/likes-mock';

interface CarCardProps {
  car: Car;
  onLikeToggle?: (carId: string, isLiked: boolean) => void;
}

export default function CarCard({ car, onLikeToggle }: CarCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 상태 로드
  useEffect(() => {
    setIsLiked(likesMock.isLiked(car.id.toString()));
  }, [car.id]);

  // 좋아요 클릭 핸들러
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (newLikedState) {
      likesMock.addLike(car.id.toString());
    } else {
      likesMock.removeLike(car.id.toString());
    }
    
    if (onLikeToggle) {
      onLikeToggle(car.id.toString(), newLikedState);
    }
  };

  // 2줄: 제조년, 수입년, 주행거리
  const yearInfo = joinDot([
    car.makeYear && `${car.makeYear}년`,
    car.importYear && `수입: ${car.importYear}년`,
    car.mileageKm && formatKm(car.mileageKm)
  ]);

  // 3줄: 연료, 위치
  const detailsInfo = joinDot([
    car.fuel,
    car.location
  ]);

  const mainImage = car.images?.[0];

  return (
    <Link href={`/cars/${car.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl">
      <div className="bg-white rounded-xl shadow-soft hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
        {/* 이미지 */}
        <div className="aspect-[16/9] bg-gray-100 relative">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={car.model}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* 좋아요 아이콘 */}
          <button
            onClick={handleLikeClick}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm"
            aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          >
            <svg
              className={`w-4 h-4 transition-colors duration-200 ${
                isLiked ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'
              }`}
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* 정보 */}
        <div className="p-3 space-y-1">
          {/* 1줄: 차량명 */}
          <h3 className="font-medium text-gray-900 truncate">
            {car.model}
          </h3>

          {/* 2줄: 제조년, 수입년, 주행거리 */}
          {yearInfo && (
            <p className="text-sm text-neutral-600">
              {yearInfo}
            </p>
          )}

          {/* 3줄: 연료, 위치 */}
          {detailsInfo && (
            <p className="text-sm text-neutral-600">
              {detailsInfo}
            </p>
          )}

          {/* 4줄: 가격 */}
          {car.priceMNT && (
            <p className="text-lg font-bold text-primary-600">
              {formatPriceMNT(car.priceMNT)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
