import { Car, NewsItem, PaymentPlan, ListingType } from './types';

export const BRANDS = [
  'Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
  'Subaru', 'Mitsubishi', 'Suzuki', 'BMW', 'Mercedes-Benz', 
  'Audi', 'Volkswagen', 'Ford', 'Chevrolet', 'Lexus'
];

export const MODELS = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'X-Trail'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent'],
  'Kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Rio'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X1'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
  'Ford': ['Focus', 'Fusion', 'Escape', 'Explorer', 'F-150'],
  'Chevrolet': ['Cruze', 'Malibu', 'Equinox', 'Traverse', 'Silverado'],
  'Lexus': ['ES', 'IS', 'RX', 'GX', 'NX']
};

export const CITIES = [
  'Ulaanbaatar', 'Darkhan', 'Erdenet', 'Choibalsan', 'Mörön', 
  'Bayankhongor', 'Ölgii', 'Khovd', 'Ulaangom', 'Sainshand'
];

export const CARS: Car[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    subModel: 'LE',
    year: 2020,
    importYear: 2021,
    mileage: 45000,
    price: 18500,
    currency: 'USD',
    city: 'Ulaanbaatar',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'FWD',
    bodyType: 'Sedan',
    color: 'White',
    options: ['Air Conditioning', 'Power Windows', 'Bluetooth', 'Backup Camera'],
    description: 'Well maintained Toyota Camry with low mileage. Single owner, no accidents.',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller1',
      name: 'Batbold',
      phone: '+976-99112233'
    },
    listingType: 'Premium',
    createdAt: new Date('2024-01-15'),
    expiresAt: new Date('2024-01-20')
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'CR-V',
    subModel: 'EX',
    year: 2019,
    importYear: 2020,
    mileage: 62000,
    price: 22500,
    currency: 'USD',
    city: 'Darkhan',
    fuelType: 'Gasoline',
    transmission: 'CVT',
    driveType: 'AWD',
    bodyType: 'SUV',
    color: 'Black',
    options: ['Leather Seats', 'Sunroof', 'Navigation', 'Heated Seats', 'Remote Start'],
    description: 'Excellent condition Honda CR-V with all-wheel drive. Perfect for Mongolian roads.',
    images: [
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller2',
      name: 'Sukhbat',
      phone: '+976-99223344'
    },
    listingType: 'Hot',
    createdAt: new Date('2024-01-14'),
    expiresAt: new Date('2024-01-24')
  },
  {
    id: '3',
    brand: 'BMW',
    model: '3 Series',
    subModel: '320i',
    year: 2018,
    importYear: 2019,
    mileage: 78000,
    price: 28500,
    currency: 'USD',
    city: 'Ulaanbaatar',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'RWD',
    bodyType: 'Sedan',
    color: 'Blue',
    options: ['Premium Sound', 'Sport Package', 'LED Headlights', 'Keyless Entry'],
    description: 'Luxury BMW 3 Series in excellent condition. Regular maintenance records available.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller3',
      name: 'Enkhjin',
      phone: '+976-99334455'
    },
    listingType: 'General',
    createdAt: new Date('2024-01-13'),
    expiresAt: new Date('2024-01-28')
  },
  {
    id: '4',
    brand: 'Toyota',
    model: 'Prius',
    subModel: 'LE',
    year: 2021,
    importYear: 2022,
    mileage: 32000,
    price: 24500,
    currency: 'USD',
    city: 'Erdenet',
    fuelType: 'Hybrid',
    transmission: 'CVT',
    driveType: 'FWD',
    bodyType: 'Hatchback',
    color: 'Silver',
    options: ['Hybrid System', 'Eco Mode', 'Touchscreen', 'Lane Assist'],
    description: 'Fuel-efficient Toyota Prius hybrid. Great for city driving in Ulaanbaatar.',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller4',
      name: 'Tseren',
      phone: '+976-99445566'
    },
    listingType: 'Premium',
    createdAt: new Date('2024-01-12'),
    expiresAt: new Date('2024-01-17')
  },
  {
    id: '5',
    brand: 'Nissan',
    model: 'X-Trail',
    subModel: 'SV',
    year: 2020,
    importYear: 2021,
    mileage: 55000,
    price: 19500,
    currency: 'USD',
    city: 'Choibalsan',
    fuelType: 'Gasoline',
    transmission: 'CVT',
    driveType: 'AWD',
    bodyType: 'SUV',
    color: 'Red',
    options: ['Third Row Seating', 'Roof Rails', 'Fog Lights', 'Alloy Wheels'],
    description: 'Spacious Nissan X-Trail perfect for families. 7-seater configuration.',
    images: [
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller5',
      name: 'Bold',
      phone: '+976-99556677'
    },
    listingType: 'Hot',
    createdAt: new Date('2024-01-11'),
    expiresAt: new Date('2024-01-21')
  },
  {
    id: '6',
    brand: 'Hyundai',
    model: 'Tucson',
    subModel: 'SE',
    year: 2019,
    importYear: 2020,
    mileage: 67000,
    price: 17500,
    currency: 'USD',
    city: 'Mörön',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'FWD',
    bodyType: 'SUV',
    color: 'Gray',
    options: ['Apple CarPlay', 'Android Auto', 'Blind Spot Monitor', 'Rear Cross Traffic Alert'],
    description: 'Reliable Hyundai Tucson with modern features. Well maintained.',
    images: [
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller6',
      name: 'Oyunaa',
      phone: '+976-99667788'
    },
    listingType: 'General',
    createdAt: new Date('2024-01-10'),
    expiresAt: new Date('2024-01-25')
  },
  {
    id: '7',
    brand: 'Mazda',
    model: 'CX-5',
    subModel: 'Touring',
    year: 2020,
    importYear: 2021,
    mileage: 48000,
    price: 21500,
    currency: 'USD',
    city: 'Ulaanbaatar',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'AWD',
    bodyType: 'SUV',
    color: 'White',
    options: ['Bose Sound System', 'Heated Front Seats', 'Power Liftgate', 'Mazda Connect'],
    description: 'Sporty Mazda CX-5 with excellent handling. Perfect for Mongolian terrain.',
    images: [
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller7',
      name: 'Ganbold',
      phone: '+976-99778899'
    },
    listingType: 'Premium',
    createdAt: new Date('2024-01-09'),
    expiresAt: new Date('2024-01-14')
  },
  {
    id: '8',
    brand: 'Ford',
    model: 'F-150',
    subModel: 'XLT',
    year: 2018,
    importYear: 2019,
    mileage: 85000,
    price: 26500,
    currency: 'USD',
    city: 'Bayankhongor',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: '4WD',
    bodyType: 'Pickup',
    color: 'Black',
    options: ['Towing Package', 'Bed Liner', 'Running Boards', 'Trailer Brake Controller'],
    description: 'Powerful Ford F-150 pickup truck. Ideal for work and off-road adventures.',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller8',
      name: 'Batbayar',
      phone: '+976-99889900'
    },
    listingType: 'Hot',
    createdAt: new Date('2024-01-08'),
    expiresAt: new Date('2024-01-18')
  },
  {
    id: '9',
    brand: 'Honda',
    model: 'Civic',
    subModel: 'EX',
    year: 2021,
    importYear: 2022,
    mileage: 28000,
    price: 19500,
    currency: 'USD',
    city: 'Ölgii',
    fuelType: 'Gasoline',
    transmission: 'CVT',
    driveType: 'FWD',
    bodyType: 'Sedan',
    color: 'Blue',
    options: ['Honda Sensing', 'Lane Keep Assist', 'Adaptive Cruise Control', 'Collision Mitigation'],
    description: 'Modern Honda Civic with advanced safety features. Low mileage.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller9',
      name: 'Narantuya',
      phone: '+976-99990011'
    },
    listingType: 'General',
    createdAt: new Date('2024-01-07'),
    expiresAt: new Date('2024-01-22')
  },
  {
    id: '10',
    brand: 'Audi',
    model: 'Q5',
    subModel: 'Premium',
    year: 2019,
    importYear: 2020,
    mileage: 72000,
    price: 32500,
    currency: 'USD',
    city: 'Ulaanbaatar',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'AWD',
    bodyType: 'SUV',
    color: 'Silver',
    options: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Panoramic Sunroof', 'Audi Connect'],
    description: 'Luxury Audi Q5 with premium features. Well maintained with service records.',
    images: [
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller10',
      name: 'Tugsuu',
      phone: '+976-99001122'
    },
    listingType: 'Premium',
    createdAt: new Date('2024-01-06'),
    expiresAt: new Date('2024-01-11')
  },
  {
    id: '11',
    brand: 'Kia',
    model: 'Sportage',
    subModel: 'EX',
    year: 2020,
    importYear: 2021,
    mileage: 41000,
    price: 18500,
    currency: 'USD',
    city: 'Khovd',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'AWD',
    bodyType: 'SUV',
    color: 'White',
    options: ['UVO eServices', 'Wireless Charging', 'Smart Power Liftgate', 'Harman Kardon Audio'],
    description: 'Feature-rich Kia Sportage with excellent warranty remaining.',
    images: [
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller11',
      name: 'Munkhbat',
      phone: '+976-99112233'
    },
    listingType: 'Hot',
    createdAt: new Date('2024-01-05'),
    expiresAt: new Date('2024-01-15')
  },
  {
    id: '12',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    subModel: 'C300',
    year: 2018,
    importYear: 2019,
    mileage: 65000,
    price: 28500,
    currency: 'USD',
    city: 'Ulaangom',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    driveType: 'RWD',
    bodyType: 'Sedan',
    color: 'Black',
    options: ['MBUX Infotainment', 'Burmester Sound', 'Ambient Lighting', 'Keyless Go'],
    description: 'Elegant Mercedes-Benz C-Class with luxury features. Single owner.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop&crop=center'
    ],
    seller: {
      id: 'seller12',
      name: 'Zolboo',
      phone: '+976-99223344'
    },
    listingType: 'General',
    createdAt: new Date('2024-01-04'),
    expiresAt: new Date('2024-01-19')
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: '2024년 몽골 자동차 시장 동향',
    excerpt: '올해 몽골 자동차 시장의 주요 트렌드와 전망을 살펴봅니다.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop&crop=center',
    publishedAt: new Date('2024-01-15'),
    category: '시장동향'
  },
  {
    id: '2',
    title: '중고차 구매 시 주의사항',
    excerpt: '안전하고 합리적인 중고차 구매를 위한 필수 체크리스트입니다.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&crop=center',
    publishedAt: new Date('2024-01-12'),
    category: '구매가이드'
  },
  {
    id: '3',
    title: '자동차 보험 가이드',
    excerpt: '몽골에서 자동차 보험 가입 시 알아야 할 모든 것들입니다.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&crop=center',
    publishedAt: new Date('2024-01-10'),
    category: '보험정보'
  }
];

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'premium',
    name: 'Premium',
    price: 8000,
    duration: 5,
    features: ['최상단 노출', '프리미엄 배지', '우선 검색 결과', '24시간 고객지원']
  },
  {
    id: 'hot',
    name: 'Hot',
    price: 5000,
    duration: 10,
    features: ['상단 노출', 'Hot 배지', '우선 검색 결과', '12시간 고객지원']
  },
  {
    id: 'general',
    name: 'General',
    price: 0,
    duration: 15,
    features: ['기본 노출', '일반 검색 결과', '기본 고객지원']
  }
];
