// Community and profile types for primary consumers

export type UserRole = 'grandparent' | 'parent' | 'child' | 'guardian' | 'caregiver';

export type AgeGroup = 'infant' | 'toddler' | 'preschool' | 'child' | 'adolescent' | 'adult' | 'senior';

export interface FamilyRelationship {
  id: string;
  relatedUserId: string;
  relationshipType: 'spouse' | 'partner' | 'child' | 'parent' | 'grandparent' | 'sibling' | 'guardian' | 'other';
  description?: string; // e.g., "maternal grandmother", "stepfather"
  isPrimary: boolean; // Primary caregiver relationship
  dateEstablished: string;
}

export interface FollowedProvider {
  providerId: string;
  providerName: string;
  providerTitle: string;
  centerName?: string;
  dateFollowed: string;
  tags: string[]; // Services they're interested in
  status: 'active' | 'past' | 'interested';
}

export interface PrimaryConsumer {
  id: string;
  handle: string;
  firstName: string;
  lastName?: string;
  displayName: string; // How they want to be shown in the community
  profileImage?: string;
  dateOfBirth: string;
  role: UserRole;
  ageGroup: AgeGroup;
  tagline?: string; // Brief bio/description
  bio?: string; // Longer description
  location?: {
    suburb?: string;
    state?: string;
    country?: string;
  };
  
  // Family relationships
  familyRelationships: FamilyRelationship[];
  
  // Service provider connections
  followedProviders: FollowedProvider[];
  
  // Community engagement
  isActive: boolean;
  joinedDate: string;
  lastActiveDate: string;
  privacyLevel: 'public' | 'family' | 'private'; // Who can see their profile
  
  // Children may have limited info
  hasLimitedProfile: boolean; // True for children under certain age
  parentalControls?: {
    parentId: string;
    restrictedFields: string[]; // Fields that require parental permission to view
  };
  
  // Additional metadata
  interests?: string[]; // General interests/topics they engage with
  preferredLanguages?: string[];
  accessibility?: {
    largeText: boolean;
    highContrast: boolean;
    screenReader: boolean;
  };
}

export interface CommunityProfile {
  consumer: PrimaryConsumer;
  stats: {
    postsCount: number;
    connectionsCount: number;
    milestonesShared: number;
    communitiesJoined: number;
  };
  recentActivity: {
    lastPostDate?: string;
    lastMilestoneDate?: string;
    lastCommunityInteraction?: string;
  };
  badges?: {
    id: string;
    name: string;
    description: string;
    earnedDate: string;
    icon: string;
  }[];
}

// For listing/search functionality
export interface PrimaryConsumerSummary {
  id: string;
  handle: string;
  displayName: string;
  profileImage?: string;
  role: UserRole;
  ageGroup: AgeGroup;
  tagline?: string;
  location?: {
    suburb?: string;
    state?: string;
  };
  isActive: boolean;
  privacyLevel: 'public' | 'family' | 'private';
  hasLimitedProfile: boolean;
}

export interface CommunitySearchFilters {
  roles?: UserRole[];
  ageGroups?: AgeGroup[];
  location?: {
    state?: string;
    suburb?: string;
  };
  hasProviderConnections?: boolean;
  isActiveOnly?: boolean;
  privacyLevel?: ('public' | 'family')[];
}

export interface CommunitySearchResult {
  consumers: PrimaryConsumerSummary[];
  totalCount: number;
  hasMore: boolean;
  filters: CommunitySearchFilters;
}
