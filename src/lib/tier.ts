export type Tier = 'premium'|'plus'|'general';

export function resolveTier(car: any, index: number): Tier {
  const t = (car.tier ?? car.Tier ??
    car.tags?.find?.((x:string)=>['premium','plus','general'].includes(String(x).toLowerCase())));
  if (t) return String(t).toLowerCase() as Tier;
  const mod = ((typeof car.id==='number'?car.id:String(car.id).length)+index) % 10;
  if (mod < 2) return 'premium';  // ~20%
  if (mod < 5) return 'plus';     // ~30%
  return 'general';               // ~50%
}
export const tierOrder: Record<Tier, number> = { premium:0, plus:1, general:2 };
