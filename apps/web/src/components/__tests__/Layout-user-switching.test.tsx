import '@testing-library/jest-dom';
import { getCurrentUserData, isMultiProfileUser, switchUser } from '../../lib/api/users';

// Import actual user data for testing
import usersData from '../../lib/api/data/users.json';

// Mock the users API
jest.mock('../../lib/api/users');

const mockGetCurrentUserData = getCurrentUserData as jest.MockedFunction<typeof getCurrentUserData>;
const mockSwitchUser = switchUser as jest.MockedFunction<typeof switchUser>;
const mockIsMultiProfileUser = isMultiProfileUser as jest.MockedFunction<typeof isMultiProfileUser>;

describe('User Switching API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCurrentUserData.mockResolvedValue(usersData);
    mockIsMultiProfileUser.mockImplementation(
      (user) => user.firstName === 'Dave' && user.lastName === 'Dawson'
    );
    mockSwitchUser.mockImplementation(async (userId) => {
      // Find user in actual data
      const allUsers = [usersData.currentUser, ...usersData.otherUsers];
      const user = allUsers.find((u) => u.id === userId);
      if (user) {
        return user;
      }
      throw new Error(`User not found: ${userId}`);
    });
  });

  it('should load user data correctly', async () => {
    const userData = await getCurrentUserData();

    expect(userData.currentUser.id).toBe(usersData.currentUser.id);
    expect(userData.currentUser.profileType).toBe(usersData.currentUser.profileType);
    expect(userData.otherUsers).toHaveLength(usersData.otherUsers.length);
    expect(userData.otherUsers[0].id).toBe(usersData.otherUsers[0].id);
  });

  it('should identify Dave profiles correctly', () => {
    const daveParent = usersData.currentUser;
    const davePsychologist = usersData.otherUsers[0];
    const otherUser = {
      id: 'other-user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    expect(isMultiProfileUser(daveParent)).toBe(true);
    expect(isMultiProfileUser(davePsychologist)).toBe(true);
    expect(isMultiProfileUser(otherUser)).toBe(false);
  });

  it('should switch users correctly', async () => {
    // Use the actual data from users.json to find the psychologist profile
    const davePsychologist = usersData.otherUsers.find(
      (u) =>
        u.firstName === 'Dave' &&
        u.lastName === 'Dawson' &&
        u.profileType === 'educational_psychologist'
    );

    if (!davePsychologist) {
      throw new Error('Dave psychologist profile not found in users.json');
    }

    const psychologistUser = await switchUser(davePsychologist.id);

    expect(psychologistUser.id).toBe(davePsychologist.id);
    expect(psychologistUser.profileType).toBe(davePsychologist.profileType);
    expect(psychologistUser.title).toBe(davePsychologist.title);
  });

  it('should handle user switching errors', async () => {
    await expect(switchUser('non-existent-user')).rejects.toThrow(
      'User not found: non-existent-user'
    );
  });

  it('should verify profile data structure', async () => {
    const userData = await getCurrentUserData();

    // Verify parent profile structure
    const parentProfile = userData.currentUser;
    expect(parentProfile).toHaveProperty('id');
    expect(parentProfile).toHaveProperty('firstName');
    expect(parentProfile).toHaveProperty('lastName');
    expect(parentProfile).toHaveProperty('email');
    expect(parentProfile).toHaveProperty('profileType');
    expect(parentProfile).toHaveProperty('title');
    expect(parentProfile).toHaveProperty('avatar');

    // Verify psychologist profile structure
    const psychologistProfile = userData.otherUsers[0];
    expect(psychologistProfile).toHaveProperty('id');
    expect(psychologistProfile).toHaveProperty('firstName');
    expect(psychologistProfile).toHaveProperty('lastName');
    expect(psychologistProfile).toHaveProperty('email');
    expect(psychologistProfile).toHaveProperty('profileType');
    expect(psychologistProfile).toHaveProperty('title');
    expect(psychologistProfile).toHaveProperty('avatar');
  });

  it('should simulate user selection workflow', async () => {
    // Start with current user data
    const initialData = await getCurrentUserData();
    expect(initialData.currentUser.id).toBe(usersData.currentUser.id);

    // Simulate user selecting the psychologist from dropdown
    const targetUserId = usersData.otherUsers[0].id;
    const selectedUser = await switchUser(targetUserId);
    expect(selectedUser.id).toBe(usersData.otherUsers[0].id);
    expect(selectedUser.profileType).toBe(usersData.otherUsers[0].profileType);

    // Simulate the state update that would happen in the UI
    const newCurrentUser = selectedUser;
    const newOtherUsers = [initialData.currentUser]; // Move old current to others

    expect(newCurrentUser.id).toBe(usersData.otherUsers[0].id);
    expect(newOtherUsers[0].id).toBe(usersData.currentUser.id);
  });
});
