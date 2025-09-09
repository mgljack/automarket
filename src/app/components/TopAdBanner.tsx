"use client";
import Link from "next/link";

export default function TopAdBanner({
  href = "/ads",
  className = "",
}: { href?: string; className?: string }) {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      <Link href={href} aria-label="상단 광고 배너" className="block">
        {/* 반응형 소스 매핑: 상위 해상도부터 우선 적용 */}
        <picture>
          {/* XL: 1200x200 */}
          <source
            media="(min-width:1280px)"
            srcSet="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=200&fit=crop&crop=center"
            type="image/jpeg"
          />

          {/* LG: 970x250 */}
          <source
            media="(min-width:1024px)"
            srcSet="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=970&h=250&fit=crop&crop=center"
          />

          {/* SM/MD: 728x90 */}
          <source 
            media="(min-width:640px)" 
            srcSet="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=728&h=90&fit=crop&crop=center" 
          />

          {/* 모바일: 320x100 (fallback) */}
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=320&h=100&fit=crop&crop=center"
            alt="광고"
            width={320}
            height={100}
            className="w-full h-auto rounded-xl shadow-sm ring-1 ring-black/5"
            loading="eager"
          />
        </picture>
      </Link>
    </div>
  );
}
