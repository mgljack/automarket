// 유틸리티 함수들

export function formatKm(km: number): string {
  return new Intl.NumberFormat('ko-KR').format(km) + ' km';
}

export function formatPriceMNT(price: number): string {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0
  }).format(price);
}

export function joinCompact(values: (string | number | undefined)[]): string {
  return values.filter(Boolean).join(' · ');
}

// Car 객체 정규화 함수
export function normalizeCar(car: any) {
  return {
    id: car.id,
    name: car.name || car.title || car.model || '차량명 없음',
    makeYear: car.makeYear || car.year,
    importYear: car.importYear,
    mileageKm: car.mileageKm || car.mileage_km || car.mileage,
    fuel: car.fuel,
    location: car.location,
    priceMNT: car.priceMNT || car.price_mnt || car.price,
    imageUrl: car.imageUrl || car.images?.[0]
  };
}
