"use client";
import { formatPriceMNT } from "@/lib/format";

export interface Deal {
  id: string|number;
  title: string;
  image: string;
  price: number;      // 할인가
  original?: number;  // 원가
  href?: string;      // 상세 링크
  badges?: string[];  // 예: ['인기','특가']
}

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <a
      href={deal.href ?? "#"}
      className="block rounded-2xl overflow-hidden bg-white/95 backdrop-blur shadow hover:shadow-lg transition border border-black/5"
      aria-label={`${deal.title} 특가 보기`}
    >
      <div className="aspect-[4/3] bg-neutral-100">
        <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-3">
        <h3 className="text-[15px] font-semibold line-clamp-2">{deal.title}</h3>

        {deal.original ? (
          <div className="mt-2 text-xs text-neutral-400 line-through">
            {formatPriceMNT(deal.original)}
          </div>
        ) : null}

        <div className="mt-1 text-xl font-extrabold text-rose-700">
          {formatPriceMNT(deal.price)}
        </div>

        {deal.badges?.length ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {deal.badges.slice(0,3).map((b)=>(
              <span key={b} className="px-2 py-0.5 text-[11px] rounded-md bg-neutral-100 border border-neutral-200">{b}</span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}
