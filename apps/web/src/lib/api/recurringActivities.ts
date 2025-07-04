// API for recurring activities and friend availability
import type { CalendarAppointment } from '../../components/holiday-planner/useHolidayPlannerData';

export interface RecurringActivity {
  id: string;
  title: string;
  description?: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // e.g., "09:30"
  endTime: string; // e.g., "10:00"
  location: string;
  participants: string[]; // child names or IDs
  friends?: string[]; // friend names or IDs
  color: string;
  type: 'recurring';
  frequency: 'weekly';
}

export interface FriendAvailability {
  friendId: string;
  friendName: string;
  date: Date;
  timeSlots: {
    startTime: string;
    endTime: string;
    status: 'available' | 'busy' | 'maybe';
    activity?: string;
  }[];
}

// Mock recurring activities as requested
const mockRecurringActivities: RecurringActivity[] = [
  {
    id: 'bella-swimming-monday',
    title: 'Swimming - Bella',
    description: 'Weekly swimming lesson for Bella',
    dayOfWeek: 1, // Monday
    startTime: '09:30',
    endTime: '10:00',
    location: 'Local Swimming Pool',
    participants: ['Bella'],
    color: 'bg-blue-500',
    type: 'recurring',
    frequency: 'weekly',
  },
  {
    id: 'lily-swimming-saturday',
    title: 'Swimming - Lily',
    description: 'Weekly swimming lesson for Lily',
    dayOfWeek: 6, // Saturday
    startTime: '08:00',
    endTime: '08:30',
    location: 'Local Swimming Pool',
    participants: ['Lily'],
    color: 'bg-blue-600',
    type: 'recurring',
    frequency: 'weekly',
  },
  {
    id: 'tennis-lily',
    title: 'Tennis - Lily',
    description: 'Tennis lesson for Lily',
    dayOfWeek: 2, // Tuesday (assuming this is when tennis is)
    startTime: '09:19',
    endTime: '10:00',
    location: 'Tennis Club',
    participants: ['Lily'],
    color: 'bg-green-500',
    type: 'recurring',
    frequency: 'weekly',
  },
  {
    id: 'tennis-bella',
    title: 'Tennis - Bella',
    description: 'Tennis lesson for Bella',
    dayOfWeek: 2, // Tuesday (assuming this is when tennis is)
    startTime: '09:30',
    endTime: '10:00',
    location: 'Tennis Club',
    participants: ['Bella'],
    color: 'bg-green-600',
    type: 'recurring',
    frequency: 'weekly',
  },
  {
    id: 'art-class-lily',
    title: 'Art Class - Lily',
    description: 'Art class with friends Freya and Zadie',
    dayOfWeek: 3, // Wednesday
    startTime: '15:00',
    endTime: '16:30',
    location: 'Art Studio',
    participants: ['Lily'],
    friends: ['Freya', 'Zadie'],
    color: 'bg-purple-500',
    type: 'recurring',
    frequency: 'weekly',
  },
];

/**
 * Get all recurring activities
 */
export const getRecurringActivities = async (): Promise<RecurringActivity[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockRecurringActivities;
};

/**
 * Generate calendar appointments for a date range from recurring activities
 */
export const generateAppointmentsFromRecurring = async (
  startDate: Date,
  endDate: Date
): Promise<CalendarAppointment[]> => {
  const activities = await getRecurringActivities();
  const appointments: CalendarAppointment[] = [];
  
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    
    // Find recurring activities for this day of week
    const dayActivities = activities.filter(activity => activity.dayOfWeek === dayOfWeek);
    
    for (const activity of dayActivities) {
      const appointmentDate = new Date(currentDate);
      
      appointments.push({
        id: `${activity.id}-${appointmentDate.toISOString().split('T')[0]}`,
        title: activity.title,
        description: activity.description,
        date: appointmentDate,
        startTime: activity.startTime,
        endTime: activity.endTime,
        type: activity.type,
        location: activity.location,
        participants: activity.participants,
        color: activity.color,
        service: {
          category: 'sports', // Default category
        },
        friends: activity.friends || [],
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return appointments;
};

/**
 * Get friend availability for a specific date and time range
 */
export const getFriendAvailability = async (
  date: Date,
  startTime?: string,
  endTime?: string
): Promise<FriendAvailability[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // Mock friend availability data
  const friends = ['Freya', 'Zadie', 'Max', 'Sophie', 'Oliver'];
  
  return friends.map(friendName => ({
    friendId: friendName.toLowerCase(),
    friendName,
    date,
    timeSlots: [
      {
        startTime: '08:00',
        endTime: '12:00',
        status: (Math.random() > 0.3 ? 'available' : 'busy') as 'available' | 'busy' | 'maybe',
        activity: Math.random() > 0.7 ? 'Swimming' : undefined,
      },
      {
        startTime: '12:00',
        endTime: '17:00',
        status: (Math.random() > 0.4 ? 'available' : 'maybe') as 'available' | 'busy' | 'maybe',
        activity: Math.random() > 0.8 ? 'Art Class' : undefined,
      },
      {
        startTime: '17:00',
        endTime: '19:00',
        status: (Math.random() > 0.2 ? 'available' : 'busy') as 'available' | 'busy' | 'maybe',
      },
    ].filter(slot => {
      // If specific time range requested, filter relevant slots
      if (startTime && endTime) {
        return (
          slot.startTime <= endTime && 
          slot.endTime >= startTime
        );
      }
      return true;
    }),
  }));
};

/**
 * Check if friends are available for a specific time slot
 */
export const checkFriendAvailabilityForSlot = async (
  date: Date,
  startTime: string,
  endTime: string,
  friendIds: string[] = []
): Promise<{ [friendId: string]: 'available' | 'busy' | 'maybe' }> => {
  const availability = await getFriendAvailability(date, startTime, endTime);
  
  const result: { [friendId: string]: 'available' | 'busy' | 'maybe' } = {};
  
  for (const friendAvailability of availability) {
    if (friendIds.length === 0 || friendIds.includes(friendAvailability.friendId)) {
      // Find the most restrictive status for the requested time range
      const relevantSlots = friendAvailability.timeSlots.filter(slot =>
        slot.startTime <= endTime && slot.endTime >= startTime
      );
      
      if (relevantSlots.length === 0) {
        result[friendAvailability.friendId] = 'busy'; // No available slots
      } else {
        // If any slot is busy, friend is busy; if all available, friend is available; otherwise maybe
        const statuses = relevantSlots.map(slot => slot.status);
        if (statuses.includes('busy')) {
          result[friendAvailability.friendId] = 'busy';
        } else if (statuses.every(status => status === 'available')) {
          result[friendAvailability.friendId] = 'available';
        } else {
          result[friendAvailability.friendId] = 'maybe';
        }
      }
    }
  }
  
  return result;
};
