'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRANDS, MODELS, CITIES } from '@/lib/data';

interface SearchFilters {
  brand: string;
  model: string;
  subModel: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>({
    brand: '',
    model: '',
    subModel: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelType: '',
    transmission: '',
    bodyType: ''
  });

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableSubModels, setAvailableSubModels] = useState<string[]>([]);

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({ ...prev, brand, model: '', subModel: '' }));
    setAvailableModels(brand ? MODELS[brand as keyof typeof MODELS] || [] : []);
    setAvailableSubModels([]);
  };

  const handleModelChange = (model: string) => {
    setFilters(prev => ({ ...prev, model, subModel: '' }));
    // In a real app, you'd fetch sub-models from an API
    setAvailableSubModels([]);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    router.push(`/buy${queryString ? `?${queryString}` : ''}`);
  };

  const handleReset = () => {
    setFilters({
      brand: '',
      model: '',
      subModel: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      fuelType: '',
      transmission: '',
      bodyType: ''
    });
    setAvailableModels([]);
    setAvailableSubModels([]);
  };

  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제조사
          </label>
          <select
            value={filters.brand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="input"
          >
            <option value="">전체</option>
            {BRANDS.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            모델
          </label>
          <select
            value={filters.model}
            onChange={(e) => handleModelChange(e.target.value)}
            className="input"
            disabled={!filters.brand}
          >
            <option value="">전체</option>
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            도시
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="input"
          >
            <option value="">전체</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            가격 범위 (투그룩)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="최소"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="input flex-1"
            />
            <input
              type="number"
              placeholder="최대"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="input flex-1"
            />
          </div>
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연식 범위
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="최소"
              value={filters.minYear}
              onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
              className="input flex-1"
            />
            <input
              type="number"
              placeholder="최대"
              value={filters.maxYear}
              onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
              className="input flex-1"
            />
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연료
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
            className="input"
          >
            <option value="">전체</option>
            <option value="Gasoline">가솔린</option>
            <option value="Diesel">디젤</option>
            <option value="Hybrid">하이브리드</option>
            <option value="Electric">전기</option>
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            변속기
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
            className="input"
          >
            <option value="">전체</option>
            <option value="Manual">수동</option>
            <option value="Automatic">자동</option>
            <option value="CVT">CVT</option>
          </select>
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            차체
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => setFilters(prev => ({ ...prev, bodyType: e.target.value }))}
            className="input"
          >
            <option value="">전체</option>
            <option value="Sedan">세단</option>
            <option value="Hatchback">해치백</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">쿠페</option>
            <option value="Pickup">픽업</option>
            <option value="Wagon">왜건</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleSearch}
          className="btn-primary px-8"
        >
          검색
        </button>
        <button
          onClick={handleReset}
          className="btn-secondary px-8"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
