export type PropertyType =
  | 'HOUSE'
  | 'CONDO'
  | 'TOWNHOUSE'
  | 'VILLA'
  | 'PENTHOUSE'
  | 'ESTATE';

export type ListingStatus = 'FOR_SALE' | 'FOR_RENT' | 'PENDING' | 'SOLD';

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  licenseNumber: string;
  avatarUrl: string;
  bio: string;
  experienceYears: number;
}

export interface PropertyImage {
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface Property {
  id: string;
  mlsId: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  listingStatus: ListingStatus;
  price: number;
  rentalFrequency?: 'MONTHLY' | 'ANNUALLY';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSizeAcres?: number;
  yearBuilt: number;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  isFeatured: boolean;
  isExclusive: boolean;
  primaryImage: string;
  images: PropertyImage[];
  amenities: string[];
  mlsMetadata?: Record<string, any>;
  agent: Agent;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  propertyId?: string;
  agentId?: string;
  leadType: 'SCHEDULE_VIEWING' | 'INQUIRY' | 'VALUATION' | 'CONTACT';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED';
  createdAt: string;
}

export interface ValuationRequest {
  id: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  condition: 'EXCELLENT' | 'UPDATED' | 'ORIGINAL' | 'NEEDS_WORK';
  ownerName: string;
  email: string;
  phone: string;
  estimatedMinValue: number;
  estimatedMaxValue: number;
  createdAt: string;
}

export interface PropertyFilterParams {
  location?: string;
  propertyType?: string;
  listingStatus?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'sqft_desc';
}
