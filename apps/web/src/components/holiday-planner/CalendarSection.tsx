import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { CalendarGrid } from '../calendar/CalendarGrid';
import type { HolidayWeek, CalendarAppointment } from './useHolidayPlannerData';

interface CalendarSectionProps {
  selectedWeek: HolidayWeek | null;
  appointments: CalendarAppointment[];
  onCreateAppointment: (timeSlot?: { date: Date; hour?: number }) => void;
  onEditAppointment: (appointment: CalendarAppointment) => void;
  onDeleteAppointment: (appointmentId: string) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedWeek,
  appointments,
  onCreateAppointment,
  onEditAppointment,
  onDeleteAppointment,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          {selectedWeek?.name || 'Holiday Week'}
        </CardTitle>
        <CardDescription>
          {selectedWeek ? (
            <>
              {selectedWeek.startDate.toLocaleDateString()} -{' '}
              {selectedWeek.endDate.toLocaleDateString()}
            </>
          ) : 'Select a week to view calendar'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarGrid
          week={selectedWeek}
          appointments={appointments}
          onCreateAppointment={onCreateAppointment}
          onEditAppointment={onEditAppointment}
          onDeleteAppointment={onDeleteAppointment}
        />
      </CardContent>
    </Card>
  );
};
