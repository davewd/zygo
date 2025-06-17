// Credential types for providers, professionals, and community members

export type CredentialType = 
  | 'degree' 
  | 'certification' 
  | 'license' 
  | 'registration' 
  | 'fellowship' 
  | 'membership' 
  | 'training'
  | 'award'
  | 'qualification';

export type CredentialCategory = 
  | 'medical' 
  | 'nursing' 
  | 'allied-health' 
  | 'education' 
  | 'fitness' 
  | 'childcare' 
  | 'mental-health'
  | 'nutrition'
  | 'technology'
  | 'business'
  | 'safety'
  | 'regulatory';

export type VerificationStatus = 'verified' | 'pending' | 'expired' | 'invalid' | 'self-reported';

export interface CredentialProvider {
  id: string;
  name: string;
  abbreviation?: string;
  description: string;
  type: 'university' | 'college' | 'professional-body' | 'government' | 'training-organization' | 'employer' | 'certification-body';
  country: string;
  website?: string;
  logo?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  accreditation?: {
    accreditedBy: string;
    accreditationDate?: string;
    accreditationExpiry?: string;
  };
  verificationMethods: {
    online: boolean;
    manual: boolean;
    api: boolean;
    verificationUrl?: string;
  };
  isActive: boolean;
  establishedYear?: number;
  credentialsIssued: string[]; // Array of credential IDs they can issue
}

export interface CredentialDefinition {
  id: string;
  title: string;
  abbreviation?: string;
  description: string;
  type: CredentialType;
  category: CredentialCategory;
  issuingProviderId: string; // Reference to CredentialProvider
  level?: 'basic' | 'intermediate' | 'advanced' | 'expert';
  prerequisites?: string[]; // Array of credential IDs required before obtaining this one
  validityPeriod?: {
    years?: number;
    months?: number;
    requiresRenewal: boolean;
    renewalRequirements?: string[];
  };
  verificationRequired: boolean;
  recognizedIn: string[]; // Array of countries/regions where this credential is recognized
  equivalentCredentials?: string[]; // Array of equivalent credential IDs
  keywords: string[]; // For search and categorization
  isActive: boolean;
}

export interface PersonalCredential {
  id: string;
  credentialDefinitionId: string; // Reference to CredentialDefinition
  holderId: string; // ID of the person/provider who holds this credential
  holderType: 'service-provider' | 'community-member' | 'staff';
  
  // Issued details
  issueDate: string;
  issuingProviderId: string;
  certificateNumber?: string;
  grade?: string; // e.g., "Distinction", "Pass", "A+", etc.
  
  // Validity and verification
  expiryDate?: string;
  verificationStatus: VerificationStatus;
  verificationDate?: string;
  verifiedBy?: string; // System, admin, or third-party verifier
  verificationReference?: string; // External verification ID or URL
  
  // Additional metadata
  attachments?: {
    certificateUrl?: string;
    transcriptUrl?: string;
    verificationDocumentUrl?: string;
  };
  notes?: string;
  isPublic: boolean; // Whether this credential should be publicly visible
  isForProfessionalUse: boolean; // Whether this credential is used for professional purposes
  
  // Tracking
  createdDate: string;
  updatedDate: string;
  createdBy: string; // User ID who added this credential
}

export interface CredentialVerificationRequest {
  id: string;
  personalCredentialId: string;
  requestedBy: string; // User ID who requested verification
  requestDate: string;
  verificationMethod: 'automated' | 'manual' | 'third-party';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  result?: {
    verified: boolean;
    verificationDate: string;
    verifiedBy: string;
    notes?: string;
    confidence: 'high' | 'medium' | 'low';
  };
  estimatedCompletionDate?: string;
}

// Search and filtering interfaces
export interface CredentialSearchFilters {
  type?: CredentialType[];
  category?: CredentialCategory[];
  issuingProvider?: string[];
  level?: string[];
  country?: string[];
  verificationStatus?: VerificationStatus[];
  isActive?: boolean;
  hasExpiry?: boolean;
  isExpiredOrExpiring?: boolean; // Within next 6 months
}

export interface CredentialSearchResult {
  credential: PersonalCredential;
  definition: CredentialDefinition;
  provider: CredentialProvider;
  relevanceScore?: number;
}

// Aggregated credential information for profiles
export interface CredentialSummary {
  totalCredentials: number;
  verifiedCredentials: number;
  expiringCredentials: number; // Expiring within 6 months
  expiredCredentials: number;
  byCategory: Record<CredentialCategory, number>;
  byType: Record<CredentialType, number>;
  mostRecentCredential?: PersonalCredential;
  highestLevelCredentials: PersonalCredential[];
}

// For displaying credential information in UI
export interface CredentialDisplayInfo {
  title: string;
  abbreviation?: string;
  issuingProvider: string;
  issueYear?: number;
  expiryDate?: string;
  verificationStatus: VerificationStatus;
  category: CredentialCategory;
  type: CredentialType;
  isExpired: boolean;
  isExpiringSoon: boolean; // Within 6 months
  canRenew: boolean;
  displayBadge?: {
    color: string;
    icon?: string;
    text: string;
  };
}
