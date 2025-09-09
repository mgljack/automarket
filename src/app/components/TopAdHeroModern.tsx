"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface TopAdHeroModernProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageSrc?: string;            // 우측 차량 실루엣/배너 이미지
  imageAlt?: string;
  className?: string;
}

export default function TopAdHeroModern({
  title = "프리미엄 차량 한눈에",
  subtitle = "오늘 등록된 인기 매물을 만나보세요",
  ctaPrimary = { label: "프리미엄 보러가기", href: "/cars?tier=premium" },
  ctaSecondary = { label: "이벤트 안내", href: "/ads" },
  imageSrc = "/ads/hero-car.png",
  imageAlt = "Premium car",
  className = ""
}: TopAdHeroModernProps) {
  return (
    <section
      aria-label="홈 상단 광고 배너"
      className={`container mx-auto px-4 mt-4 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="
          relative overflow-hidden rounded-2xl
          bg-gradient-to-tr from-indigo-600 via-fuchsia-600 to-rose-500
          text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]
        "
      >
        {/* 유리(glass) 카드 레이어 */}
        <div className="
          absolute inset-0
          [background:radial-gradient(1200px_400px_at_20%_10%,rgba(255,255,255,0.25),transparent)]
        " />
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-2">
          {/* 좌측 텍스트 */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
              {title}
            </h2>
            <p className="mt-2 text-white/90 text-sm sm:text-base">
              {subtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                prefetch={false}
                href={ctaPrimary.href}
                className="
                  inline-flex items-center gap-2 rounded-xl px-4 py-2.5
                  bg-white text-gray-900 font-semibold
                  shadow hover:shadow-md transition
                "
                aria-label={ctaPrimary.label}
              >
                {ctaPrimary.label}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                prefetch={false}
                href={ctaSecondary.href}
                className="
                  inline-flex items-center gap-2 rounded-xl px-4 py-2.5
                  bg-white/10 text-white backdrop-blur
                  ring-1 ring-white/30 hover:bg-white/15 transition
                "
                aria-label={ctaSecondary.label}
              >
                {ctaSecondary.label}
              </Link>
            </div>

            {/* 작은 보조 텍스트/뱃지(선택) */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs sm:text-sm bg-white/10 backdrop-blur rounded-lg px-2.5 py-1 ring-1 ring-white/20">
                신규 등록 실시간 업데이트
              </span>
              <span className="text-xs sm:text-sm bg-white/10 backdrop-blur rounded-lg px-2.5 py-1 ring-1 ring-white/20">
                광고 • 스폰서
              </span>
            </div>
          </div>

          {/* 우측 이미지 */}
          <div className="relative min-h-[140px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="h-full w-full flex items-end justify-end pr-2 sm:pr-4 pt-2"
            >
              {/* 반응형 이미지: 우측 하단에 붙는 실루엣 */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="max-h-[190px] sm:max-h-[220px] lg:max-h-[240px] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]"
                loading="eager"
                width={640}
                height={240}
              />
            </motion.div>

            {/* 장식용 그리드 라인 */}
            <div className="pointer-events-none absolute inset-0 opacity-15">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeOpacity="0.12" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
