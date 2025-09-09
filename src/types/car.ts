export interface Seller {
  name?: string; phone?: string; company?: string; location?: string;
}

export interface Car {
  id: string|number;
  model: string;                 // 모델명(=제목)
  makeYear?: number;             // 제조년
  importYear?: number;           // 수입년
  mileageKm?: number;            // 총거리
  fuel?: string; location?: string;
  priceMNT?: number;
  images?: string[];
  tier?: 'premium'|'plus'|'general';
  createdAt?: string|number;     // 최근 등록 정렬용(ISO 또는 epoch)
  tags?: string[]; options?: string[];
  seller?: Seller;
  memo?: string;                 // 판매자 메모
  
  // 호환성을 위한 추가 필드들 (옵션)
  brand?: string;
  subModel?: string;
  year?: number;
  price?: number;
  mileage?: number;
  city?: string;
  fuelType?: string;
  transmission?: string;
  driveType?: string;
  bodyType?: string;
  listingType?: string;
  isLiked?: boolean;
}

export type RawCar = any; // seed.json 매핑용
