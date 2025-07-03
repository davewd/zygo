/**
 * Users API
 * 
 * Mock API functions for accessing user data.
 * This provides a clean interface for accessing user data as if it were coming from an API.
 */

import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import usersData from './data/users.json';

// Type definitions
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface UsersData {
  currentUser: CurrentUser;
  otherUsers: CurrentUser[];
}

// API Functions

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<CurrentUser> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 10));
  return usersData.currentUser as CurrentUser;
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<CurrentUser | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  // Check current user
  if (usersData.currentUser.id === id) {
    return usersData.currentUser as CurrentUser;
  }
  
  // Check other users
  const user = usersData.otherUsers.find(u => u.id === id);
  return user ? user as CurrentUser : null;
}

/**
 * Get all users (current + others)
 */
export async function getAllUsers(): Promise<CurrentUser[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return [usersData.currentUser, ...usersData.otherUsers] as CurrentUser[];
}

/**
 * Get other users (excluding current user)
 */
export async function getOtherUsers(): Promise<CurrentUser[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return usersData.otherUsers as CurrentUser[];
}

/**
 * Get current user data with other users (for compatibility with existing code)
 */
export async function getCurrentUserData(): Promise<UsersData> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return {
    currentUser: usersData.currentUser as CurrentUser,
    otherUsers: usersData.otherUsers as CurrentUser[]
  };
}

/**
 * Search users by name or email
 */
export async function searchUsers(query: string): Promise<CurrentUser[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  const allUsers = [usersData.currentUser, ...usersData.otherUsers];
  const searchTerm = query.toLowerCase();
  
  return allUsers.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm) ||
    user.lastName.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  ) as CurrentUser[];
}

/**
 * Mock function to switch to a different user
 * In a real app, this would handle authentication and session management
 */
export const switchUser = async (userId: string): Promise<CurrentUser> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const targetUser = await getUserById(userId);
    
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

/**
 * Get user's full name
 */
export function getUserFullName(user: CurrentUser): string {
  return `${user.firstName} ${user.lastName}`;
}

/**
 * Get user's initials
 */
export function getUserInitials(user: CurrentUser): string {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

// Profile-specific helper functions

/**
 * Get user profile by profile type
 */
export async function getUserByProfileType(profileType: string): Promise<CurrentUser | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const allUsers = [usersData.currentUser, ...usersData.otherUsers];
  const user = allUsers.find(u => (u as any).profileType === profileType);
  return user ? user as CurrentUser : null;
}

/**
 * Get profile by user ID
 */
export async function getProfileById(userId: string): Promise<CurrentUser> {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error(`User with ID '${userId}' not found`);
  }
  return user;
}

/**
 * Get profile by type (fully generic - works with any profile type)
 */
export async function getProfile(profileType: string): Promise<CurrentUser> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const user = await getUserByProfileType(profileType);
  if (!user) {
    throw new Error(`Profile type '${profileType}' not found`);
  }
  return user;
}

/**
 * Get all profiles for a specific user handle/base (extract from user ID pattern)
 */
export async function getUserProfiles(userHandle: string): Promise<CurrentUser[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const allUsers = [usersData.currentUser, ...usersData.otherUsers];
  // Match IDs that start with the userHandle pattern (e.g., "dave-" matches "dave-parent", "dave-psychologist")
  return allUsers.filter(user => 
    user.id.startsWith(`${userHandle}-`)
  ) as CurrentUser[];
}

/**
 * Get all available profile types for a specific user handle
 */
export async function getUserProfileTypes(userHandle: string): Promise<string[]> {
  const profiles = await getUserProfiles(userHandle);
  return profiles
    .map(profile => (profile as any).profileType)
    .filter(Boolean); // Remove any undefined/null profile types
}

/**
 * Switch to any profile by ID
 */
export async function switchToProfileById(userId: string): Promise<CurrentUser> {
  const profile = await getProfileById(userId);
  console.log(`Switching to profile: ${userId}`);
  return switchUser(profile.id);
}

/**
 * Switch to any profile type (fully generic)
 */
export async function switchToProfile(profileType: string): Promise<CurrentUser> {
  const profile = await getProfile(profileType);
  console.log(`Switching to profile type: ${profileType}`);
  return switchUser(profile.id);
}

/**
 * Toggle between user profiles for a specific user handle (works with any number of profiles)
 */
export async function toggleUserProfiles(currentUserId: string, userHandle: string): Promise<CurrentUser> {
  const currentUser = await getUserById(currentUserId);
  const allUserProfiles = await getUserProfiles(userHandle);
  
  if (allUserProfiles.length === 0) {
    throw new Error(`No profiles found for user handle: ${userHandle}`);
  }
  
  if (allUserProfiles.length === 1) {
    // Only one profile, return it
    return allUserProfiles[0];
  }
  
  if (!currentUser) {
    // Default to first profile if current user not found
    return switchUser(allUserProfiles[0].id);
  }
  
  // Find current profile index
  const currentIndex = allUserProfiles.findIndex(profile => profile.id === currentUserId);
  
  if (currentIndex === -1) {
    // Current user is not one of the multi-profiles, switch to first profile
    return switchUser(allUserProfiles[0].id);
  }
  
  // Switch to next profile (cycle through all profiles)
  const nextIndex = (currentIndex + 1) % allUserProfiles.length;
  return switchUser(allUserProfiles[nextIndex].id);
}

/**
 * Check if user handle has multiple profiles
 */
export async function hasMultipleProfiles(userHandle: string): Promise<boolean> {
  const profiles = await getUserProfiles(userHandle);
  return profiles.length > 1;
}

/**
 * Check if current user ID is part of a multi-profile set
 */
export async function isMultiProfileUser(userId: string): Promise<boolean> {
  // Extract user handle from ID (everything before the last dash)
  const lastDashIndex = userId.lastIndexOf('-');
  if (lastDashIndex === -1) {
    return false; // No dash means not a multi-profile pattern
  }
  
  const userHandle = userId.substring(0, lastDashIndex);
  const profiles = await getUserProfiles(userHandle);
  return profiles.length > 1;
}

/**
 * Get user profile type by user ID
 */
export async function getProfileType(userId: string): Promise<string | null> {
  const user = await getUserById(userId);
  return user ? (user as any).profileType || null : null;
}

/**
 * Extract user handle from user ID (e.g., "dave-parent" -> "dave")
 */
export function extractUserHandle(userId: string): string {
  const lastDashIndex = userId.lastIndexOf('-');
  return lastDashIndex === -1 ? userId : userId.substring(0, lastDashIndex);
}

/**
 * JSON API call to switch user profiles by ID
 */
export async function apiSwitchProfileById(userId: string): Promise<{
  success: boolean;
  user?: CurrentUser;
  error?: string;
}> {
  try {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const targetUser = await switchToProfileById(userId);
    
    return {
      success: true,
      user: targetUser
    };
  } catch (error) {
    console.error('API Error switching user profile by ID:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * JSON API call to switch user profiles by type
 */
export async function apiSwitchProfile(profileType: string): Promise<{
  success: boolean;
  user?: CurrentUser;
  error?: string;
}> {
  try {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const targetUser = await switchToProfile(profileType);
    
    return {
      success: true,
      user: targetUser
    };
  } catch (error) {
    console.error('API Error switching user profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}


