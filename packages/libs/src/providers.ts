// Types
export interface ServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  profileImage?: string;
  bio: string;
  specializations: string[];
  yearsExperience: number;
  pricing?: {
    consultationFee?: number;
    currency: string;
  };
}

// Provider data will be injected from the consuming application
let providerDataSource: () => ServiceProvider[] = () => [];

/**
 * Set the provider data source for the library
 * This allows consuming applications to inject their own provider data
 * 
 * @example
 * ```typescript
 * import { setProviderDataSource } from '@zygo/libs';
 * import { getAllServiceProviders } from './data/providers';
 * 
 * // Initialize the library with your provider data
 * setProviderDataSource(getAllServiceProviders);
 * ```
 */
export function setProviderDataSource(dataSource: () => ServiceProvider[]): void {
  providerDataSource = dataSource;
}

export interface ProviderFilters {
  searchQuery?: string;
  specialty?: string;
  location?: string;
}

export interface ProviderRating {
  providerId: string;
  rating: number;
  reviewCount?: number;
}

/**
 * Get all service providers
 * Returns an empty array by default until a data source is set via setProviderDataSource()
 */
export function getAllProviders(): ServiceProvider[] {
  return providerDataSource();
}

/**
 * Get all available specialties from providers
 */
export function getAvailableSpecialties(): string[] {
  const providers = getAllProviders();
  const specialtiesSet = new Set<string>();
  
  providers.forEach(provider => {
    provider.specializations.forEach(spec => {
      specialtiesSet.add(spec);
    });
  });
  
  const specialties = Array.from(specialtiesSet).sort();
  return ['All Specialties', ...specialties];
}

/**
 * Get provider rating (mock data for now)
 * In a real app, this would fetch from a ratings service
 */
export function getProviderRating(providerId: string): number {
  const ratings: Record<string, number> = {
    'rebecca-cavallaro': 4.9,
    'dr-justin-tucker': 4.8,
    'andrea-dunne': 4.9,
    'polly-delaney': 4.8,
    'emily-mcconaghy': 4.7,
    'jake-thompson': 4.6,
    'steve-loeffler': 4.5,
    'lucy-wood': 4.7,
    'danielle-harmsen': 4.8,
    'sarah-mitchell': 4.6,
    'marcus-chen': 4.5,
    'emma-rodriguez': 4.7,
    'james-thompson': 4.8,
    'sofia-martinez': 4.6,
    'michael-oconnor': 4.5,
    'caroline-maternity-consultant': 4.9,
    'dr-shelley-rowlands': 4.8,
    'jessica-dawson-dietitian': 4.7,
    'peta-carige': 4.6,
    'sarah-digital-specialist': 4.5,
    'dr-alexandra-thompson': 4.9,
  };
  
  return ratings[providerId] || 4.5;
}

/**
 * Filter providers based on search criteria
 */
export function filterProviders(providers: ServiceProvider[], filters: ProviderFilters): ServiceProvider[] {
  return providers.filter((provider) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        provider.firstName.toLowerCase().includes(query) ||
        provider.lastName.toLowerCase().includes(query) ||
        (provider.title?.toLowerCase().includes(query) ?? false) ||
        provider.specializations.some((spec) =>
          spec.toLowerCase().includes(query)
        );
      
      if (!matchesSearch) return false;
    }

    // Specialty filter
    if (filters.specialty && filters.specialty !== '' && filters.specialty !== 'All Specialties') {
      const matchesSpecialty = provider.specializations.some((spec) =>
        spec.toLowerCase().includes(filters.specialty!.toLowerCase())
      );
      
      if (!matchesSpecialty) return false;
    }

    return true;
  });
}

/**
 * Search providers with text query and optional specialty filter
 */
export function searchProviders(searchQuery: string = '', specialty: string = ''): ServiceProvider[] {
  const allProviders = getAllProviders();
  return filterProviders(allProviders, { searchQuery, specialty });
}

/**
 * Get provider by ID
 */
export function getProviderById(id: string): ServiceProvider | undefined {
  const providers = getAllProviders();
  return providers.find(provider => provider.id === id);
}

/**
 * Get providers by specialty
 */
export function getProvidersBySpecialty(specialty: string): ServiceProvider[] {
  const allProviders = getAllProviders();
  
  if (!specialty || specialty === 'All Specialties') {
    return allProviders;
  }
  
  return allProviders.filter(provider =>
    provider.specializations.some(spec =>
      spec.toLowerCase().includes(specialty.toLowerCase())
    )
  );
}

/**
 * Get provider location (mock data for now)
 * In a real app, this would come from the provider's service center data
 */
export function getProviderLocation(providerId: string): string {
  // This is mock data - in reality, this would come from the service center location
  // or the provider's individual location settings
  return 'Sydney, NSW'; // Default location for demo
}
