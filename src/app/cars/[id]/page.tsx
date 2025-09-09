'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Car } from '@/types/car';
import { normalize } from '@/lib/normalize';
import { formatKm, formatPriceMNT, joinDot } from '@/lib/format';
import ImageGallery from '@/app/components/ImageGallery';
import SellerContact from '@/app/components/SellerContact';
import OptionGrid from '@/app/components/OptionGrid';

export default function CarDetailPage() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carId = params.id as string;
    
    // seed.json에서 해당 차량 찾기
    fetch('/seed.json')
      .then(res => res.json())
      .then(data => {
        const foundCar = data.cars.find((c: any) => c.id.toString() === carId);
        if (foundCar) {
          setCar(normalize(foundCar));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch car:', err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">차량을 찾을 수 없습니다</h1>
          <p className="text-gray-600">요청하신 차량이 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }

  // 헤더 요약 정보
  const yearInfo = joinDot([
    car.makeYear && `${car.makeYear}년`,
    car.importYear && `수입: ${car.importYear}년`,
    car.mileageKm && formatKm(car.mileageKm)
  ]);

  const detailsInfo = joinDot([
    car.fuel,
    car.location
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <main className="space-y-6">
            {/* Header Summary */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {car.model}
                  </h1>
                  
                  {yearInfo && (
                    <p className="text-sm text-neutral-600 mb-1">
                      {yearInfo}
                    </p>
                  )}
                  
                  {detailsInfo && (
                    <p className="text-sm text-neutral-600">
                      {detailsInfo}
                    </p>
                  )}
                </div>

                <div className="flex flex-col lg:items-end gap-3">
                  {car.priceMNT && (
                    <div className="text-2xl lg:text-3xl font-bold text-primary-600">
                      {formatPriceMNT(car.priceMNT)}
                    </div>
                  )}
                  
                  {car.seller && (
                    <SellerContact seller={car.seller}>
                      판매자 문의하기
                    </SellerContact>
                  )}
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <ImageGallery images={car.images || []} />
            </div>

            {/* Basic Information */}
            <div className={`bg-white rounded-xl shadow-soft p-6 ${!car.options?.length && !car.memo ? 'mb-12' : ''}`}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {car.makeYear && (
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">제조년</div>
                    <div className="font-medium">{car.makeYear}년</div>
                  </div>
                )}
                {car.importYear && (
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">수입년</div>
                    <div className="font-medium">{car.importYear}년</div>
                  </div>
                )}
                {car.mileageKm && (
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">주행거리</div>
                    <div className="font-medium">{formatKm(car.mileageKm)}</div>
                  </div>
                )}
                {car.fuel && (
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">연료</div>
                    <div className="font-medium">{car.fuel}</div>
                  </div>
                )}
                {car.location && (
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">위치</div>
                    <div className="font-medium">{car.location}</div>
                  </div>
                )}
                {car.priceMNT && (
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">가격</div>
                    <div className="font-medium text-primary-600">{formatPriceMNT(car.priceMNT)}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Options */}
            {car.options && car.options.length > 0 && (
              <div className={`bg-white rounded-xl shadow-soft p-6 ${!car.memo ? 'mb-12' : ''}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">옵션</h2>
                <OptionGrid options={car.options} />
              </div>
            )}

            {/* Seller Memo */}
            {car.memo && (
              <div className="bg-white rounded-xl shadow-soft p-6 mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">판매자 메모</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {car.memo}
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}