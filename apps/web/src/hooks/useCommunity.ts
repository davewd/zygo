import { 
  CommunityProfile, 
  CommunitySearchFilters, 
  PrimaryConsumer 
} from '@zygo/types/src/community';
import { useCallback, useEffect, useState } from 'react';
import { 
  getAllPrimaryConsumers, 
  filterCommunityProfiles,
  getCommunityProfileById,
  getCommunityProfileByHandle,
  searchPrimaryConsumers
} from '../lib/api/community';

export interface UseCommunityState {
  profiles: PrimaryConsumer[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export interface UseCommunityActions {
  searchProfiles: (filters: CommunitySearchFilters) => Promise<PrimaryConsumer[]>;
  getProfile: (id: string) => Promise<PrimaryConsumer | null>;
  getProfileByHandle: (handle: string) => Promise<PrimaryConsumer | null>;
  refresh: () => Promise<void>;
}

export interface UseCommunityReturn extends UseCommunityState, UseCommunityActions {}

export const useCommunity = (): UseCommunityReturn => {
  const [profiles, setProfiles] = useState<PrimaryConsumer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllPrimaryConsumers();
      setProfiles(response.data);
      setTotalCount(response.total || response.data.length);
    } catch (err) {
      console.error('Failed to load community profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load community profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProfiles = useCallback(async (filters: CommunitySearchFilters): Promise<PrimaryConsumer[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await filterCommunityProfiles(filters);
      return response.data.map(profile => profile.consumer);
    } catch (err) {
      console.error('Failed to search community profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to search community profiles');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getProfile = useCallback(async (id: string): Promise<PrimaryConsumer | null> => {
    try {
      setError(null);
      
      const response = await getCommunityProfileById(id);
      return response.data?.consumer || null;
    } catch (err) {
      console.error('Failed to get community profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to get community profile');
      return null;
    }
  }, []);

  const getProfileByHandle = useCallback(async (handle: string): Promise<PrimaryConsumer | null> => {
    try {
      setError(null);
      
      const response = await getCommunityProfileByHandle(handle);
      return response.data?.consumer || null;
    } catch (err) {
      console.error('Failed to get community profile by handle:', err);
      setError(err instanceof Error ? err.message : 'Failed to get community profile');
      return null;
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadProfiles();
  }, [loadProfiles]);

  // Load profiles on mount
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return {
    // State
    profiles,
    loading,
    error,
    totalCount,
    
    // Actions
    searchProfiles,
    getProfile,
    getProfileByHandle,
    refresh
  };
};

// Additional convenience hooks

export const useCommunityProfile = (id: string | undefined) => {
  const [profile, setProfile] = useState<PrimaryConsumer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProfile(null);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getCommunityProfileById(id);
        setProfile(response.data?.consumer || null);
      } catch (err) {
        console.error('Failed to load community profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load community profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  return { profile, loading, error };
};

export const useCommunitySearch = () => {
  const [results, setResults] = useState<PrimaryConsumer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (filters: CommunitySearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await filterCommunityProfiles(filters);
      setResults(response.data.map(profile => profile.consumer));
    } catch (err) {
      console.error('Failed to search community profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to search community profiles');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    reset
  };
};
