import {
  apiSwitchProfile,
  extractUserHandle,
  getProfile,
  getProfileById,
  getProfileType,
  getUserProfiles,
  getUserProfileTypes,
  hasMultipleProfiles,
  isMultiProfileUser,
  switchToProfile,
  switchToProfileById,
  toggleUserProfiles
} from '../lib/api/users';

// Import the actual users data for testing consistency

// Mock the delay function to speed up tests
jest.mock('../lib/api/users', () => {
  const originalModule = jest.requireActual('../lib/api/users');
  return {
    ...originalModule,
    switchUser: jest.fn().mockImplementation(async (userId: string) => {
      // Use actual user data from JSON instead of hardcoded values
      const userData = require('../lib/api/data/users.json');
      
      // Find user in currentUser or otherUsers
      let user = null;
      if (userData.currentUser.id === userId) {
        user = userData.currentUser;
      } else {
        user = userData.otherUsers.find((u: any) => u.id === userId);
      }
      
      if (!user) {
        throw new Error('\`User with ID \${userId} not found\`');
      }
      
      return user;
    })
  };
});

describe('Profile Switching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear console logs
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Profile retrieval by ID', () => {
    it('should get profile by ID correctly', async () => {
      const profile = await getProfileById('dave-parent');
      
      expect(profile.id).toBe('dave-parent');
      expect((profile as any).profileType).toBe('parent');
    });

    it('should get profile by type correctly', async () => {
      const profile = await getProfile('parent');
      
      expect((profile as any).profileType).toBe('parent');
    });

    it('should throw error for non-existent profile ID', async () => {
      await expect(getProfileById('non-existent')).rejects.toThrow('User with ID \'non-existent\' not found');
    });

    it('should throw error for non-existent profile type', async () => {
      await expect(getProfile('non-existent-type')).rejects.toThrow('Profile type \'non-existent-type\' not found');
    });
  });

  describe('User handle extraction and profile management', () => {
    it('should extract user handle correctly', () => {
      expect(extractUserHandle('dave-parent')).toBe('dave');
      expect(extractUserHandle('dave-psychologist')).toBe('dave');
      expect(extractUserHandle('john-admin')).toBe('john');
      expect(extractUserHandle('singlename')).toBe('singlename');
    });

    it('should get all profiles for a user handle', async () => {
      const profiles = await getUserProfiles('dave');
      
      expect(profiles.length).toBe(2);
      expect(profiles.some(p => p.id === 'dave-parent')).toBe(true);
      expect(profiles.some(p => p.id === 'dave-psychologist')).toBe(true);
    });

    it('should get profile types for a user handle', async () => {
      const profileTypes = await getUserProfileTypes('dave');
      
      expect(profileTypes.length).toBe(2);
      expect(profileTypes).toContain('parent');
      expect(profileTypes).toContain('educational_psychologist');
    });

    it('should detect multi-profile users', async () => {
      expect(await hasMultipleProfiles('dave')).toBe(true);
      expect(await hasMultipleProfiles('nonexistent')).toBe(false);
    });

    it('should identify if user ID is part of multi-profile set', async () => {
      expect(await isMultiProfileUser('dave-parent')).toBe(true);
      expect(await isMultiProfileUser('dave-psychologist')).toBe(true);
      expect(await isMultiProfileUser('nonexistent')).toBe(false);
    });
  });

  describe('Profile switching by ID', () => {
    it('should switch to profile by ID', async () => {
      const profile = await switchToProfileById('dave-psychologist');
      
      expect(profile.id).toBe('dave-psychologist');
      expect((profile as any).profileType).toBe('educational_psychologist');
      expect(console.log).toHaveBeenCalledWith('Switching to profile: dave-psychologist');
    });

    it('should switch to profile by type', async () => {
      const profile = await switchToProfile('parent');
      
      expect((profile as any).profileType).toBe('parent');
      expect(console.log).toHaveBeenCalledWith('Switching to profile type: parent');
    });
  });

  describe('Profile toggling', () => {
    it('should toggle between profiles correctly', async () => {
      // Test toggling from parent to psychologist
      const toggledToPsychologist = await toggleUserProfiles('dave-parent', 'dave');
      expect(toggledToPsychologist.id).toBe('dave-psychologist');
      
      // Test toggling from psychologist to parent
      const toggledToParent = await toggleUserProfiles('dave-psychologist', 'dave');
      expect(toggledToParent.id).toBe('dave-parent');
    });

    it('should default to first profile when toggling from unknown user', async () => {
      const newProfile = await toggleUserProfiles('unknown-user', 'dave');
      expect(newProfile.id).toBe('dave-parent'); // Should default to first profile
    });
  });

  describe('Profile utility functions', () => {
    it('should correctly identify multi-profile users', async () => {
      expect(await isMultiProfileUser('dave-parent')).toBe(true);
      expect(await isMultiProfileUser('dave-psychologist')).toBe(true);
      expect(await isMultiProfileUser('unknown-user')).toBe(false);
    });

    it('should return correct profile types', async () => {
      expect(await getProfileType('dave-parent')).toBe('parent');
      expect(await getProfileType('dave-psychologist')).toBe('educational_psychologist');
      expect(await getProfileType('unknown-user')).toBe(null);
    });
  });

  describe('JSON API switching', () => {
    it('should successfully switch to parent profile via API', async () => {
      const response = await apiSwitchProfile('parent');
      
      expect(response.success).toBe(true);
      expect((response.user as any)?.profileType).toBe('parent');
      expect(response.error).toBeUndefined();
    });

    it('should successfully switch to psychologist profile via API', async () => {
      const response = await apiSwitchProfile('educational_psychologist');
      
      expect(response.success).toBe(true);
      expect((response.user as any)?.profileType).toBe('educational_psychologist');
      expect(response.error).toBeUndefined();
    });

    it('should handle invalid profile type', async () => {
      const response = await apiSwitchProfile('invalid');
      
      expect(response.success).toBe(false);
      expect(response.user).toBeUndefined();
      expect(response.error).toContain('Profile type \'invalid\' not found');
    });
  });

  describe('Error handling', () => {
    it('should handle API errors gracefully', async () => {
      const response = await apiSwitchProfile('invalid');
      
      expect(response.success).toBe(false);
      expect(response.error).toContain('Profile type \'invalid\' not found');
    });
  });

  describe('Integration with existing user system', () => {
    it('should maintain user data structure consistency', async () => {
      const parentProfile = await getProfile('parent');
      const psychologistProfile = await getProfile('educational_psychologist');

      // Check that both profiles have required fields
      expect(parentProfile).toHaveProperty('id');
      expect(parentProfile).toHaveProperty('firstName');
      expect(parentProfile).toHaveProperty('lastName');
      expect(parentProfile).toHaveProperty('email');
      expect(parentProfile).toHaveProperty('profileType');
      expect(parentProfile).toHaveProperty('title');

      expect(psychologistProfile).toHaveProperty('id');
      expect(psychologistProfile).toHaveProperty('firstName');
      expect(psychologistProfile).toHaveProperty('lastName');
      expect(psychologistProfile).toHaveProperty('email');
      expect(psychologistProfile).toHaveProperty('profileType');
      expect(psychologistProfile).toHaveProperty('title');

      // Both should have the same name but different profile types
      expect(parentProfile.firstName).toBe(psychologistProfile.firstName);
      expect(parentProfile.lastName).toBe(psychologistProfile.lastName);
      expect((parentProfile as any).profileType).not.toBe((psychologistProfile as any).profileType);
    });
  });
});
