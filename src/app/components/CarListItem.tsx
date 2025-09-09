"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Car } from "@/types/car";
import { formatKm, formatPriceMNT, joinDot } from "@/lib/format";
import { likesMock } from '@/lib/likes-mock';

interface CarListItemProps {
  car: Car;
  onLikeToggle?: (carId: string, isLiked: boolean) => void;
}

export default function CarListItem({ car, onLikeToggle }: CarListItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const img = car.images?.[0];

  useEffect(() => {
    setIsLiked(likesMock.isLiked(car.id.toString()));
  }, [car.id]);

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

  return (
    <Link
      href={`/cars/${car.id}`}
      className="block rounded-2xl border border-neutral-200/70 bg-white hover:shadow-md transition"
    >
      <div className="flex gap-3 p-3">
        {/* 썸네일(좌) */}
        <div className="relative w-[180px] h-[120px] shrink-0 rounded-xl overflow-hidden bg-neutral-100">
          {img ? (
            // 업로드 예시처럼 좌측 썸네일
            <img src={img} alt={car.model} className="w-full h-full object-cover" />
          ) : null}
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

        {/* 본문(중앙) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-[15px] leading-snug line-clamp-2">{car.model}</h3>
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            {joinDot([
              car.makeYear ? `${car.makeYear}년식` : "",
              car.importYear ? `${car.importYear}년 수입` : "",
              car.mileageKm ? formatKm(car.mileageKm) : "",
              car.fuel,
              car.location
            ])}
          </div>
          {/* 해시태그/옵션(1줄) */}
          {car.options?.length ? (
            <div className="mt-1 text-xs text-neutral-500 truncate">
              #{car.options.slice(0,6).join(" #")}
            </div>
          ) : null}
          {/* 라벨(옵션) */}
          <div className="mt-2 flex flex-wrap gap-2">
            {car.tier ? (
              <span className="px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                {car.tier.toUpperCase()}
              </span>
            ) : null}
          </div>
        </div>

        {/* 가격(우측) */}
        <div className="w-[140px] text-right shrink-0">
          <div className="font-extrabold text-neutral-900 text-sm leading-tight break-words">
            {formatPriceMNT(car.priceMNT)}
          </div>
        </div>
      </div>
    </Link>
  );
}
