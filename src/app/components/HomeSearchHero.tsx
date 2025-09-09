"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const defaultTags = [
  "GLA-클래스 X156",
  "G80 (RG3)",
  "GV80",
  "더 뉴 그랜저",
  "그랜저 IG",
];

export default function HomeSearchHero({
  tags = defaultTags,
}: { tags?: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const q0 = sp.get("q") ?? "";
  const [q, setQ] = useState(q0);

  useEffect(() => setQ(q0), [q0]);

  const go = (keyword: string) => {
    const qs = new URLSearchParams();
    if (keyword.trim()) qs.set("q", keyword.trim());
    router.push(`/cars?${qs.toString()}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    go(q);
  };

  return (
    <section className="container mx-auto px-4 mt-6">
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
        어떤 차를 찾으세요?
      </h2>

      {/* 입력 박스 (언더라인 스타일) */}
      <form
        onSubmit={onSubmit}
        className="relative max-w-3xl mx-auto mt-4 pt-2"
        aria-label="차량 검색"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="모델명을 입력해주세요. 예) 아이오닉5"
          className="
            w-full bg-transparent outline-none
            text-base sm:text-lg pb-2
            placeholder:text-neutral-400
            border-b-2 border-neutral-900
          "
        />
        <button
          type="submit"
          aria-label="검색"
          className="
            absolute right-0 top-1/2 -translate-y-1/2
            grid place-items-center
            w-9 h-9 rounded-full
            hover:bg-neutral-100 transition
          "
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* 해시태그 칩 */}
      <div className="
        max-w-3xl mx-auto
        flex flex-wrap justify-center gap-2 mt-4
      ">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => go(t)}
            className="
              px-3 py-1.5 rounded-full text-sm
              bg-neutral-100 hover:bg-neutral-200
              text-neutral-800
            "
            aria-label={`태그 ${t} 검색`}
          >
            #{t}
          </button>
        ))}
      </div>
    </section>
  );
}
