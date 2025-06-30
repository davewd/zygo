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

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  taxonomy: 'healthcare' | 'education' | 'support' | 'therapy' | 'wellness' | 'emergency' | 'activities' | 'recreation';
}

interface Service {
  id: string;
  name: string;
  description: string;
  ageGroups?: string[];
  duration?: number;
  price?: {
    amount: number;
    currency: string;
    rebate?: {
      provider: string;
      amount: number;
    };
  };
  tags?: string[];
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
  services?: Service[];
}

// Import providers data from our API data files
import providersData from './data/providers.json';
import serviceCentersData from './data/serviceCenters.json';

// Mock delay for API simulation
const API_DELAY = 300;

/**
 * Get all service providers
 */
export async function getAllServiceProviders(): Promise<ServiceProvider[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  return providersData.serviceProviders as ServiceProvider[];
}

/**
 * Get all service centers
 */
export async function getAllServiceCenters(): Promise<ServiceCenter[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  return serviceCentersData.serviceCenters as ServiceCenter[];
}

/**
 * Get a service provider by ID
 */
export async function getServiceProviderById(id: string): Promise<ServiceProvider | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const provider = providersData.serviceProviders.find(
    provider => provider.id === id
  ) as ServiceProvider | undefined;
  
  return provider || null;
}

/**
 * Get a service center by ID
 */
export async function getServiceCenterById(id: string): Promise<ServiceCenter | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const center = serviceCentersData.serviceCenters.find(
    center => center.id === id
  ) as ServiceCenter | undefined;
  
  return center || null;
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
