'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BRANDS, MODELS, CITIES } from '@/lib/data';
import { authMock } from '@/lib/auth-mock';

interface CarFormData {
  brand: string;
  model: string;
  subModel: string;
  city: string;
  year: string;
  importYear: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  bodyType: string;
  color: string;
  price: string;
  description: string;
  options: string[];
  images: File[];
}

export default function SellPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    subModel: '',
    city: '',
    year: '',
    importYear: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    driveType: '',
    bodyType: '',
    color: '',
    price: '',
    description: '',
    options: [],
    images: []
  });
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableSubModels, setAvailableSubModels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBrandChange = (brand: string) => {
    setFormData(prev => ({ ...prev, brand, model: '', subModel: '' }));
    setAvailableModels(brand ? MODELS[brand as keyof typeof MODELS] || [] : []);
    setAvailableSubModels([]);
  };

  const handleModelChange = (model: string) => {
    setFormData(prev => ({ ...prev, model, subModel: '' }));
    // In a real app, you'd fetch sub-models from an API
    setAvailableSubModels([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 20) {
      alert('최대 20장까지만 업로드할 수 있습니다.');
      return;
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addOption = (option: string) => {
    if (option.trim() && !formData.options.includes(option.trim())) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, option.trim()]
      }));
    }
  };

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = authMock.getCurrentUser();
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/auth/login');
      return;
    }

    // 필수 필드 검증
    const requiredFields = ['brand', 'model', 'city', 'year', 'importYear', 'mileage', 'fuelType', 'transmission', 'driveType', 'bodyType', 'color', 'price'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof CarFormData]);
    
    if (missingFields.length > 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (formData.images.length === 0) {
      alert('최소 1장의 이미지를 업로드해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 폼 데이터를 localStorage에 저장 (실제로는 서버에 전송)
    const carData = {
      ...formData,
      id: Date.now().toString(),
      seller: {
        id: user.id,
        name: user.name,
        phone: user.phone
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15일 후
    };

    localStorage.setItem('pendingCarData', JSON.stringify(carData));
    
    // 결제 페이지로 이동
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">차팔기</h1>
          <p className="text-lg text-gray-600">
            차량 정보를 입력하고 판매하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">기본 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제조사 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">제조사를 선택하세요</option>
                  {BRANDS.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  모델 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className="input"
                  required
                  disabled={!formData.brand}
                >
                  <option value="">모델을 선택하세요</option>
                  {availableModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  세부모델
                </label>
                <input
                  type="text"
                  value={formData.subModel}
                  onChange={(e) => setFormData(prev => ({ ...prev, subModel: e.target.value }))}
                  className="input"
                  placeholder="세부모델을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  도시 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="input"
                  required
                >
                  <option value="">도시를 선택하세요</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연식 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="input"
                  placeholder="2020"
                  min="1990"
                  max="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  수입년 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.importYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, importYear: e.target.value }))}
                  className="input"
                  placeholder="2021"
                  min="1990"
                  max="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주행거리 (km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                  className="input"
                  placeholder="50000"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  가격 (MNT) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="input"
                  placeholder="25000"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">기술 사양</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연료 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData(prev => ({ ...prev, fuelType: e.target.value }))}
                  className="input"
                  required
                >
                  <option value="">연료를 선택하세요</option>
                  <option value="Gasoline">가솔린</option>
                  <option value="Diesel">디젤</option>
                  <option value="Hybrid">하이브리드</option>
                  <option value="Electric">전기</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  변속기 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData(prev => ({ ...prev, transmission: e.target.value }))}
                  className="input"
                  required
                >
                  <option value="">변속기를 선택하세요</option>
                  <option value="Manual">수동</option>
                  <option value="Automatic">자동</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  구동 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.driveType}
                  onChange={(e) => setFormData(prev => ({ ...prev, driveType: e.target.value }))}
                  className="input"
                  required
                >
                  <option value="">구동을 선택하세요</option>
                  <option value="FWD">전륜구동</option>
                  <option value="RWD">후륜구동</option>
                  <option value="AWD">4륜구동</option>
                  <option value="4WD">4WD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  차체 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.bodyType}
                  onChange={(e) => setFormData(prev => ({ ...prev, bodyType: e.target.value }))}
                  className="input"
                  required
                >
                  <option value="">차체를 선택하세요</option>
                  <option value="Sedan">세단</option>
                  <option value="Hatchback">해치백</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">쿠페</option>
                  <option value="Pickup">픽업</option>
                  <option value="Wagon">왜건</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  색상 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="input"
                  placeholder="흰색"
                  required
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">차량 이미지</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    이미지를 선택하거나 드래그하세요 (최대 20장)
                  </span>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">옵션</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="옵션을 입력하세요 (예: 선루프, 가죽시트)"
                  className="input flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addOption(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder*="옵션을 입력하세요"]') as HTMLInputElement;
                    if (input) {
                      addOption(input.value);
                      input.value = '';
                    }
                  }}
                  className="btn-primary px-4"
                >
                  추가
                </button>
              </div>

              {formData.options.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.options.map((option, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {option}
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">차량 설명</h2>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input w-full h-32 resize-none"
              placeholder="차량의 상태, 특징, 판매 이유 등을 자세히 설명해주세요"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '등록 중...' : '차량 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
