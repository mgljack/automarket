'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import { CARS } from '@/lib/data';
import { Car } from '@/types/car';
import { authMock } from '@/lib/auth-mock';
import { normalize } from '@/lib/normalize';

export default function LikesPage() {
  const [likedCars, setLikedCars] = useState<Car[]>([]);

  useEffect(() => {
    const likedCarIds = authMock.getLikedCars();
    const cars = CARS.filter(car => likedCarIds.includes(car.id)).map(car => normalize(car));
    setLikedCars(cars);
  }, []);

  const handleLikeToggle = (carId: string | number, isLiked: boolean) => {
    if (!isLiked) {
      setLikedCars(prev => prev.filter(car => car.id !== carId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">좋아요한 차량</h1>
          <p className="text-lg text-gray-600">
            {likedCars.length}대의 차량을 좋아요했습니다
          </p>
        </div>

        {/* Cars Grid */}
        {likedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedCars.map(car => (
              <CarCard
                key={car.id}
                car={{ ...car, isLiked: true }}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              좋아요한 차량이 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              관심 있는 차량에 좋아요를 눌러보세요
            </p>
            <a
              href="/buy"
              className="btn-primary px-8"
            >
              차량 둘러보기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
