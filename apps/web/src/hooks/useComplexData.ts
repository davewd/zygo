/**
 * Specialized hooks for managing complex data structures
 * These hooks provide type-safe, reusable patterns for common data operations
 */

import type {
    CommunitySearchFilters
} from '@zygo/types/src/community';
import { useCallback, useMemo } from 'react';
import { getAllCommunityProfiles, getCommunityProfileByHandle, getCommunityProfileById } from '../lib/api/community';
import { getCredentialProviders } from '../lib/api/credentials';
import { getAllServiceProviders } from '../lib/api/serviceProviders';
import { transformServiceProvider } from '../lib/utils/dataTransforms';
import { useAsyncData, useMultipleAsyncData } from './useAsyncData';
// Calendar types - these would be imported from the actual types package when available
interface CalendarAppointment {
  id: string;
  startDateTime: string;
  endDateTime: string;
  title: string;
  type: string;
}

interface HolidayWeek {
  startDate: string;
  endDate: string;
  name: string;
}

/**
 * Hook for managing community profiles with filtering and search
 */
export function useCommunityProfiles(filters?: CommunitySearchFilters) {
  const { data: profiles = [], loading, error, retry } = useAsyncData(async () => {
    const response = await getAllCommunityProfiles();
    return response.data;
  }, []);

  const filteredProfiles = useMemo(() => {
    if (!filters) return profiles;

    return profiles.filter((profile) => {
      const consumer = profile.consumer;

      // Privacy filter
      if (filters.privacyLevel && filters.privacyLevel.length > 0) {
        if (!filters.privacyLevel.includes(consumer.privacyLevel as any)) {
          return false;
        }
      }

      // Active filter
      if (filters.isActiveOnly && !consumer.isActive) {
        return false;
      }

      // Role filter
      if (filters.roles && filters.roles.length > 0) {
        if (!filters.roles.includes(consumer.role)) {
          return false;
        }
      }

      // Age group filter
      if (filters.ageGroups && filters.ageGroups.length > 0) {
        if (!filters.ageGroups.includes(consumer.ageGroup)) {
          return false;
        }
      }

      // Location filter
      if (filters.location?.state && consumer.location?.state !== filters.location.state) {
        return false;
      }

      return true;
    });
  }, [profiles, filters]);

  const profileStats = useMemo(() => ({
    total: profiles.length,
    active: profiles.filter(p => p.consumer.isActive).length,
    byRole: {
      parent: profiles.filter(p => p.consumer.role === 'parent').length,
      grandparent: profiles.filter(p => p.consumer.role === 'grandparent').length,
      child: profiles.filter(p => p.consumer.role === 'child').length,
    },
    filtered: filteredProfiles.length,
  }), [profiles, filteredProfiles]);

  return {
    profiles: filteredProfiles,
    allProfiles: profiles,
    stats: profileStats,
    loading,
    error,
    retry,
  };
}

/**
 * Hook for fetching a single community profile by ID or handle
 */
export function useCommunityProfile(id?: string) {
  const { data: profile, loading, error, retry } = useAsyncData(async () => {
    if (!id) return null;

    // Try to get by ID first, then by handle if it's not a valid ID format
    let response;
    if (id.startsWith('consumer_')) {
      response = await getCommunityProfileById(id);
    } else {
      response = await getCommunityProfileByHandle(id);
    }

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Profile not found');
    }
  }, [id]);

  return {
    profile,
    loading,
    error,
    retry,
  };
}

/**
 * Hook for managing credential providers with filtering
 */
export function useCredentialProviders(searchTerm?: string, filterType?: string) {
  const { data: providers = [], loading, error, retry } = useAsyncData(async () => {
    const response = await getCredentialProviders();
    return response.data || [];
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesSearch = !searchTerm || 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filterType || filterType === 'all' || provider.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [providers, searchTerm, filterType]);

  const providerStats = useMemo(() => ({
    total: providers.length,
    byType: providers.reduce((acc, provider) => {
      acc[provider.type] = (acc[provider.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    filtered: filteredProviders.length,
  }), [providers, filteredProviders]);

  const uniqueTypes = useMemo(() => 
    [...new Set(providers.map(p => p.type))], 
    [providers]
  );

  return {
    providers: filteredProviders,
    allProviders: providers,
    stats: providerStats,
    uniqueTypes,
    loading,
    error,
    retry,
  };
}

/**
 * Hook for managing calendar data with appointments and holiday weeks
 */
export function useCalendarData(week?: HolidayWeek) {
  // This would typically fetch from a calendar API
  const { data, loading, error, retry } = useMultipleAsyncData({
    appointments: async () => {
      // Mock data - replace with actual API call
      return [] as CalendarAppointment[];
    },
    holidayWeeks: async () => {
      // Mock data - replace with actual API call
      return [] as HolidayWeek[];
    },
  }, []);

  const appointments = data.appointments || [];
  const holidayWeeks = data.holidayWeeks || [];

  const weekAppointments = useMemo(() => {
    if (!week) return appointments;
    
    const weekStart = new Date(week.startDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.startDateTime);
      return aptDate >= weekStart && aptDate < weekEnd;
    });
  }, [appointments, week]);

  const appointmentsByDay = useMemo(() => {
    const byDay: Record<string, CalendarAppointment[]> = {};
    
    weekAppointments.forEach(apt => {
      const dayKey = new Date(apt.startDateTime).toISOString().split('T')[0];
      if (!byDay[dayKey]) byDay[dayKey] = [];
      byDay[dayKey].push(apt);
    });

    return byDay;
  }, [weekAppointments]);

  return {
    appointments: weekAppointments,
    allAppointments: appointments,
    appointmentsByDay,
    holidayWeeks,
    loading,
    error,
    retry,
  };
}

/**
 * Hook for managing notifications with complex filtering
 */
export interface NotificationData {
  id: string;
  type: 'reminder' | 'update' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  reminderData?: {
    reminderType: 'breastfeeding' | 'library_book' | 'appointment' | 'milestone';
    dueDate?: Date;
    babyName?: string;
  };
}

export function useNotifications(filter?: 'all' | 'unread' | 'reminders') {
  // This would typically fetch from a notifications API
  const { data: notifications = [], loading, error, retry } = useAsyncData(async () => {
    // Mock data - replace with actual API call
    return [] as NotificationData[];
  }, []);

  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'reminders':
        return notifications.filter(n => n.type === 'reminder');
      default:
        return notifications;
    }
  }, [notifications, filter]);

  const notificationStats = useMemo(() => ({
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    reminders: notifications.filter(n => n.type === 'reminder').length,
    byType: notifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  }), [notifications]);

  const markAsRead = useCallback((notificationId: string) => {
    // This would make an API call to mark as read
    console.log('Mark as read:', notificationId);
  }, []);

  const markAllAsRead = useCallback(() => {
    // This would make an API call to mark all as read
    console.log('Mark all as read');
  }, []);

  return {
    notifications: filteredNotifications,
    allNotifications: notifications,
    stats: notificationStats,
    markAsRead,
    markAllAsRead,
    loading,
    error,
    retry,
  };
}

/**
 * Hook for searching and filtering any list of items
 */
export function useListFilter<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
  filters?: Record<string, any>
) {
  return useMemo(() => {
    return items.filter(item => {
      // Search filter
      const matchesSearch = !searchTerm || searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (Array.isArray(value)) {
          return value.some(v => 
            typeof v === 'string' && v.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return false;
      });

      // Additional filters
      const matchesFilters = !filters || Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue || filterValue === 'all') return true;
        const itemValue = (item as any)[key];
        if (Array.isArray(filterValue)) {
          return filterValue.includes(itemValue);
        }
        return itemValue === filterValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, searchFields, filters]);
}

/**
 * Hook for managing service providers with filtering and transformation
 */
export function useServiceProviders(searchTerm?: string, specialty?: string) {
  const { data: rawProviders = [], loading, error, retry } = useAsyncData(async () => {
    const response = await getAllServiceProviders();
    return response || [];
  }, []);

  const transformedProviders = useMemo(() => 
    rawProviders.map(transformServiceProvider), 
    [rawProviders]
  );

  const filteredProviders = useMemo(() => {
    return transformedProviders.filter((provider) => {
      // Search filter
      const matchesSearch = !searchTerm || 
        provider.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specializations.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        provider.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Specialty filter
      const matchesSpecialty = !specialty || specialty === 'all' || 
        provider.specializations.includes(specialty);

      return matchesSearch && matchesSpecialty;
    });
  }, [transformedProviders, searchTerm, specialty]);

  const providerStats = useMemo(() => ({
    total: transformedProviders.length,
    verified: transformedProviders.filter(p => p.verificationStatus === 'verified').length,
    bySpecialization: transformedProviders.reduce((acc, provider) => {
      provider.specializations.forEach(spec => {
        acc[spec] = (acc[spec] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    byAvailability: {
      inPerson: transformedProviders.filter(p => p.availability.inPerson).length,
      telehealth: transformedProviders.filter(p => p.availability.telehealth).length,
      homeVisits: transformedProviders.filter(p => p.availability.homeVisits).length,
      emergency: transformedProviders.filter(p => p.availability.emergency).length,
    },
    filtered: filteredProviders.length,
  }), [transformedProviders, filteredProviders]);

  const availableSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    transformedProviders.forEach(provider => {
      provider.specializations.forEach(spec => specialties.add(spec));
    });
    return Array.from(specialties).sort();
  }, [transformedProviders]);

  return {
    providers: filteredProviders,
    allProviders: transformedProviders,
    stats: providerStats,
    availableSpecialties,
    loading,
    error,
    retry,
  };
}
