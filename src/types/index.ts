export type PropertyType =
  | 'DETACHED_DUPLEX'
  | 'SEMI_DETACHED'
  | 'TERRACE'
  | 'PENTHOUSE'
  | 'MANSION'
  | 'MAISONETTE'
  | 'APARTMENT';

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
  price: number; // in Naira (NGN)
  rentalFrequency?: 'MONTHLY' | 'ANNUALLY';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSizeAcres?: number;
  yearBuilt: number;
  address: string;
  city: string; // e.g. Ikoyi, Lekki Phase 1, Victoria Island, Maitama
  state: string; // e.g. Lagos, Abuja FCT, Rivers
  postalCode?: string;
  country: string; // Nigeria
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

export type RequestIntent = 'BUY' | 'SELL';

export interface ClientRequest {
  id: string;
  requestIntent: RequestIntent; // BUY or SELL
  propertyType: string; // e.g. 5-Bedroom Fully Detached Duplex
  targetLocation: string; // e.g. Ikoyi, Lekki Phase 1, Banana Island, Maitama
  budgetMin?: number; // in Naira
  budgetMax?: number; // in Naira
  sellingPrice?: number; // in Naira (if selling)
  bedrooms?: number;
  bathrooms?: number;
  additionalNotes?: string;
  clientName: string;
  email: string;
  phone: string;
  preferredTimeline?: string; // e.g. Immediate, 1-3 Months, Exploring
  status: 'NEW' | 'REVIEWING' | 'MATCHED' | 'CLOSED';
  createdAt: string;
}

export interface ValuationRequest {
  id: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  propertyType: PropertyType | string;
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
