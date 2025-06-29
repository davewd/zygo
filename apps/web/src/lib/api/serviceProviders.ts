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
  category: ServiceCategory;
  duration?: number;
  price?: {
    amount: number;
    currency: string;
    rebate?: {
      provider: string;
      amount: number;
    };
  };
  ageGroups?: ('prenatal' | 'newborn' | 'infant' | 'toddler' | 'preschool' | 'child' | 'adolescent' | 'adult')[];
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
  services: Service[];
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
}

interface ServiceCenter {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  location: Location;
  contact: ContactInfo;
  providers: ServiceProvider[];
}

// Import all the hardcoded data from data/network files
import {
  ACTIVE8_CENTER,
  EMILY_MCCONAGHY,
  JAKE_THOMPSON,
} from '../../data/network/active8KidsCenter';
import {
  ELIXR_SWIM_SCHOOL_CENTER,
  EMMA_RODRIGUEZ,
  MARCUS_CHEN,
  SARAH_MITCHELL,
} from '../../data/network/elixrSwimSchoolCenter';
import { DR_SHELLEY_ROWLANDS, EMOG_CENTER } from '../../data/network/emogCenter';
import { FULL_CIRCLE_CENTER, REBECCA_CAVALLARO } from '../../data/network/fullCircleCenter';
import {
  GAVIN_MCCORMACK,
  GAVIN_MCCORMACK_CENTER
} from '../../data/network/gavinMccormackCenter';
import {
  JAMES_THOMPSON,
  KICKEROOS_SOCCER_CENTER,
  MICHAEL_OCONNOR,
  SOFIA_MARTINEZ,
} from '../../data/network/kickeroosSoccerCenter';
import {
  JESSICA_DAWSON_DIETITIAN,
  KIDNEY_NUTRITION_CENTER,
} from '../../data/network/kidneyNutritionCenter';
import {
  CAROLINE_MATERNITY_CONSULTANT,
  MUMMYS_WHISPERS_CENTER,
} from '../../data/network/mummysWhispersCenter';
import {
  ANDREA_DUNNE,
  DR_JUSTIN_TUCKER,
  POLLY_DELANEY,
  PROLOGUE_CENTER,
} from '../../data/network/prologueCenter';
import { PETA_CARIGE, START_TRAINING_CENTER } from '../../data/network/startTrainingCenter';
import {
  MICHAEL_CHEN_MUSIC,
  REBECCA_THOMPSON_OUTDOOR,
  SARAH_MITCHELL_DIRECTOR,
  ST_MARYS_CHILDCARE_CENTER,
} from '../../data/network/stMarysChildcareCenter';
import {
  DANIELLE_HARMSEN,
  LUCY_WOOD,
  STEVE_LOEFFLER,
  WHITE_CITY_TENNIS_CENTER,
} from '../../data/network/whiteCityTennisCenter';
import {
  DR_ALEXANDRA_THOMPSON,
  SARAH_DIGITAL_SPECIALIST,
  ZYGO_APP_CENTER,
} from '../../data/network/zygoAppCenter';

// Consolidated arrays of all providers and centers
const ALL_PROVIDERS: ServiceProvider[] = [
  REBECCA_CAVALLARO,
  DR_JUSTIN_TUCKER,
  ANDREA_DUNNE,
  POLLY_DELANEY,
  EMILY_MCCONAGHY,
  JAKE_THOMPSON,
  STEVE_LOEFFLER,
  LUCY_WOOD,
  DANIELLE_HARMSEN,
  SARAH_MITCHELL,
  MARCUS_CHEN,
  EMMA_RODRIGUEZ,
  JAMES_THOMPSON,
  SOFIA_MARTINEZ,
  MICHAEL_OCONNOR,
  SARAH_MITCHELL_DIRECTOR,
  REBECCA_THOMPSON_OUTDOOR,
  MICHAEL_CHEN_MUSIC,
  CAROLINE_MATERNITY_CONSULTANT,
  DR_SHELLEY_ROWLANDS,
  JESSICA_DAWSON_DIETITIAN,
  PETA_CARIGE,
  SARAH_DIGITAL_SPECIALIST,
  DR_ALEXANDRA_THOMPSON,
  GAVIN_MCCORMACK,
];

const ALL_CENTERS: ServiceCenter[] = [
  FULL_CIRCLE_CENTER,
  PROLOGUE_CENTER,
  ACTIVE8_CENTER,
  WHITE_CITY_TENNIS_CENTER,
  ELIXR_SWIM_SCHOOL_CENTER,
  KICKEROOS_SOCCER_CENTER,
  ST_MARYS_CHILDCARE_CENTER,
  MUMMYS_WHISPERS_CENTER,
  EMOG_CENTER,
  KIDNEY_NUTRITION_CENTER,
  START_TRAINING_CENTER,
  ZYGO_APP_CENTER,
  GAVIN_MCCORMACK_CENTER,
];

/**
 * Get all service providers
 */
export function getAllServiceProviders(): ServiceProvider[] {
  return ALL_PROVIDERS;
}

/**
 * Get all service centers
 */
export function getAllServiceCenters(): ServiceCenter[] {
  return ALL_CENTERS;
}

/**
 * Get a service provider by ID
 */
export function getServiceProviderById(id: string): ServiceProvider | undefined {
  return ALL_PROVIDERS.find((provider) => provider.id === id);
}

/**
 * Get a service center by ID
 */
export function getServiceCenterById(id: string): ServiceCenter | undefined {
  return ALL_CENTERS.find((center) => center.id === id);
}

/**
 * Get the center that a provider belongs to
 */
export function getCenterForProvider(providerId: string): ServiceCenter | undefined {
  return ALL_CENTERS.find((center) =>
    center.providers.some((provider) => provider.id === providerId)
  );
}

/**
 * Get all providers for a specific center
 */
export function getProvidersForCenter(centerId: string): ServiceProvider[] {
  const center = getServiceCenterById(centerId);
  if (!center) return [];
  
  return center.providers.map((provider) => 
    getServiceProviderById(provider.id)
  ).filter((provider): provider is ServiceProvider => provider !== undefined);
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

export function searchServiceProviders(filters: ProviderSearchFilters): ServiceProvider[] {
  return ALL_PROVIDERS.filter((provider) => {
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
