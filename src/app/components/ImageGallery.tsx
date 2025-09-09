'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>이미지 없음</p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Desktop Layout */}
      <div className="hidden xl:grid grid-cols-[3fr_1fr] gap-3">
        {/* Main Image */}
        <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden group">
          <Image
            src={images[activeIndex]}
            alt={`차량 이미지 ${activeIndex + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="이전 이미지"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="다음 이미지"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex flex-col gap-2 overflow-auto max-h-[420px]">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden transition-all ${
                index === activeIndex
                  ? 'ring-2 ring-primary-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`썸네일 ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="xl:hidden space-y-3">
        {/* Main Image */}
        <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden group">
          <Image
            src={images[activeIndex]}
            alt={`차량 이미지 ${activeIndex + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="이전 이미지"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="다음 이미지"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Horizontal Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                index === activeIndex
                  ? 'ring-2 ring-primary-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`썸네일 ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
