export type ListingType = 'Premium' | 'Hot' | 'General';

export type FuelType = 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
export type TransmissionType = 'Manual' | 'Automatic' | 'CVT';
export type DriveType = 'FWD' | 'RWD' | 'AWD' | '4WD';
export type BodyType = 'Sedan' | 'Hatchback' | 'SUV' | 'Coupe' | 'Pickup' | 'Wagon';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  createdAt: Date;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  subModel: string;
  year: number;
  importYear: number;
  mileage: number;
  price: number;
  currency: 'USD' | 'MNT';
  city: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  driveType: DriveType;
  bodyType: BodyType;
  color: string;
  options: string[];
  description?: string;
  images: string[];
  seller: {
    id: string;
    name: string;
    phone: string;
  };
  listingType: ListingType;
  isLiked?: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: Date;
  category: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // days
  features: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
}
