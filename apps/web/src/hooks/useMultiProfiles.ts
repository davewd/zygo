import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { useCallback, useState, useEffect } from 'react';
import {
    apiSwitchProfileById,
    extractUserHandle,
    getUserProfiles,
    isMultiProfileUser,
    toggleUserProfiles
} from '../lib/api/users';

export interface UseMultiProfilesReturn {
  isLoading: boolean;
  error: string | null;
  availableProfiles: CurrentUser[];
  isMultiProfile: boolean;
  switchToProfile: (userId: string) => Promise<CurrentUser | null>;
  toggleProfile: (currentUser: CurrentUser) => Promise<CurrentUser | null>;
  clearError: () => void;
}

/**
 * Hook for managing multi-profile switching for any user
 */
export function useMultiProfiles(currentUserId: string): UseMultiProfilesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableProfiles, setAvailableProfiles] = useState<CurrentUser[]>([]);
  const [isMultiProfile, setIsMultiProfile] = useState(false);

  // Load available profiles on mount or when currentUserId changes
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const userHandle = extractUserHandle(currentUserId);
        const profiles = await getUserProfiles(userHandle);
        const isMulti = await isMultiProfileUser(currentUserId);
        
        setAvailableProfiles(profiles);
        setIsMultiProfile(isMulti);
      } catch (err) {
        console.error('Error loading profiles:', err);
        setAvailableProfiles([]);
        setIsMultiProfile(false);
      }
    };

    loadProfiles();
  }, [currentUserId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const switchToProfile = useCallback(async (userId: string): Promise<CurrentUser | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiSwitchProfileById(userId);
      
      if (response.success && response.user) {
        return response.user;
      } else {
        setError(response.error || 'Failed to switch profile');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to switch profile';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleProfile = useCallback(async (currentUser: CurrentUser): Promise<CurrentUser | null> => {
    const userHandle = extractUserHandle(currentUser.id);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newUser = await toggleUserProfiles(currentUser.id, userHandle);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle profile';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    availableProfiles,
    isMultiProfile,
    switchToProfile,
    toggleProfile,
    clearError
  };
}

/**
 * Helper function to get profile display information based on profile type
 */
export function getProfileDisplayInfo(profileType: string | null, userName?: string) {
  // Create a generic display info mapping
  const profileDisplayMap: Record<string, { title: string; description: string; icon: string }> = {
    'parent': {
      title: `${userName || 'User'} (Parent)`,
      description: 'Viewing as a parent tracking child development',
      icon: '👨‍👧‍👦'
    },
    'educational_psychologist': {
      title: `${userName || 'User'} (Educational Psychologist)`,
      description: 'Viewing as an educational psychologist',
      icon: '🧠'
    },
    'teacher': {
      title: `${userName || 'User'} (Teacher)`,
      description: 'Viewing as a teacher',
      icon: '👩‍🏫'
    },
    'therapist': {
      title: `${userName || 'User'} (Therapist)`,
      description: 'Viewing as a therapist',
      icon: '🧑‍⚕️'
    }
  };

  if (profileType && profileDisplayMap[profileType]) {
    return profileDisplayMap[profileType];
  }

  return {
    title: `${userName || 'User'} (${profileType || 'Unknown'})`,
    description: `Viewing as ${profileType || 'unknown profile type'}`,
    icon: '👤'
  };
}
