import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { CalendarDays } from 'lucide-react';
import type { CalendarPeriod, CalendarAppointment } from './useHolidayPlannerData';

interface FiveColumnCalendarProps {
  currentPeriod: CalendarPeriod;
  appointments: CalendarAppointment[];
  onCreateAppointment: (timeSlot?: { date: Date; hour?: number }) => void;
  onEditAppointment: (appointment: CalendarAppointment) => void;
  onDeleteAppointment: (appointmentId: string) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8 AM to 7 PM

export const FiveColumnCalendar: React.FC<FiveColumnCalendarProps> = ({
  currentPeriod,
  appointments,
  onCreateAppointment,
  onEditAppointment,
  onDeleteAppointment,
}) => {
  const getAppointmentsForDateAndHour = (date: Date, hour: number) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      const aptHour = parseInt(apt.startTime.split(':')[0]);
      return (
        aptDate.toDateString() === date.toDateString() &&
        aptHour === hour
      );
    });
  };

  const formatDayHeader = (date: Date) => {
    return {
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday: date.toDateString() === new Date().toDateString(),
    };
  };

  const formatHour = (hour: number) => {
    return hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
  };

  return (
    <div className="w-full">
      {/* Calendar Grid */}
      <div className="border rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-6 bg-gray-50 border-b">
          <div className="p-3 text-sm font-medium text-gray-500">Time</div>
          {currentPeriod.columns.map((date, index) => {
            const dayInfo = formatDayHeader(date);
            return (
              <div 
                key={index} 
                className={`p-3 text-center border-l ${
                  dayInfo.isToday ? 'bg-blue-50 text-blue-900' : ''
                }`}
              >
                <div className="text-sm font-medium">{dayInfo.dayName}</div>
                <div className={`text-lg font-bold ${
                  dayInfo.isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {dayInfo.dayNumber}
                </div>
              </div>
            );
          })}
        </div>

        {/* Time Slots */}
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-6 border-b last:border-b-0 hover:bg-gray-25">
            {/* Time Column */}
            <div className="p-3 text-sm text-gray-500 bg-gray-50 border-r">
              {formatHour(hour)}
            </div>
            
            {/* Day Columns */}
            {currentPeriod.columns.map((date, dayIndex) => {
              const dayAppointments = getAppointmentsForDateAndHour(date, hour);
              
              return (
                <div
                  key={dayIndex}
                  className="p-2 border-l min-h-[60px] cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onCreateAppointment({ date, hour })}
                >
                  <div className="space-y-1">
                    {dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`text-xs p-2 rounded text-white cursor-pointer ${appointment.color} 
                          hover:opacity-80 transition-opacity`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditAppointment(appointment);
                        }}
                      >
                        <div className="font-medium truncate">{appointment.title}</div>
                        <div className="text-xs opacity-90 truncate">{appointment.location}</div>
                        {appointment.participants.length > 0 && (
                          <div className="text-xs opacity-75">
                            {appointment.participants.slice(0, 2).join(', ')}
                            {appointment.participants.length > 2 && ` +${appointment.participants.length - 2}`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No activities scheduled</p>
          <p className="text-sm">Click on any time slot to add an activity</p>
        </div>
      )}
    </div>
  );
};
