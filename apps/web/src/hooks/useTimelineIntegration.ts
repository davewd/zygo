import { PrimaryConsumer } from '@zygo/types';
import { useCallback, useEffect, useState } from 'react';
import { primaryConsumers } from '../data/community/primaryConsumers';

export interface TimelineMember {
  id: string;
  name: string;
  relationship: string;
  profileImage: string;
  communityProfile?: PrimaryConsumer;
  isActive: boolean;
}

export interface UseTimelineIntegrationState {
  members: TimelineMember[];
  loading: boolean;
  error: string | null;
}

export interface UseTimelineIntegrationActions {
  getMemberProfile: (memberId: string) => PrimaryConsumer | undefined;
  linkMemberToProfile: (memberId: string, profileId: string) => Promise<void>;
  getMembersByRelationship: (relationship: string) => TimelineMember[];
}

export interface UseTimelineIntegrationReturn extends UseTimelineIntegrationState, UseTimelineIntegrationActions {}

// This would typically come from the pedagogy data or timeline API
const mockTimelineMembers: TimelineMember[] = [
  {
    id: 'parent_001',
    name: 'Sarah Johnson',
    relationship: 'mother',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b147?w=150&h=150&fit=crop&crop=face',
    isActive: true,
  },
  {
    id: 'parent_002',
    name: 'Mike Johnson',
    relationship: 'father',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isActive: true,
  },
  {
    id: 'child_001',
    name: 'Emma Johnson',
    relationship: 'child',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isActive: true,
  },
  {
    id: 'grandparent_001',
    name: 'Mary Wilson',
    relationship: 'grandmother',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isActive: true,
  },
];

export const useTimelineIntegration = (): UseTimelineIntegrationReturn => {
  const [members, setMembers] = useState<TimelineMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Link timeline members to community profiles by name matching
      const membersWithProfiles = mockTimelineMembers.map(member => {
        const communityProfile = primaryConsumers.find(profile => 
          profile.firstName === member.name.split(' ')[0] &&
          profile.lastName === member.name.split(' ')[1]
        );
        
        return {
          ...member,
          communityProfile,
        };
      });
      
      setMembers(membersWithProfiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load timeline members');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMemberProfile = useCallback((memberId: string): PrimaryConsumer | undefined => {
    const member = members.find(m => m.id === memberId);
    return member?.communityProfile;
  }, [members]);

  const linkMemberToProfile = useCallback(async (memberId: string, profileId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const profile = primaryConsumers.find(p => p.id === profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      
      setMembers(prevMembers => 
        prevMembers.map(member => 
          member.id === memberId 
            ? { ...member, communityProfile: profile }
            : member
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to link member to profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMembersByRelationship = useCallback((relationship: string): TimelineMember[] => {
    return members.filter(member => member.relationship === relationship);
  }, [members]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  return {
    members,
    loading,
    error,
    getMemberProfile,
    linkMemberToProfile,
    getMembersByRelationship,
  };
};

// Hook for connecting feed posts to family member profiles
export interface UseFeedProfileConnectionState {
  loading: boolean;
  error: string | null;
}

export interface UseFeedProfileConnectionActions {
  getProfileByAuthor: (authorName: string, authorHandle: string) => PrimaryConsumer | undefined;
  connectAuthorToProfile: (authorHandle: string, profileId: string) => Promise<void>;
}

export interface UseFeedProfileConnectionReturn extends UseFeedProfileConnectionState, UseFeedProfileConnectionActions {}

export const useFeedProfileConnection = (): UseFeedProfileConnectionReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfileByAuthor = useCallback((authorName: string, authorHandle: string): PrimaryConsumer | undefined => {
    // First try to find by handle
    let profile = primaryConsumers.find(p => p.profile.handle === authorHandle);
    
    if (!profile) {
      // Fallback to name matching
      const [firstName, lastName] = authorName.split(' ');
      profile = primaryConsumers.find(p => 
        p.firstName === firstName && 
        (p.lastName === lastName || !lastName)
      );
    }
    
    return profile;
  }, []);

  const connectAuthorToProfile = useCallback(async (authorHandle: string, profileId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call to create author-profile connection
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const profile = primaryConsumers.find(p => p.id === profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      
      // In a real app, this would update the backend mapping
      console.log(`Connected author handle "${authorHandle}" to profile "${profile.displayName}"`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect author to profile');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getProfileByAuthor,
    connectAuthorToProfile,
  };
};
