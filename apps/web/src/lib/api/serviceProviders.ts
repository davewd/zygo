// Local type definitions for service providers and centers

interface Location {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  socialMedia?: {
    platform: string;
    url: string;
  }[];
}

interface Credential {
  title: string;
  abbreviation?: string;
  issuingBody: string;
  year?: number;
  verified: boolean;
  credentialDefinitionId?: string;
  personalCredentialId?: string;
  expiryDate?: string;
  verificationReference?: string;
}

interface ServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  profileImage?: string;
  headerBackgroundImage?: string;
  bio: string;
  personalStory?: string;
  credentials: Credential[];
  services: string[]; // Array of service IDs
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
  centerId?: string; // ID of the service center this provider belongs to
}

// Local interface for services embedded in service centers (different structure)
interface ServiceCenterService {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
    taxonomy: string;
  };
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

interface ServiceCenter {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  location: Location;
  contact: ContactInfo;
  providers: string[]; // Array of provider IDs
  operatingHours?: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  services?: ServiceCenterService[];
}

// Import providers data from our API data files
import serviceCentersData from './data/serviceCenters.json';
import providersData from './data/serviceProviders.json';
// Import service center functions
import { getServiceCenterById } from './serviceCenters';

// Mock delay for API simulation
const API_DELAY = 300;

/**
 * Enhanced ServiceProvider interface with joined service center data
 */
export interface ServiceProviderWithCenter extends ServiceProvider {
  serviceCenter?: ServiceCenter;
}

/**
 * Get all service providers with optional service center data joined
 */
export async function getAllServiceProviders(includeServiceCenter: boolean = false): Promise<ServiceProvider[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const providers = providersData.serviceProviders as ServiceProvider[];
  
  if (!includeServiceCenter) {
    return providers;
  }
  
  // Join with service center data
  return providers.map(provider => ({
    ...provider,
    serviceCenter: provider.centerId 
      ? serviceCentersData.serviceCenters.find(center => center.id === provider.centerId) as ServiceCenter
      : undefined
  })) as ServiceProviderWithCenter[];
}

/**
 * Get a service provider by ID with optional service center data
 */
export async function getServiceProviderById(
  id: string, 
  includeServiceCenter: boolean = false
): Promise<ServiceProvider | ServiceProviderWithCenter | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const provider = providersData.serviceProviders.find(
    provider => provider.id === id
  ) as ServiceProvider | undefined;
  
  if (!provider) {
    return null;
  }
  
  if (!includeServiceCenter) {
    return provider;
  }
  
  // Join with service center data
  const serviceCenter = provider.centerId 
    ? serviceCentersData.serviceCenters.find(center => center.id === provider.centerId)
    : undefined;
    
  return {
    ...provider,
    serviceCenter: serviceCenter as ServiceCenter
  } as ServiceProviderWithCenter;
}

/**
 * Get providers by service center ID
 */
export async function getProvidersByServiceCenter(centerId: string): Promise<ServiceProvider[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  return providersData.serviceProviders.filter(
    provider => provider.centerId === centerId
  ) as ServiceProvider[];
}

/**
 * Get the center that a provider belongs to
 */
export function getCenterForProvider(providerId: string): ServiceCenter | undefined {
  // Find the provider first to get their centerId
  const provider = providersData.serviceProviders.find(p => p.id === providerId);
  if (!provider || !provider.centerId) {
    return undefined;
  }
  
  // Find the center by ID
  const allCenters = serviceCentersData.serviceCenters as ServiceCenter[];
  return allCenters.find((center) => center.id === provider.centerId);
}

/**
 * Get all providers for a specific center
 */
export async function getProvidersForCenter(centerId: string): Promise<ServiceProvider[]> {
  const center = await getServiceCenterById(centerId);
  if (!center) return [];
  
  // Get all providers and filter by centerId
  const allProviders = await getAllServiceProviders();
  return allProviders.filter(provider => 
    provider.centerId === centerId
  );
}

/**
 * Search providers by various criteria
 */
export interface ProviderSearchFilters {
  name?: string;
  specializations?: string[];
  location?: {
    suburb?: string;
    state?: string;
  };
  serviceType?: string;
}

export async function searchServiceProviders(filters: ProviderSearchFilters): Promise<ServiceProvider[]> {
  const allProviders = await getAllServiceProviders();
  
  return allProviders.filter((provider) => {
    // Filter by name
    if (filters.name) {
      const fullName = `${provider.firstName} ${provider.lastName}`.toLowerCase();
      if (!fullName.includes(filters.name.toLowerCase())) {
        return false;
      }
    }

    // Filter by specializations
    if (filters.specializations && filters.specializations.length > 0) {
      const hasMatchingSpecialization = filters.specializations.some((spec) =>
        provider.specializations.some((providerSpec) =>
          providerSpec.toLowerCase().includes(spec.toLowerCase())
        )
      );
      if (!hasMatchingSpecialization) {
        return false;
      }
    }

    // Filter by location
    if (filters.location) {
      const center = getCenterForProvider(provider.id);
      if (!center) return false;
      
      if (filters.location.suburb && 
          !center.location.suburb.toLowerCase().includes(filters.location.suburb.toLowerCase())) {
        return false;
      }
      
      if (filters.location.state && 
          center.location.state !== filters.location.state) {
        return false;
      }
    }

    return true;
  });
}
