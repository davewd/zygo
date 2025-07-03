/**
 * Timeline Users API utilities
 * 
 * Utilities for working with timeline users, to be used in UI components
 */

// Timeline User interface (compatible with CurrentUser)
export interface TimelineUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  profileType?: string;
  title?: string;
  relationshipToCurrentUser?: string;
  isCurrentUser?: boolean;
}

export interface TimelineUsersData {
  currentUser: TimelineUser;
  timelineUsers: TimelineUser[];
}

/**
 * Get timeline users for a specific user
 * This loads the timeline_users_{userId}.json file
 */
export async function getTimelineUsers(currentUserId: string): Promise<TimelineUsersData> {
  try {
    // Try to load the specific user's timeline data
    const response = await fetch(`/data/timeline_users_${currentUserId}.json`);
    
    if (!response.ok) {
      // Fallback to default timeline users if specific file doesn't exist
      const fallbackResponse = await fetch('/data/timeline_users_default.json');
      if (!fallbackResponse.ok) {
        throw new Error('Failed to load timeline users data');
      }
      const fallbackData = await fallbackResponse.json();
      return fallbackData as TimelineUsersData;
    }
    
    const data = await response.json();
    return data as TimelineUsersData;
  } catch (error) {
    console.error('Error loading timeline users:', error);
    // Return a basic structure if loading fails
    return {
      currentUser: {
        id: currentUserId,
        firstName: 'Current',
        lastName: 'User',
        email: 'user@example.com',
        isCurrentUser: true
      },
      timelineUsers: []
    };
  }
}

/**
 * Get available timeline users (excluding current user)
 */
export async function getAvailableTimelineUsers(currentUserId: string): Promise<TimelineUser[]> {
  const data = await getTimelineUsers(currentUserId);
  return data.timelineUsers.filter(user => user.id !== currentUserId);
}

/**
 * Get current user's timeline profile
 */
export async function getCurrentUserTimelineProfile(currentUserId: string): Promise<TimelineUser> {
  const data = await getTimelineUsers(currentUserId);
  return data.currentUser;
}
