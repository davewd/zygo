import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';

// Mock API response interface
interface UsersResponse {
  currentUser: CurrentUser;
  otherUsers: CurrentUser[];
}

/**
 * Simulates fetching current user and other available users for switching
 * In a real app, this would make an HTTP request to your backend API
 */
export const getCurrentUserData = async (): Promise<UsersResponse> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Fetch data from local JSON file
    const response = await fetch('/data/users.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    
    const data: UsersResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    // Fallback data in case of error
    return {
      currentUser: {
        id: 'fallback-user',
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com',
      },
      otherUsers: []
    };
  }
};

/**
 * Mock function to switch to a different user
 * In a real app, this would handle authentication and session management
 */
export const switchUser = async (userId: string): Promise<CurrentUser> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const data = await getCurrentUserData();
    const targetUser = data.otherUsers.find(user => user.id === userId);
    
    if (!targetUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // In a real app, you would update the session/authentication state here
    console.log(`Switching to user: ${targetUser.firstName} ${targetUser.lastName}`);
    
    return targetUser;
  } catch (error) {
    console.error('Error switching user:', error);
    throw error;
  }
};
