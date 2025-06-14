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
  taxonomy: 'healthcare' | 'education' | 'support' | 'therapy' | 'wellness' | 'emergency';
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
  ageGroups?: ('prenatal' | 'newborn' | 'infant' | 'toddler' | 'child' | 'adolescent' | 'adult')[];
  tags?: string[];
}

export interface ServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  profileImage?: string;
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

export interface NetworkConnection {
  type: 'provider' | 'center' | 'service';
  id: string;
  relationshipType: 'primary' | 'secondary' | 'referral' | 'emergency';
  dateConnected: Date;
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
}
