'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import { toUSD, toKm, fromNow } from '@/lib/format';
import { authMock } from '@/lib/auth-mock';

interface CarCardProps {
  car: Car;
  onLikeToggle?: (carId: string | number, isLiked: boolean) => void;
}

export default function CarCard({ car, onLikeToggle }: CarCardProps) {
  const [isLiked, setIsLiked] = useState(car.isLiked || false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const user = authMock.getCurrentUser();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (onLikeToggle) {
      onLikeToggle(car.id, newLikedState);
    }

    // Update localStorage
    const likedCars = JSON.parse(localStorage.getItem('likedCars') || '[]');
    if (newLikedState) {
      if (!likedCars.includes(car.id)) {
        likedCars.push(car.id);
      }
    } else {
      const index = likedCars.indexOf(car.id);
      if (index > -1) {
        likedCars.splice(index, 1);
      }
    }
    localStorage.setItem('likedCars', JSON.stringify(likedCars));
  };

  const getListingTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (type) {
      case 'Premium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Hot':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <Link href={`/cars/${car.id}`} className="block">
      <div className="card hover:shadow-soft-lg transition-shadow duration-200 group">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0">
            <Image
              src={car.images?.[0] || '/cars/sedan.svg'}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute top-2 left-2">
              <span className={getListingTypeBadge(car.listingType || 'General')}>
                {car.listingType || 'General'}
              </span>
            </div>
            <button
              onClick={handleLikeClick}
              className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
            >
              <svg
                className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
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

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {car.brand} {car.model} {car.subModel}
              </h3>
              <span className="text-lg font-bold text-primary-600">
                {toUSD(car.price)}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex flex-wrap gap-4">
                <span>{car.year}년</span>
                <span>수입: {car.importYear}년</span>
                <span>{toKm(car.mileage)}</span>
                <span>{car.city}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span>{car.fuelType}</span>
                <span>{car.transmission}</span>
                <span>{car.driveType}</span>
                <span>{car.bodyType}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{car.seller?.name || '판매자'}</span>
                <span>{fromNow(car.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
