'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CarListItem from '@/app/components/CarListItem';
import SearchBar from '@/components/SearchBar';
import { Car } from '@/types/car';
import { ListingType } from '@/lib/types';
import { normalize } from '@/lib/normalize';
import { resolveTier } from '@/lib/tier';
import { likesMock } from '@/lib/likes-mock';

export default function BuyPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [activeTab, setActiveTab] = useState<ListingType>('General');
  const [sortBy, setSortBy] = useState('latest');
  const searchParams = useSearchParams();

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

  useEffect(() => {
    // seed.json에서 데이터 로드
    fetch('/seed.json')
      .then(res => res.json())
      .then(data => {
        const normalizedCars = data.cars.map((raw: any, index: number) => {
          const car = normalize(raw);
          return { ...car, tier: resolveTier(car, index) };
        });
        setCars(normalizedCars);
        setFilteredCars(normalizedCars);
      })
      .catch(err => console.error('Failed to fetch cars:', err));
  }, []);

  useEffect(() => {
    // URL 파라미터에서 필터 적용
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');
    const fuelType = searchParams.get('fuelType');
    const transmission = searchParams.get('transmission');
    const bodyType = searchParams.get('bodyType');

    let filtered = [...cars];

    if (brand) filtered = filtered.filter(car => car.model?.includes(brand));
    if (model) filtered = filtered.filter(car => car.model?.includes(model));
    if (city) filtered = filtered.filter(car => car.location === city);
    if (minPrice) filtered = filtered.filter(car => (car.priceMNT || 0) >= parseInt(minPrice));
    if (maxPrice) filtered = filtered.filter(car => (car.priceMNT || 0) <= parseInt(maxPrice));
    if (minYear) filtered = filtered.filter(car => (car.makeYear || 0) >= parseInt(minYear));
    if (maxYear) filtered = filtered.filter(car => (car.makeYear || 0) <= parseInt(maxYear));
    if (fuelType) filtered = filtered.filter(car => car.fuel === fuelType);

    setFilteredCars(filtered);
  }, [searchParams, cars]);

  useEffect(() => {
    // 탭별 필터링
    let filtered = cars;
    if (activeTab !== 'General') {
      filtered = cars.filter(car => car.tier === activeTab.toLowerCase());
    }
    setFilteredCars(filtered);
  }, [cars, activeTab]);

  useEffect(() => {
    // 정렬 적용
    const sorted = [...filteredCars].sort((a, b) => {
      switch (sortBy) {
        case 'lowPrice':
          return (a.priceMNT || 0) - (b.priceMNT || 0);
        case 'highPrice':
          return (b.priceMNT || 0) - (a.priceMNT || 0);
        case 'lowMileage':
          return (a.mileageKm || 0) - (b.mileageKm || 0);
        case 'highMileage':
          return (b.mileageKm || 0) - (a.mileageKm || 0);
        case 'latest':
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });

    setFilteredCars(sorted);
  }, [filteredCars, sortBy]);


  const tabs = [
    { id: 'General', label: 'General', count: cars.filter(car => car.tier === 'general' || !car.tier).length },
    { id: 'Premium', label: 'Premium', count: cars.filter(car => car.tier === 'premium').length },
    { id: 'Plus', label: 'Plus', count: cars.filter(car => car.tier === 'plus').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">차사기</h1>
          <p className="text-lg text-gray-600">
            {filteredCars.length}대의 차량이 있습니다
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ListingType)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-auto"
            >
              <option value="latest">최근 등록일순</option>
              <option value="lowPrice">낮은 가격순</option>
              <option value="highPrice">높은 가격순</option>
              <option value="lowMileage">낮은 주행거리순</option>
              <option value="highMileage">높은 주행거리순</option>
            </select>
          </div>
        </div>

        {/* Cars List */}
        {filteredCars.length > 0 ? (
          <div className="space-y-4">
            {filteredCars.map(car => (
              <CarListItem
                key={car.id}
                car={car}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500">
              다른 검색 조건을 시도해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}