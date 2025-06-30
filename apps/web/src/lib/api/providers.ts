// Service Providers API (Updated to use JSON data)
// Functions for managing service providers and centers

// Define API-specific interfaces that match our JSON structure
interface APIServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  profileImage?: string;
  headerBackgroundImage?: string;
  bio: string;
  personalStory?: string;
  credentials: {
    title: string;
    abbreviation?: string;
    issuingBody: string;
    year?: number;
    verified: boolean;
    credentialDefinitionId?: string;
    personalCredentialId?: string;
    expiryDate?: string;
    verificationReference?: string;
  }[];
  services: string[]; // Service IDs
  specializations: string[];
  languages: string[];
  yearsExperience: number;
  approach?: string;
  availability: {
    inPerson: boolean;
    telehealth: boolean;
    homeVisits: boolean;
    emergency: boolean;
  };
  pricing?: {
    consultationFee?: number;
    followUpFee?: number;
    currency: string;
  };
  centerId?: string;
}

interface APIServiceCenter {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  location: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    bookingUrl?: string;
    socialMedia?: {
      platform: string;
      url: string;
    }[];
  };
  providers: string[]; // Provider IDs
  services: string[]; // Service IDs
  operatingHours: {
    [key: string]: {
      open?: string;
      close?: string;
      closed?: boolean;
    };
  };
  features: string[];
  certifications?: string[];
  insurance?: string[];
  accessibility?: string[];
  images?: string[];
  establishedYear?: number;
  culturalConsiderations?: string;
}

interface APIService {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  duration?: number;
  price?: {
    amount: number;
    currency: string;
    rebate?: {
      provider: string;
      amount: number;
    };
  };
  ageGroups?: string[];
  tags?: string[];
}

// Import JSON data
import providersData from './data/serviceProviders.json';

export interface ProvidersAPIResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
  metadata?: {
    lastUpdated: string;
    dataSource: string;
  };
}

// Mock delay for realistic API behavior
const mockDelay = (ms: number = 100): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all service providers
 */
export async function getAllServiceProviders(): Promise<ProvidersAPIResponse<APIServiceProvider[]>> {
  await mockDelay();
  
  return {
    data: providersData.serviceProviders as APIServiceProvider[],
    total: providersData.serviceProviders.length,
    metadata: providersData.metadata
  };
}

/**
 * Get service provider by ID
 */
export async function getServiceProviderById(id: string): Promise<ProvidersAPIResponse<APIServiceProvider | null>> {
  await mockDelay();
  
  const provider = providersData.serviceProviders.find(p => p.id === id) as APIServiceProvider | undefined;
  
  return {
    data: provider || null,
    metadata: providersData.metadata
  };
}

/**
 * Get all service centers
 */
export async function getAllServiceCenters(): Promise<ProvidersAPIResponse<APIServiceCenter[]>> {
  await mockDelay();
  
  return {
    data: providersData.serviceCenters as APIServiceCenter[],
    total: providersData.serviceCenters.length,
    metadata: providersData.metadata
  };
}

/**
 * Get service center by ID
 */
export async function getServiceCenterById(id: string): Promise<ProvidersAPIResponse<APIServiceCenter | null>> {
  await mockDelay();
  
  const center = providersData.serviceCenters.find(c => c.id === id) as APIServiceCenter | undefined;
  
  return {
    data: center || null,
    metadata: providersData.metadata
  };
}

/**
 * Get all services
 */
export async function getAllServices(): Promise<ProvidersAPIResponse<APIService[]>> {
  await mockDelay();
  
  return {
    data: providersData.services as APIService[],
    total: providersData.services.length,
    metadata: providersData.metadata
  };
}

/**
 * Get service by ID
 */
export async function getServiceById(id: string): Promise<ProvidersAPIResponse<APIService | null>> {
  await mockDelay();
  
  const service = providersData.services.find(s => s.id === id) as APIService | undefined;
  
  return {
    data: service || null,
    metadata: providersData.metadata
  };
}

/**
 * Search service providers
 */
export async function searchServiceProviders(
  query: string,
  options?: { 
    specialty?: string;
    location?: string;
    limit?: number; 
    page?: number;
  }
): Promise<ProvidersAPIResponse<APIServiceProvider[]>> {
  await mockDelay();
  
  const { specialty, location, limit = 10, page = 1 } = options || {};
  const lowercaseQuery = query.toLowerCase();
  
  let filteredProviders = providersData.serviceProviders.filter(provider => 
    provider.firstName.toLowerCase().includes(lowercaseQuery) ||
    provider.lastName.toLowerCase().includes(lowercaseQuery) ||
    (provider.title && provider.title.toLowerCase().includes(lowercaseQuery)) ||
    provider.bio.toLowerCase().includes(lowercaseQuery) ||
    provider.specializations.some(spec => spec.toLowerCase().includes(lowercaseQuery))
  );
  
  // Apply specialty filter
  if (specialty && specialty !== 'All Specialties') {
    filteredProviders = filteredProviders.filter(provider =>
      provider.specializations.some(spec => 
        spec.toLowerCase().includes(specialty.toLowerCase())
      )
    );
  }
  
  // Apply location filter (basic implementation)
  if (location) {
    // Note: This would need to be enhanced with actual location data
    filteredProviders = filteredProviders.filter(provider => true); // Placeholder
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageData = filteredProviders.slice(startIndex, endIndex) as APIServiceProvider[];
  
  return {
    data: pageData,
    total: filteredProviders.length,
    page,
    limit,
    hasMore: endIndex < filteredProviders.length,
    metadata: providersData.metadata
  };
}

/**
 * Get providers by specialization
 */
export async function getProvidersBySpecialization(
  specialization: string,
  options?: { limit?: number; page?: number }
): Promise<ProvidersAPIResponse<APIServiceProvider[]>> {
  await mockDelay();
  
  const { limit = 10, page = 1 } = options || {};
  
  const matchingProviders = providersData.serviceProviders.filter(provider =>
    provider.specializations.some(spec => 
      spec.toLowerCase().includes(specialization.toLowerCase())
    )
  );
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageData = matchingProviders.slice(startIndex, endIndex) as APIServiceProvider[];
  
  return {
    data: pageData,
    total: matchingProviders.length,
    page,
    limit,
    hasMore: endIndex < matchingProviders.length,
    metadata: providersData.metadata
  };
}

/**
 * Get providers by center ID
 */
export async function getProvidersByCenterId(centerId: string): Promise<ProvidersAPIResponse<APIServiceProvider[]>> {
  await mockDelay();
  
  const providers = providersData.serviceProviders.filter(provider => 
    (provider as any).centerId === centerId
  ) as APIServiceProvider[];
  
  return {
    data: providers,
    total: providers.length,
    metadata: providersData.metadata
  };
}

/**
 * Get provider rating (mock implementation)
 */
export function getProviderRating(providerId: string): number {
  const ratings: Record<string, number> = {
    'rebecca-cavallaro': 4.9,
    'dr-justin-tucker': 4.8,
    'emily-mcconaghy': 4.7,
  };
  
  return ratings[providerId] || 4.5;
}

/**
 * Get provider review count (mock implementation)
 */
export function getProviderReviewCount(providerId: string): number {
  const reviewCounts: Record<string, number> = {
    'rebecca-cavallaro': 127,
    'dr-justin-tucker': 89,
    'emily-mcconaghy': 156,
  };
  
  return reviewCounts[providerId] || 25;
}

// Legacy exports for backwards compatibility (these will be deprecated)
export { getAllServiceProviders as getAllProviders, getServiceProviderById as getProviderById, searchServiceProviders as searchProviders };

