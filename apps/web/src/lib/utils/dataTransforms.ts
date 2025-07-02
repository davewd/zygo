/**
 * Data transformation utilities for complex data structures
 * Provides type-safe transformation and normalization functions
 */

import type { CommunityProfile } from '@zygo/types/src/community';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export interface TransformedServiceProvider {
  id: string;
  fullName: string;
  displayName: string;
  title?: string;
  profileImage?: string;
  bio: string;
  credentials: TransformedCredential[];
  services: string[];
  specializations: string[];
  languages: string[];
  yearsExperience: number;
  availability: ServiceAvailability;
  centerId?: string;
  location?: ServiceLocation;
  contactInfo?: ContactInfo;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

export interface TransformedCredential {
  title: string;
  abbreviation?: string;
  issuingBody: string;
  verified: boolean;
  issueDate?: string;
  expiryDate?: string;
  credentialNumber?: string;
}

export interface ServiceAvailability {
  inPerson: boolean;
  telehealth: boolean;
  homeVisits: boolean;
  emergency: boolean;
  schedule?: {
    [day: string]: { start: string; end: string; };
  };
}

export interface ServiceLocation {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  coordinates?: { lat: number; lng: number; };
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    platform: string;
    handle: string;
  }[];
}

export interface TransformedNotification {
  id: string;
  type: 'reminder' | 'update' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionLabel?: string;
  reminderData?: ReminderData;
  metadata?: Record<string, any>;
}

export interface ReminderData {
  reminderType: 'breastfeeding' | 'library_book' | 'appointment' | 'milestone';
  dueDate?: Date;
  babyName?: string;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  customMessage?: string;
}

// =====================================================
// TRANSFORMATION FUNCTIONS
// =====================================================

/**
 * Transform raw service provider data into a standardized format
 */
export function transformServiceProvider(rawProvider: any): TransformedServiceProvider {
  return {
    id: rawProvider.id,
    fullName: `${rawProvider.firstName} ${rawProvider.lastName}`,
    displayName: rawProvider.displayName || `${rawProvider.firstName} ${rawProvider.lastName}`,
    title: rawProvider.title,
    profileImage: rawProvider.profileImage,
    bio: rawProvider.bio || '',
    credentials: rawProvider.credentials?.map(transformCredential) || [],
    services: rawProvider.services || [],
    specializations: rawProvider.specializations || [],
    languages: rawProvider.languages || ['English'],
    yearsExperience: rawProvider.yearsExperience || 0,
    availability: transformAvailability(rawProvider.availability),
    centerId: rawProvider.centerId,
    location: transformLocation(rawProvider.location),
    contactInfo: transformContactInfo(rawProvider.contact),
    verificationStatus: determineVerificationStatus(rawProvider),
  };
}

/**
 * Transform credential data
 */
function transformCredential(rawCredential: any): TransformedCredential {
  return {
    title: rawCredential.title,
    abbreviation: rawCredential.abbreviation,
    issuingBody: rawCredential.issuingBody,
    verified: rawCredential.verified || false,
    issueDate: rawCredential.issueDate,
    expiryDate: rawCredential.expiryDate,
    credentialNumber: rawCredential.credentialNumber,
  };
}

/**
 * Transform availability data
 */
function transformAvailability(rawAvailability: any): ServiceAvailability {
  return {
    inPerson: rawAvailability?.inPerson || false,
    telehealth: rawAvailability?.telehealth || false,
    homeVisits: rawAvailability?.homeVisits || false,
    emergency: rawAvailability?.emergency || false,
    schedule: rawAvailability?.schedule,
  };
}

/**
 * Transform location data
 */
function transformLocation(rawLocation: any): ServiceLocation | undefined {
  if (!rawLocation) return undefined;
  
  return {
    address: rawLocation.address || '',
    suburb: rawLocation.suburb || '',
    state: rawLocation.state || '',
    postcode: rawLocation.postcode || '',
    country: rawLocation.country || 'Australia',
    coordinates: rawLocation.coordinates,
  };
}

/**
 * Transform contact information
 */
function transformContactInfo(rawContact: any): ContactInfo | undefined {
  if (!rawContact) return undefined;
  
  return {
    phone: rawContact.phone,
    email: rawContact.email,
    website: rawContact.website,
    socialMedia: rawContact.socialMedia || [],
  };
}

/**
 * Determine verification status based on credentials and other factors
 */
function determineVerificationStatus(rawProvider: any): 'verified' | 'pending' | 'unverified' {
  if (rawProvider.verified === true) return 'verified';
  if (rawProvider.verified === false) return 'unverified';
  
  // Check if has verified credentials
  const hasVerifiedCredentials = rawProvider.credentials?.some((cred: any) => cred.verified);
  if (hasVerifiedCredentials) return 'verified';
  
  return 'pending';
}

/**
 * Transform community profile data with enhanced metadata
 */
export function transformCommunityProfile(profile: CommunityProfile) {
  return {
    ...profile,
    displayInfo: {
      fullName: profile.consumer.displayName,
      avatarUrl: profile.consumer.profileImage,
      roleDisplay: formatRole(profile.consumer.role),
      locationDisplay: formatLocation(profile.consumer.location),
      ageDisplay: formatAgeGroup(profile.consumer.ageGroup),
    },
    engagement: {
      level: calculateEngagementLevel(profile.stats),
      badges: profile.badges || [],
      recentActivity: profile.recentActivity,
    },
    privacy: {
      level: profile.consumer.privacyLevel,
      canContact: profile.consumer.privacyLevel !== 'private',
      canViewDetails: profile.consumer.privacyLevel === 'public',
    },
  };
}

/**
 * Normalize and validate API response data
 */
export function normalizeApiResponse<T>(response: any, validator?: (data: any) => boolean): T[] {
  if (!response) return [];
  
  // Handle different response formats
  let data: any[];
  if (response.data) {
    data = Array.isArray(response.data) ? response.data : [response.data];
  } else if (Array.isArray(response)) {
    data = response;
  } else {
    data = [response];
  }
  
  // Apply validation if provided
  if (validator) {
    data = data.filter(validator);
  }
  
  return data as T[];
}

/**
 * Create a search index for complex objects
 */
export function createSearchIndex<T>(
  items: T[],
  searchFields: (keyof T)[]
): Map<string, T[]> {
  const index = new Map<string, T[]>();
  
  items.forEach(item => {
    searchFields.forEach(field => {
      const value = item[field];
      if (typeof value === 'string') {
        const words = value.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 2) { // Index words longer than 2 characters
            if (!index.has(word)) index.set(word, []);
            index.get(word)!.push(item);
          }
        });
      }
    });
  });
  
  return index;
}

/**
 * Search using the created index
 */
export function searchWithIndex<T>(
  searchIndex: Map<string, T[]>,
  query: string
): T[] {
  if (!query.trim()) return [];
  
  const words = query.toLowerCase().split(/\s+/);
  const results = new Set<T>();
  
  words.forEach(word => {
    if (searchIndex.has(word)) {
      searchIndex.get(word)!.forEach(item => results.add(item));
    }
  });
  
  return Array.from(results);
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatRole(role: string): string {
  const roleMap: Record<string, string> = {
    'parent': 'Parent',
    'grandparent': 'Grandparent',
    'child': 'Child',
    'caregiver': 'Caregiver',
  };
  return roleMap[role] || role;
}

function formatLocation(location: any): string {
  if (!location) return '';
  return `${location.suburb}, ${location.state}`;
}

function formatAgeGroup(ageGroup: string): string {
  const ageGroupMap: Record<string, string> = {
    'newborn': '0-3 months',
    'infant': '3-12 months',
    'toddler': '1-3 years',
    'preschooler': '3-5 years',
    'school-age': '5-12 years',
    'teenager': '13-18 years',
  };
  return ageGroupMap[ageGroup] || ageGroup;
}

function calculateEngagementLevel(stats: any): 'low' | 'medium' | 'high' {
  if (!stats) return 'low';
  
  const total = (stats.postsCount || 0) + (stats.connectionsCount || 0) + (stats.milestonesShared || 0);
  
  if (total >= 50) return 'high';
  if (total >= 20) return 'medium';
  return 'low';
}

/**
 * Group items by a specified field
 */
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) groups[group] = [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Sort items by multiple criteria
 */
export function multiSort<T>(
  items: T[],
  criteria: { key: keyof T; direction: 'asc' | 'desc' }[]
): T[] {
  return [...items].sort((a, b) => {
    for (const criterion of criteria) {
      const aVal = a[criterion.key];
      const bVal = b[criterion.key];
      
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      if (aVal > bVal) comparison = 1;
      
      if (comparison !== 0) {
        return criterion.direction === 'desc' ? -comparison : comparison;
      }
    }
    return 0;
  });
}

/**
 * Paginate an array of items
 */
export function paginate<T>(items: T[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    items: items.slice(startIndex, endIndex),
    totalItems: items.length,
    totalPages: Math.ceil(items.length / limit),
    currentPage: page,
    hasMore: endIndex < items.length,
    hasPrevious: startIndex > 0,
  };
}
