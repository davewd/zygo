// Community API
// Functions for managing community profiles and primary consumers

// Type imports - importing directly from community types
import type {
    CommunityProfile,
    CommunitySearchFilters,
    PrimaryConsumer,
    UserRole
} from '@zygo/types/src/community';

// Import JSON data
import { isFilterMatch } from '../utils/dataValidation';
import communityData from './data/community.json';

export interface CommunityAPIResponse<T> {
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
 * Get all primary consumers
 */
export async function getAllPrimaryConsumers(): Promise<CommunityAPIResponse<PrimaryConsumer[]>> {
  await mockDelay();
  
  return {
    data: communityData.primaryConsumers as PrimaryConsumer[],
    total: communityData.primaryConsumers.length,
    metadata: communityData.metadata
  };
}

/**
 * Get primary consumer by ID
 */
export async function getPrimaryConsumerById(id: string): Promise<CommunityAPIResponse<PrimaryConsumer | null>> {
  await mockDelay();
  
  const consumer = communityData.primaryConsumers.find(c => c.id === id) as PrimaryConsumer | undefined;
  
  return {
    data: consumer || null,
    metadata: communityData.metadata
  };
}

/**
 * Get primary consumer by handle
 */
export async function getPrimaryConsumerByHandle(handle: string): Promise<CommunityAPIResponse<PrimaryConsumer | null>> {
  await mockDelay();
  
  const consumer = communityData.primaryConsumers.find(c => c.handle === handle) as PrimaryConsumer | undefined;
  
  return {
    data: consumer || null,
    metadata: communityData.metadata
  };
}

/**
 * Get consumers by role
 */
export async function getConsumersByRole(role: UserRole): Promise<CommunityAPIResponse<PrimaryConsumer[]>> {
  await mockDelay();
  
  const consumers = communityData.primaryConsumers.filter(c => c.role === role) as PrimaryConsumer[];
  
  return {
    data: consumers,
    total: consumers.length,
    metadata: communityData.metadata
  };
}

/**
 * Search primary consumers
 */
export async function searchPrimaryConsumers(
  query: string,
  options?: { limit?: number; page?: number }
): Promise<CommunityAPIResponse<PrimaryConsumer[]>> {
  await mockDelay();
  
  const { limit = 10, page = 1 } = options || {};
  const lowercaseQuery = query.toLowerCase();
  
  const allMatches = communityData.primaryConsumers.filter(consumer => 
    consumer.displayName.toLowerCase().includes(lowercaseQuery) ||
    consumer.handle.toLowerCase().includes(lowercaseQuery) ||
    (consumer.tagline && consumer.tagline.toLowerCase().includes(lowercaseQuery)) ||
    (consumer.bio && consumer.bio.toLowerCase().includes(lowercaseQuery))
  ) as PrimaryConsumer[];
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageData = allMatches.slice(startIndex, endIndex);
  
  return {
    data: pageData,
    total: allMatches.length,
    page,
    limit,
    hasMore: endIndex < allMatches.length,
    metadata: communityData.metadata
  };
}

/**
 * Generate community profiles with mock stats
 */
export async function getAllCommunityProfiles(): Promise<CommunityAPIResponse<CommunityProfile[]>> {
  await mockDelay();
  
  const profiles: CommunityProfile[] = communityData.primaryConsumers.map((consumer: any) => ({
    consumer: consumer as PrimaryConsumer,
    stats: {
      postsCount: Math.floor(Math.random() * 50) + 5,
      connectionsCount: Math.floor(Math.random() * 25) + 3,
      milestonesShared: consumer.role === 'child' ? Math.floor(Math.random() * 15) + 2 : Math.floor(Math.random() * 30) + 5,
      communitiesJoined: Math.floor(Math.random() * 8) + 1
    },
    recentActivity: {
      lastPostDate: consumer.lastActiveDate,
      lastMilestoneDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastCommunityInteraction: consumer.lastActiveDate
    },
    badges: consumer.role === 'grandparent' ? [
      {
        id: 'wisdom-keeper',
        name: 'Wisdom Keeper',
        description: 'Shares valuable parenting insights',
        earnedDate: '2024-06-01',
        icon: '🧠'
      }
    ] : consumer.role === 'parent' ? [
      {
        id: 'milestone-documenter',
        name: 'Milestone Documenter',
        description: 'Consistently tracks and shares developmental milestones',
        earnedDate: '2024-08-15',
        icon: '📸'
      }
    ] : []
  }));
  
  return {
    data: profiles,
    total: profiles.length,
    metadata: communityData.metadata
  };
}

/**
 * Get community profile by consumer ID
 */
export async function getCommunityProfileById(id: string): Promise<CommunityAPIResponse<CommunityProfile | null>> {
  await mockDelay();
  
  const allProfiles = await getAllCommunityProfiles();
  const profile = allProfiles.data.find(p => p.consumer.id === id);
  
  return {
    data: profile || null,
    metadata: communityData.metadata
  };
}

/**
 * Get community profile by handle
 */
export async function getCommunityProfileByHandle(handle: string): Promise<CommunityAPIResponse<CommunityProfile | null>> {
  await mockDelay();
  
  const allProfiles = await getAllCommunityProfiles();
  const profile = allProfiles.data.find(p => p.consumer.handle === handle);
  
  return {
    data: profile || null,
    metadata: communityData.metadata
  };
}

/**
 * Filter community profiles based on search criteria
 */
export async function filterCommunityProfiles(
  filters: CommunitySearchFilters,
  options?: { limit?: number; page?: number }
): Promise<CommunityAPIResponse<CommunityProfile[]>> {
  await mockDelay();
  
  const { limit = 10, page = 1 } = options || {};
  const allProfiles = await getAllCommunityProfiles();
  
  const filteredProfiles = allProfiles.data.filter((profile) => {
    const consumer = profile.consumer;

    // Privacy filter
    if (filters.privacyLevel && filters.privacyLevel.length > 0) {
      const allowedLevels = filters.privacyLevel as string[];
      if (!allowedLevels.includes(consumer.privacyLevel)) {
        return false;
      }
    }

    // Active filter
    if (filters.isActiveOnly && !consumer.isActive) {
      return false;
    }

    // Role filter
    if (!isFilterMatch(filters.roles, consumer.role)) {
      return false;
    }

    // Age group filter
    if (!isFilterMatch(filters.ageGroups, consumer.ageGroup)) {
      return false;
    }

    // Location filter
    if (filters.location?.state && consumer.location?.state !== filters.location.state) {
      return false;
    }

    // Provider connections filter
    if (filters.hasProviderConnections && (!consumer.followedProviders || consumer.followedProviders.length === 0)) {
      return false;
    }

    return true;
  });
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageData = filteredProfiles.slice(startIndex, endIndex);
  
  return {
    data: pageData,
    total: filteredProfiles.length,
    page,
    limit,
    hasMore: endIndex < filteredProfiles.length,
    metadata: communityData.metadata
  };
}

/**
 * Get family relationships for a consumer
 */
export async function getFamilyRelationships(consumerId: string): Promise<CommunityAPIResponse<PrimaryConsumer[]>> {
  await mockDelay();
  
  const consumer = communityData.primaryConsumers.find(c => c.id === consumerId);
  if (!consumer) {
    return {
      data: [],
      total: 0,
      metadata: communityData.metadata
    };
  }
  
  const relatedConsumerIds = consumer.familyRelationships.map(rel => rel.relatedUserId);
  const relatedConsumers = communityData.primaryConsumers.filter(c => 
    relatedConsumerIds.includes(c.id)
  ) as PrimaryConsumer[];
  
  return {
    data: relatedConsumers,
    total: relatedConsumers.length,
    metadata: communityData.metadata
  };
}

// Legacy exports for backwards compatibility (these will be deprecated)
export const PRIMARY_CONSUMERS = communityData.primaryConsumers as PrimaryConsumer[];

export const getConsumerById = async (id: string) => {
  const response = await getPrimaryConsumerById(id);
  return response.data;
};

export const getConsumerByHandle = async (handle: string) => {
  const response = await getPrimaryConsumerByHandle(handle);
  return response.data;
};

export const searchConsumers = async (query: string) => {
  const response = await searchPrimaryConsumers(query);
  return response.data;
};
