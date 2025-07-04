import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import React from 'react';
import type { CalendarPeriod } from './useHolidayPlannerData';

interface CalendarNavigationProps {
  currentPeriod: CalendarPeriod;
  onPeriodChange: (period: CalendarPeriod) => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentPeriod,
  onPeriodChange,
}) => {
  const navigateByDays = (days: number) => {
    const newStartDate = new Date(currentPeriod.startDate);
    newStartDate.setDate(newStartDate.getDate() + days);

    const newColumns = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(newStartDate);
      date.setDate(newStartDate.getDate() + i);
      return date;
    });

    const newPeriod: CalendarPeriod = {
      startDate: newColumns[0],
      endDate: newColumns[4],
      type: 'week',
      columns: newColumns,
    };

    onPeriodChange(newPeriod);
  };

  const goToToday = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday start

    const newColumns = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    const newPeriod: CalendarPeriod = {
      startDate: newColumns[0],
      endDate: newColumns[4],
      type: 'week',
      columns: newColumns,
    };

    onPeriodChange(newPeriod);
  };

  const formatPeriod = () => {
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
  };

  const buttonClass =
    'flex items-center justify-center w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer transition-colors';

  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className={buttonClass} onClick={() => navigateByDays(-7)} title="Previous Week">
          <ArrowLeft className="h-4 w-4" />
        </div>

        <div className={buttonClass} onClick={() => navigateByDays(-1)} title="Previous Day">
          <ChevronLeft className="h-4 w-4" />
        </div>

        <div
          className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={goToToday}
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">Today</span>
        </div>

        <div className={buttonClass} onClick={() => navigateByDays(1)} title="Next Day">
          <ChevronRight className="h-4 w-4" />
        </div>

        <div className={buttonClass} onClick={() => navigateByDays(7)} title="Next Week">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{formatPeriod()}</span>
      </div>
    </div>
  );
};
