// Network types for service centers and providers

export interface Location {
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

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  socialMedia?: {
    platform: string;
    url: string;
  }[];
}

export interface Credential {
  title: string;
  abbreviation?: string;
  issuingBody: string;
  year?: number;
  verified: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  taxonomy: 'healthcare' | 'education' | 'support' | 'therapy' | 'wellness' | 'emergency' | 'activities' | 'recreation';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  duration?: number; // minutes
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

export interface ServiceProvider {
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

export interface ServiceCenter {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  location: Location;
  contact: ContactInfo;
  providers: ServiceProvider[];
  services: Service[];
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
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

export interface ServiceNetworkProvider {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  foundedYear?: number;
  headquarters: Location;
  contact: ContactInfo;
  brandColors?: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  logo?: string;
  website?: string;
  
  // Network-level information
  networkStats: {
    totalEducators?: number;
    totalCenters?: number;
    totalLocations?: number;
    countriesServed?: string[];
    familiesTrained?: number;
  };
  
  // Geographic coverage
  locations: {
    country: string;
    state?: string;
    region?: string;
    centerCount: number;
    educatorCount: number;
  }[];
  
  // Associated centers and providers
  centers: ServiceCenter[];
  providers: ServiceProvider[];
  
  // Network-wide features and certifications
  networkFeatures: string[];
  certifications?: string[];
  accreditations?: string[];
  partnerships?: string[];
  
  // Cultural and social information
  culturalConsiderations?: string;
  socialImpact?: string;
  awards?: {
    title: string;
    year: number;
    issuingBody: string;
  }[];
}

export interface NetworkConnection {
  type: 'provider' | 'center' | 'service' | 'network';
  id: string;
  relationshipType: 'primary' | 'secondary' | 'referral' | 'emergency';
  dateConnected: Date;
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
}
