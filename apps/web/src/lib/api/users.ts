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
