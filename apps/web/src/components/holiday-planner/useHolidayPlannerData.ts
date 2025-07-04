import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { useEffect, useState } from 'react';
import { generateAppointmentsFromRecurring } from '../../lib/api/recurringActivities';
import { getAllServiceCategories, type ServiceCategory } from '../../lib/api/serviceCategories';
import { getAllServices, type Service } from '../../lib/api/services';
import { getCurrentUser, getOtherUsers } from '../../lib/api/users';

// Local type definitions to match the existing implementation
export interface Child {
  id: string;
  name: string;
  age: number;
  parentId: string;
}

export interface CalendarAppointment {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  participants: string[];
  color: string;
  service?: {
    category: string;
  };
  friends?: string[]; // Add friends support
}

export interface HolidayWeek {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  children: Child[];
  appointments?: CalendarAppointment[];
}

export interface ExtendedService extends Service {
  provider?: string;
  location?: string;
  activeFriends?: string[];
}

// Filter types for the new filtering system
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface ActiveFilter {
  id: string;
  type: 'search' | 'category' | 'duration' | 'friends' | 'location';
  value: any;
  label: string;
}

// Calendar navigation types
export interface CalendarPeriod {
  startDate: Date;
  endDate: Date;
  type: 'day' | 'week' | 'month';
  columns: Date[];
}

export interface HolidayPlannerData {
  currentUser: CurrentUser | null;
  friends: CurrentUser[];
  services: Service[];
  serviceCategories: ServiceCategory[];
  selectedWeek: HolidayWeek | null;
  appointments: CalendarAppointment[];
  loading: boolean;
  // New calendar navigation properties
  currentPeriod: CalendarPeriod;
  setCurrentPeriod: (period: CalendarPeriod) => void;
  // New filter properties
  activeFilters: ActiveFilter[];
  setActiveFilters: (filters: ActiveFilter[]) => void;
}

export const useHolidayPlannerData = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [friends, setFriends] = useState<CurrentUser[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<HolidayWeek | null>(null);
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New state for calendar navigation and filtering
  const [currentPeriod, setCurrentPeriod] = useState<CalendarPeriod>(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday start
    
    const columns = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i + 1); // Monday start (skip Sunday)
      return date;
    });
    
    return {
      startDate: columns[0],
      endDate: columns[4],
      type: 'week',
      columns,
    };
  });
  
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load user data
        const [user, otherUsers, allServices, categories] = await Promise.all([
          getCurrentUser(),
          getOtherUsers(),
          getAllServices(),
          getAllServiceCategories(),
        ]);

        setCurrentUser(user);
        setFriends(otherUsers);
        setServices(allServices);
        setServiceCategories(categories);
        
        // Set up mock holiday week for demo
        const mockWeek: HolidayWeek = {
          id: '1',
          name: 'Summer Holiday Week 1',
          startDate: new Date('2025-07-22'),
          endDate: new Date('2025-07-28'),
          children: [
            { id: '1', name: 'Emma', age: 8, parentId: user.id },
            { id: '2', name: 'James', age: 6, parentId: user.id },
          ],
          appointments: [],
        };
        setSelectedWeek(mockWeek);

        // Generate recurring activities for the next month
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        const recurringAppointments = await generateAppointmentsFromRecurring(new Date(), endDate);

        // Set up additional mock appointments for demo
        const mockAppointments: CalendarAppointment[] = [
          {
            id: '1',
            title: 'Swimming Lessons',
            date: new Date('2025-07-23'),
            startTime: '09:00',
            endTime: '10:00',
            type: 'activity',
            location: 'Community Pool',
            participants: ['Emma'],
            color: 'bg-blue-500',
          },
          {
            id: '2',
            title: 'Art & Craft Workshop',
            date: new Date('2025-07-24'),
            startTime: '14:00',
            endTime: '16:00',
            type: 'activity',
            location: 'Arts Centre',
            participants: ['Emma', 'James'],
            color: 'bg-green-500',
          },
        ];
        
        // Combine mock appointments with recurring ones
        setAppointments([...mockAppointments, ...recurringAppointments]);

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    currentUser,
    friends,
    services,
    serviceCategories,
    selectedWeek,
    appointments,
    setAppointments,
    loading,
    currentPeriod,
    setCurrentPeriod,
    activeFilters,
    setActiveFilters,
  };
};
