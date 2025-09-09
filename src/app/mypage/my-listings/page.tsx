'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/lib/types';
import { toUSD, toKm, fromNow } from '@/lib/format';

export default function MyListingsPage() {
  const [myListings, setMyListings] = useState<Car[]>([]);

  useEffect(() => {
    const listings = JSON.parse(localStorage.getItem('myListings') || '[]');
    setMyListings(listings);
  }, []);

  const handleDeleteListing = (carId: string) => {
    if (confirm('정말로 이 공고를 삭제하시겠습니까?')) {
      const updatedListings = myListings.filter(car => car.id !== carId);
      setMyListings(updatedListings);
      localStorage.setItem('myListings', JSON.stringify(updatedListings));
    }
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

  const getStatusBadge = (expiresAt: Date) => {
    const now = new Date();
    const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 0) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">만료됨</span>;
    } else if (daysLeft <= 3) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">곧 만료</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">활성</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">내 공고</h1>
          <p className="text-lg text-gray-600">
            {myListings.length}개의 차량을 등록했습니다
          </p>
        </div>

        {/* Listings */}
        {myListings.length > 0 ? (
          <div className="space-y-6">
            {myListings.map(car => (
              <div key={car.id} className="card">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0">
                    <Image
                      src={car.images[0] || '/cars/sedan.svg'}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                    <div className="absolute top-2 left-2">
                      {getStatusBadge(car.expiresAt)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {car.brand} {car.model} {car.subModel}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={getListingTypeBadge(car.listingType)}>
                          {car.listingType}
                        </span>
                        <button
                          onClick={() => handleDeleteListing(car.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-primary-600 mb-4">
                      {toUSD(car.price)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="text-gray-500">연식:</span> {car.year}년
                      </div>
                      <div>
                        <span className="text-gray-500">수입:</span> {car.importYear}년
                      </div>
                      <div>
                        <span className="text-gray-500">주행거리:</span> {toKm(car.mileage)}
                      </div>
                      <div>
                        <span className="text-gray-500">도시:</span> {car.city}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>등록일: {fromNow(car.createdAt)}</span>
                      <span>
                        {Math.ceil((car.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}일 남음
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              등록한 차량이 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              첫 번째 차량을 등록해보세요
            </p>
            <Link href="/sell" className="btn-primary px-8">
              차량 등록하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
