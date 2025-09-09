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