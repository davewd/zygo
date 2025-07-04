import { useState, useEffect } from 'react';
import { getCurrentUser, getOtherUsers } from '../../lib/api/users';
import { getAllServices, type Service } from '../../lib/api/services';
import { getAllServiceCategories, type ServiceCategory } from '../../lib/api/serviceCategories';
import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';

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

export interface HolidayPlannerData {
  currentUser: CurrentUser | null;
  friends: CurrentUser[];
  services: Service[];
  serviceCategories: ServiceCategory[];
  selectedWeek: HolidayWeek | null;
  appointments: CalendarAppointment[];
  loading: boolean;
}

export const useHolidayPlannerData = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [friends, setFriends] = useState<CurrentUser[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<HolidayWeek | null>(null);
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [loading, setLoading] = useState(true);

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

        // Set up mock appointments for demo
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
        setAppointments(mockAppointments);

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
  };
};
