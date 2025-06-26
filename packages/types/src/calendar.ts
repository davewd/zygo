export interface Child {
  id: string;
  name: string;
  age: number;
  parentId: string;
}

export interface Friend extends Child {
  parentName: string;
  relationship: 'friend' | 'family' | 'neighbor' | 'classmate';
}

export interface CalendarService {
  id: string;
  name: string;
  category: 'activity' | 'sport' | 'education' | 'entertainment' | 'outdoor' | 'indoor' | 'care';
  description?: string;
  provider?: string;
  location?: string;
  duration?: number; // in minutes
  ageRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
}

export interface CalendarAppointment {
  id: string;
  title: string;
  location: string;
  service?: CalendarService;
  startTime: Date;
  endTime: Date;
  type: 'full-day' | 'half-day' | 'timed';
  children: Child[];
  friends: Friend[];
  notes?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
  color?: string;
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

export interface AvailabilitySlot {
  id: string;
  childId: string;
  startTime: Date;
  endTime: Date;
  status: 'available' | 'busy' | 'maybe';
  description?: string;
}

export interface HolidayWeek {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  children: Child[];
  appointments: CalendarAppointment[];
  notes?: string;
}

export interface ServiceFilter {
  categories: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  location?: string;
  duration?: {
    min: number;
    max: number;
  };
  searchText?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface ConnectionAvailability {
  connectionId: string;
  connectionName: string;
  children: Child[];
  availableSlots: AvailabilitySlot[];
  mutualFreeTime?: {
    startTime: Date;
    endTime: Date;
    overlappingChildren: Child[];
  }[];
}
