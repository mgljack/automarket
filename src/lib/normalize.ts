import { Car } from '@/types/car';

export function normalize(raw: any): Car {
  const images = raw.images ?? (raw.imageUrl ? [raw.imageUrl] : []);
  return {
    id: raw.id ?? raw._id ?? raw.slug,
    model: raw.model ?? raw.title ?? raw.name ?? '미상 모델',
    makeYear: raw.makeYear ?? raw.year,
    importYear: raw.importYear,
    mileageKm: raw.mileageKm ?? raw.mileage_km ?? raw.mileage,
    fuel: raw.fuel, location: raw.location,
    priceMNT: raw.priceMNT ?? raw.price ?? raw.price_mnt,
    images,
    tier: (raw.tier ?? raw.Tier ?? '').toLowerCase() || undefined,
    createdAt: raw.createdAt ?? raw.created_at ?? raw.listedAt ?? raw.date ?? Date.now(),
    tags: raw.tags ?? [], options: raw.options ?? raw.features ?? [],
    seller: raw.seller ?? { name: raw.sellerName, phone: raw.sellerPhone, company: raw.dealer, location: raw.location },
    memo: raw.memo ?? raw.note ?? raw.description ?? '',
    
    // 호환성을 위한 추가 필드 매핑
    brand: raw.brand,
    subModel: raw.subModel,
    year: raw.makeYear ?? raw.year,
    price: raw.priceMNT ?? raw.price ?? raw.price_mnt,
    mileage: raw.mileageKm ?? raw.mileage_km ?? raw.mileage,
    city: raw.location ?? raw.city,
    fuelType: raw.fuel ?? raw.fuelType,
    transmission: raw.transmission,
    driveType: raw.driveType,
    bodyType: raw.bodyType,
    listingType: raw.listingType ?? raw.tier,
    isLiked: raw.isLiked ?? false
  };
}
