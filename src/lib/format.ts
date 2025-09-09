export const formatKm = (n?: number) =>
  n == null ? '' : new Intl.NumberFormat('ko-KR').format(n) + ' km';

export const formatPriceMNT = (n?: number) =>
  n == null ? '' : new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0
  }).format(n);

export const joinDot = (arr: (string | number | undefined | null)[]) =>
  arr.filter(Boolean).join(' · ');

export function endOfThisWeekULN(): number {
  // Asia/Ulaanbaatar 기준 일요일 23:59:59
  const now = new Date();
  const day = (now.getDay() + 6) % 7; // Mon=0 ... Sun=6
  const end = new Date(now);
  end.setDate(now.getDate() + (6 - day));
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

export function toCountdown(t: number) {
  const s = Math.max(0, Math.floor(t / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { d, h, m, sec };
}

// 호환성을 위한 별칭 exports
export const toUSD = formatPriceMNT; // MNT 포맷을 USD 이름으로 호환
export const toKm = formatKm; // 기존 formatKm을 toKm으로 호환

// 상대 시간 표시 함수
export function fromNow(date: string | number | Date | undefined): string {
  if (!date) return '';
  
  const now = new Date();
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) return '';
  
  const diffMs = now.getTime() - targetDate.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  if (diffYear > 0) return `${diffYear}년 전`;
  if (diffMonth > 0) return `${diffMonth}개월 전`;
  if (diffWeek > 0) return `${diffWeek}주 전`;
  if (diffDay > 0) return `${diffDay}일 전`;
  if (diffHour > 0) return `${diffHour}시간 전`;
  if (diffMin > 0) return `${diffMin}분 전`;
  if (diffSec > 5) return `${diffSec}초 전`;
  return '방금 전';
}