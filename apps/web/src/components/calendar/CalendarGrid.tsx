import {
  Button,
  Card,
  CardContent,
} from '@zygo/ui';
import {
  Clock,
  MapPin,
  MoreVertical,
  Plus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import type { CalendarAppointment, HolidayWeek } from '@zygo/types';

interface CalendarGridProps {
  week: HolidayWeek;
  appointments: CalendarAppointment[];
  onCreateAppointment: (timeSlot?: { date: Date; hour?: number }) => void;
  onEditAppointment: (appointment: CalendarAppointment) => void;
  onDeleteAppointment: (appointmentId: string) => void;
}

export const CalendarGrid = ({
  week,
  appointments,
  onCreateAppointment,
  onEditAppointment,
  onDeleteAppointment,
}: CalendarGridProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ date: Date; hour?: number } | null>(null);

  // Generate days of the week
  const days = [];
  const startDate = new Date(week.startDate);
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  // Time slots (8 AM to 8 PM)
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8);

  // Get appointments for a specific date and hour
  const getAppointmentsForSlot = (date: Date, hour?: number) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      const isSameDay = aptDate.toDateString() === date.toDateString();
      
      if (apt.type === 'full-day') {
        return isSameDay;
      }
      
      if (hour === undefined) return false;
      
      const aptHour = aptDate.getHours();
      const aptEndHour = new Date(apt.endTime).getHours();
      
      return isSameDay && hour >= aptHour && hour < aptEndHour;
    });
  };

  // Check if appointments overlap and need to be displayed side by side
  const getAppointmentPosition = (appointment: CalendarAppointment, slot: CalendarAppointment[]) => {
    const index = slot.findIndex(apt => apt.id === appointment.id);
    const total = slot.length;
    return { index, total };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getAppointmentColor = (appointment: CalendarAppointment) => {
    if (appointment.color) return appointment.color;
    
    switch (appointment.status) {
      case 'confirmed': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'tentative': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 border-gray-300 text-gray-600';
      default: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  const AppointmentCard = ({ appointment, position }: { 
    appointment: CalendarAppointment; 
    position: { index: number; total: number };
  }) => {
    const width = position.total > 1 ? `${Math.floor(100 / position.total)}%` : '100%';
    const left = position.total > 1 ? `${(position.index * 100) / position.total}%` : '0%';

    return (
      <div
        className={`absolute inset-x-0 p-1 cursor-pointer hover:shadow-md transition-shadow ${getAppointmentColor(appointment)}`}
        style={{ 
          width,
          left,
          top: '2px',
          bottom: '2px',
          borderRadius: '4px',
          border: '1px solid',
        }}
        onClick={() => onEditAppointment(appointment)}
      >
        <div className="text-xs font-medium truncate">
          {appointment.title}
        </div>
        <div className="text-xs opacity-75 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {appointment.type === 'full-day' ? 'All day' : formatTime(appointment.startTime)}
        </div>
        {appointment.location && (
          <div className="text-xs opacity-75 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{appointment.location}</span>
          </div>
        )}
        {(appointment.children.length > 0 || appointment.friends.length > 0) && (
          <div className="text-xs opacity-75 flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {appointment.children.length + appointment.friends.length}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-8 gap-px bg-gray-200 rounded-lg overflow-hidden min-w-[800px]">
        {/* Header row */}
        <div className="bg-gray-50 p-3 font-medium text-sm">Time</div>
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-gray-50 p-3 text-center">
            <div className="font-medium text-sm">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-xs text-gray-600">
              {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}

        {/* All-day row */}
        <div className="bg-white p-2 text-xs font-medium text-gray-600 border-b">
          All Day
        </div>
        {days.map((day, dayIndex) => {
          const allDayAppointments = getAppointmentsForSlot(day).filter(apt => apt.type === 'full-day');
          return (
            <div 
              key={`allday-${dayIndex}`} 
              className="bg-white p-1 min-h-[40px] relative border-b cursor-pointer hover:bg-gray-50"
              onClick={() => onCreateAppointment({ date: day })}
            >
              {allDayAppointments.map((appointment, aptIndex) => {
                const position = getAppointmentPosition(appointment, allDayAppointments);
                return (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    position={position}
                  />
                );
              })}
              {allDayAppointments.length === 0 && (
                <div className="flex items-center justify-center h-full opacity-0 hover:opacity-50">
                  <Plus className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
          );
        })}

        {/* Time slots */}
        {timeSlots.map((hour) => (
          <>
            <div key={`time-${hour}`} className="bg-white p-2 text-xs text-gray-600 font-medium">
              {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            {days.map((day, dayIndex) => {
              const slotAppointments = getAppointmentsForSlot(day, hour);
              return (
                <div 
                  key={`slot-${hour}-${dayIndex}`}
                  className="bg-white p-1 h-16 relative border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => onCreateAppointment({ date: day, hour })}
                >
                  {slotAppointments.map((appointment) => {
                    const position = getAppointmentPosition(appointment, slotAppointments);
                    return (
                      <AppointmentCard 
                        key={appointment.id} 
                        appointment={appointment} 
                        position={position}
                      />
                    );
                  })}
                  {slotAppointments.length === 0 && (
                    <div className="flex items-center justify-center h-full opacity-0 hover:opacity-50">
                      <Plus className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};
