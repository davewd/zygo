import { CommunityProfile, CommunitySearchFilters, PrimaryConsumer } from '@zygo/types';
import { useCallback, useEffect, useState } from 'react';
import { primaryConsumers } from '../data/community/primaryConsumers';

export interface UseCommunityState {
  profiles: PrimaryConsumer[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export interface UseCommunityActions {
  searchProfiles: (filters: CommunitySearchFilters) => PrimaryConsumer[];
  getProfile: (id: string) => PrimaryConsumer | undefined;
  getProfileByHandle: (handle: string) => PrimaryConsumer | undefined;
  refresh: () => void;
}

export interface UseCommunityReturn extends UseCommunityState, UseCommunityActions {}

export const useCommunity = (): UseCommunityReturn => {
  const [profiles, setProfiles] = useState<PrimaryConsumer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProfiles(primaryConsumers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load community profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProfiles = useCallback((filters: CommunitySearchFilters): PrimaryConsumer[] => {
    let filteredProfiles = [...primaryConsumers];

    // Search by name, location, or interests
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.profile.displayName.toLowerCase().includes(searchLower) ||
        profile.profile.location?.toLowerCase().includes(searchLower) ||
        profile.profile.interests.some(interest => 
          interest.toLowerCase().includes(searchLower)
        )
      );
    }

    // Filter by role
    if (filters.role && filters.role.length > 0) {
      filteredProfiles = filteredProfiles.filter(profile =>
        filters.role!.includes(profile.role)
      );
    }

    // Filter by age group
    if (filters.ageGroup && filters.ageGroup.length > 0) {
      filteredProfiles = filteredProfiles.filter(profile =>
        filters.ageGroup!.includes(profile.ageGroup)
      );
    }

    // Filter by location
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.profile.location?.toLowerCase().includes(locationLower)
      );
    }

    // Filter by interests
    if (filters.interests && filters.interests.length > 0) {
      filteredProfiles = filteredProfiles.filter(profile =>
        filters.interests!.some(interest =>
          profile.profile.interests.some(profileInterest =>
            profileInterest.toLowerCase().includes(interest.toLowerCase())
          )
        )
      );
    }

    return filteredProfiles;
  }, []);

  const getProfile = useCallback((id: string): PrimaryConsumer | undefined => {
    return primaryConsumers.find(profile => profile.id === id);
  }, []);

  const getProfileByHandle = useCallback((handle: string): PrimaryConsumer | undefined => {
    return primaryConsumers.find(profile => profile.profile.handle === handle);
  }, []);

  const refresh = useCallback(() => {
    loadProfiles();
  }, [loadProfiles]);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return {
    profiles,
    loading,
    error,
    totalCount: profiles.length,
    searchProfiles,
    getProfile,
    getProfileByHandle,
    refresh,
  };
};

// Hook for individual profile management
export interface UseProfileState {
  profile: PrimaryConsumer | null;
  loading: boolean;
  error: string | null;
}

export interface UseProfileActions {
  updateProfile: (updates: Partial<CommunityProfile>) => Promise<void>;
  connectToProfile: (profileId: string) => Promise<void>;
  followProvider: (providerId: string) => Promise<void>;
}

export interface UseProfileReturn extends UseProfileState, UseProfileActions {}

export const useProfile = (profileId?: string): UseProfileReturn => {
  const [profile, setProfile] = useState<PrimaryConsumer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const foundProfile = primaryConsumers.find(p => p.id === id);
      setProfile(foundProfile || null);
      
      if (!foundProfile) {
        throw new Error('Profile not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<CommunityProfile>): Promise<void> => {
    if (!profile) return;

    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the profile locally (in a real app this would be handled by the backend)
      const updatedProfile = {
        ...profile,
        profile: {
          ...profile.profile,
          ...updates,
        },
      };
      
      setProfile(updatedProfile);
      
      // Update the global profiles array (in a real app this would be managed by state management)
      const profileIndex = primaryConsumers.findIndex(p => p.id === profile.id);
      if (profileIndex !== -1) {
        primaryConsumers[profileIndex] = updatedProfile;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  }, [profile]);

  const connectToProfile = useCallback(async (targetProfileId: string): Promise<void> => {
    if (!profile) return;

    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, this would create a connection request or direct connection
      console.log(`Connecting ${profile.id} to ${targetProfileId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to profile');
    } finally {
      setLoading(false);
    }
  }, [profile]);

  const followProvider = useCallback(async (providerId: string): Promise<void> => {
    if (!profile) return;

    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, this would add the provider to the user's followed providers list
      console.log(`${profile.id} following provider ${providerId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to follow provider');
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (profileId) {
      loadProfile(profileId);
    }
  }, [profileId, loadProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    connectToProfile,
    followProvider,
  };
};
