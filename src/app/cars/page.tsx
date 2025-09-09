"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { normalize } from "@/lib/normalize";
import { resolveTier, tierOrder } from "@/lib/tier";
import CarListItem from "@/app/components/CarListItem";
import Pagination from "@/app/components/Pagination";

export default function CarsPage() {
  const sp = useSearchParams();
  const page = Math.max(1, Number(sp.get("page") || 1));
  const PAGE_SIZE = 30;

  const [raw, setRaw] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/seed.json", { cache: "no-store" });
        const data = await res.json();
        if (!alive) return;
        setRaw(Array.isArray(data?.cars) ? data.cars : data);
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const cars = useMemo(() => raw.map((r:any)=>normalize(r)), [raw]);

  // 정렬: Premium → Plus → General, 그리고 최신(createdAt desc)
  const sorted = useMemo(() => {
    return cars
      .map((c, i) => ({ c, t: resolveTier(c, i) }))
      .sort((a,b) => {
        const t = tierOrder[a.t] - tierOrder[b.t];
        if (t !== 0) return t;
        const ad = Number(new Date(b.c.createdAt || 0)) - Number(new Date(a.c.createdAt || 0));
        return ad;
      })
      .map(x => ({ ...x.c, tier: x.t }));
  }, [cars]);

  // 페이지 슬라이싱(30개)
  const total = sorted.length;
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* 메인 콘텐츠 */}
          <div className="flex-1 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">최근 등록된 차량</h1>

            {loading ? (
              <div className="py-10 text-center text-neutral-500">불러오는 중…</div>
            ) : (
              <>
                {pageItems.length === 0 ? (
                  <div className="py-12 text-center text-neutral-500">표시할 차량이 없습니다.</div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {pageItems.map((car:any)=> (<CarListItem key={car.id} car={car} />))}
                  </div>
                )}
                <Pagination total={total} pageSize={PAGE_SIZE} />
              </>
            )}
          </div>

          {/* 우측 고정 광고 배너 */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* 광고 배너 1 */}
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <a href="/ads" className="block">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=256&h=300&fit=crop&crop=center"
                    alt="광고 1"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">특별 할인 이벤트</h3>
                    <p className="text-xs text-gray-600">지금 확인해보세요!</p>
                  </div>
                </a>
              </div>

              {/* 광고 배너 2 */}
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <a href="/ads" className="block">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=256&h=300&fit=crop&crop=center"
                    alt="광고 2"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">프리미엄 서비스</h3>
                    <p className="text-xs text-gray-600">더 많은 혜택을 받으세요</p>
                  </div>
                </a>
              </div>

              {/* 광고 배너 3 */}
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <a href="/ads" className="block">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=256&h=300&fit=crop&crop=center"
                    alt="광고 3"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">신규 회원 혜택</h3>
                    <p className="text-xs text-gray-600">회원가입하고 혜택 받기</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
