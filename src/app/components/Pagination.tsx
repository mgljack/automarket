"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ total, pageSize=30 }:{ total:number; pageSize?:number }) {
  const sp = useSearchParams(); const router = useRouter();
  const page = Math.max(1, Number(sp.get("page")||1));
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = (p:number) => {
    const params = new URLSearchParams(sp.toString());
   (p<=1) ? params.delete("page") : params.set("page", String(p));
    router.push(`/cars?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (pages<=1) return null;
  const items = Array.from({length:pages},(_,i)=>i+1).slice(0,10); // 처음 10쪽까지만 노출
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button onClick={()=>go(Math.max(1, page-1))} className="px-3 py-2 rounded-lg border bg-white disabled:opacity-40" disabled={page<=1}>이전</button>
      {items.map(p=>(
        <button key={p} onClick={()=>go(p)}
          className={`px-3 py-2 rounded-lg border ${p===page?'bg-neutral-900 text-white':'bg-white hover:bg-neutral-50'}`}>
          {p}
        </button>
      ))}
      <button onClick={()=>go(Math.min(pages, page+1))} className="px-3 py-2 rounded-lg border bg-white disabled:opacity-40" disabled={page>=pages}>다음</button>
    </div>
  );
}
