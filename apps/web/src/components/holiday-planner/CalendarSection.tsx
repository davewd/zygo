import { CalendarDays } from 'lucide-react';
import React from 'react';
import { CalendarGrid } from '../calendar/CalendarGrid';
import { CalendarNavigation } from './CalendarNavigation';
import { FiveColumnCalendar } from './FiveColumnCalendar';
import type { CalendarAppointment, CalendarPeriod, HolidayWeek } from './useHolidayPlannerData';

interface TimeSlot {
  date: Date;
  startHour?: number;
  startMinute?: number;
  endHour?: number;
  endMinute?: number;
  isAllDay?: boolean;
}

interface CalendarSectionProps {
  selectedWeek: HolidayWeek | null;
  currentPeriod: CalendarPeriod;
  onPeriodChange: (period: CalendarPeriod) => void;
  appointments: CalendarAppointment[];
  onCreateAppointment: (timeSlot?: TimeSlot) => void;
  onEditAppointment: (appointment: CalendarAppointment) => void;
  onDeleteAppointment: (appointmentId: string) => void;
  onTimeSlotSelect?: (timeSlot: TimeSlot) => void;
  use5ColumnView?: boolean;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedWeek,
  currentPeriod,
  onPeriodChange,
  appointments,
  onCreateAppointment,
  onEditAppointment,
  onDeleteAppointment,
  onTimeSlotSelect,
  use5ColumnView = true,
}) => {
  const formatPeriod = () => {
    if (use5ColumnView) {
      const start = currentPeriod.startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const end = currentPeriod.endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${start} - ${end}`;
    }

    return selectedWeek ? (
      <>
        {selectedWeek.startDate.toLocaleDateString()} - {selectedWeek.endDate.toLocaleDateString()}
      </>
    ) : (
      'Select a week to view calendar'
    );
  };

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center mb-2">
          <CalendarDays className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">
            {use5ColumnView ? 'Holiday Calendar' : selectedWeek?.name || 'Holiday Week'}
          </h3>
        </div>
        <p className="text-sm text-gray-600">{formatPeriod()}</p>
      </div>

      <div className="p-4">
        {/* Calendar Navigation for 5-column view */}
        {use5ColumnView && (
          <div className="mb-4">
            <CalendarNavigation currentPeriod={currentPeriod} onPeriodChange={onPeriodChange} />
          </div>
        )}

        {/* Calendar Content */}
        {use5ColumnView ? (
          <FiveColumnCalendar
            currentPeriod={currentPeriod}
            appointments={appointments}
            onCreateAppointment={onCreateAppointment}
            onEditAppointment={onEditAppointment}
            onDeleteAppointment={onDeleteAppointment}
            onTimeSlotSelect={onTimeSlotSelect}
          />
        ) : (
          <CalendarGrid
            week={selectedWeek}
            appointments={appointments}
            onCreateAppointment={onCreateAppointment}
            onEditAppointment={onEditAppointment}
            onDeleteAppointment={onDeleteAppointment}
          />
        )}
      </div>
    </div>
  );
};
