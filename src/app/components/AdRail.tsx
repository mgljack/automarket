'use client';

import Image from 'next/image';

interface AdRailProps {
  images: string[];
}

export default function AdRail({ images }: AdRailProps) {
  return (
    <div className="hidden xl:flex flex-col gap-4 sticky top-24">
      {images.map((image, index) => (
        <div
          key={index}
          className="w-[160px] h-[600px] bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <Image
            src={image}
            alt={`광고 배너 ${index + 1}`}
            width={160}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
