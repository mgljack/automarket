"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import DealCard, { Deal } from "./DealCard";
import { endOfThisWeekULN, toCountdown } from "@/lib/format";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WeeklyDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [endAt, setEndAt] = useState<number>(endOfThisWeekULN());
  const [now, setNow] = useState<number>(Date.now());
  const [index, setIndex] = useState(0);

  // 1초 카운터
  useEffect(() => {
    const t = setInterval(()=>setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // 데이터 로드
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/deals.json", { cache: "no-store" });
        const j = await r.json();
        if (!alive) return;
        setDeals(j.items || j || []);
        if (j.endAt) setEndAt(new Date(j.endAt).getTime());
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  // 반응형 슬라이드 크기
  const [per, setPer] = useState(3);
  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      setPer(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const pages = Math.max(1, Math.ceil(deals.length / per));
  const clamped = Math.min(index, pages - 1);

  const offsetPct = useMemo(() => -(clamped * 100), [clamped]);

  const rest = Math.max(0, endAt - now);
  const { d, h, m, sec } = toCountdown(rest);

  return (
    <section className="relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-900/80" />
        <div className="absolute inset-0 opacity-50"
          style={{ backgroundImage:
            "radial-gradient(800px 200px at 50% 0%, rgba(255,0,180,.25), transparent), radial-gradient(600px 180px at 50% 10%, rgba(0,200,255,.25), transparent)"}} />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 타이틀 */}
        <div className="text-center text-white">
          <h2 className="text-3xl font-extrabold">위클리 특가</h2>
          <p className="text-white/80 mt-1 text-sm">매주 터지는 최대 할인! 놓치지 마세요</p>
        </div>

        {/* 네온 카운트다운 바 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 max-w-3xl rounded-2xl p-3
                     bg-[radial-gradient(120%_120%_at_50%_50%,rgba(255,255,255,.18),rgba(255,255,255,.06))]
                     ring-1 ring-white/25 text-white text-center"
        >
          <div className="text-sm opacity-90">남은시간</div>
          <div className="mt-1 text-2xl sm:text-3xl font-extrabold tabular-nums">
            {d}일 {String(h).padStart(2,"0")}시간 {String(m).padStart(2,"0")}분 {String(sec).padStart(2,"0")}초
          </div>
        </motion.div>

        {/* 캐러셀 */}
        <div className="relative mt-6">
          {/* 좌우 버튼 */}
          <button
            onClick={()=>setIndex(Math.max(0, clamped - 1))}
            className="hidden md:grid place-items-center absolute left-0 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow"
            aria-label="이전"
          ><ChevronLeft className="w-5 h-5"/></button>

          <button
            onClick={()=>setIndex(Math.min(pages-1, clamped + 1))}
            className="hidden md:grid place-items-center absolute right-0 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow"
            aria-label="다음"
          ><ChevronRight className="w-5 h-5"/></button>

          {/* 트랙 */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${offsetPct}%)` }}
            >
              {Array.from({ length: pages }).map((_, p) => (
                <div key={p} className="w-full shrink-0 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {deals.slice(p*per, p*per + per).map((d) => (
                      <DealCard key={d.id} deal={d} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 페이지 인디케이터 & 더보기 */}
          <div className="flex items-center justify-between mt-3 text-white/90">
            <Link href="/cars?q=%ED%8A%B9%EA%B0%80" className="text-sm underline underline-offset-4">더보기</Link>
            <div className="text-sm">{clamped + 1} / {pages}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
