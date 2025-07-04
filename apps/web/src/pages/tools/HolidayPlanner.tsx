import { CalendarDays, Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { ConnectionsAvailability } from '../../components/calendar/ConnectionsAvailability';
import { AdvancedFilters } from '../../components/holiday-planner/AdvancedFilters';
import { CalendarSection } from '../../components/holiday-planner/CalendarSection';
import { EnhancedAppointmentDialog } from '../../components/holiday-planner/EnhancedAppointmentDialog';
import { FilteredServicesList } from '../../components/holiday-planner/FilteredServicesList';
import {
  useHolidayPlannerData,
  type CalendarAppointment,
  type ExtendedService,
} from '../../components/holiday-planner/useHolidayPlannerData';

const HolidayPlanner = () => {
  const {
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
  } = useHolidayPlannerData();

  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    date: Date;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    isAllDay?: boolean;
  } | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [activeTab, setActiveTab] = useState('calendar');
  const [applyFilterToDiary, setApplyFilterToDiary] = useState(false);
  const [filterTimeContext, setFilterTimeContext] = useState<{
    date?: Date;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    isAllDay?: boolean;
  } | null>(null);

  // State for filtering (legacy - to be migrated to activeFilters)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Create extended services with mock provider/location data for demo
  const extendedServices: ExtendedService[] = services.map((service) => ({
    ...service,
    provider: 'Local Provider', // In real app, this would come from service provider API
    location: 'Main Street', // In real app, this would come from service center API
    activeFriends: Math.random() > 0.7 ? [friends[0]?.id, friends[1]?.id].filter(Boolean) : [], // Mock active friends
  }));

  // Enhanced service filtering with time context support
  const filteredServices = extendedServices.filter((service) => {
    // Search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.provider?.toLowerCase().includes(searchLower) ||
        service.location?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const matchesCategory = service.categoryId === selectedCategory;
      if (!matchesCategory) return false;
    }

    // Time-based contextual filtering
    if (filterTimeContext) {
      // Filter based on time appropriateness
      if (filterTimeContext.isAllDay) {
        // For all-day activities, prefer services that are suitable for longer durations
        // In a real app, this would check service metadata for duration/time suitability
        const isAllDayAppropriate =
          service.name.toLowerCase().includes('camp') ||
          service.name.toLowerCase().includes('workshop') ||
          service.name.toLowerCase().includes('day') ||
          service.categoryId === 'education' ||
          service.categoryId === 'sports';
        if (!isAllDayAppropriate && Math.random() > 0.7) return false;
      } else if (filterTimeContext.startHour !== undefined) {
        // Filter based on time of day appropriateness
        const hour = filterTimeContext.startHour;

        // Morning activities (8-12)
        if (hour >= 8 && hour < 12) {
          const isMorningAppropriate =
            service.name.toLowerCase().includes('morning') ||
            service.name.toLowerCase().includes('breakfast') ||
            service.categoryId === 'education' ||
            service.categoryId === 'sports';
          if (!isMorningAppropriate && Math.random() > 0.8) return false;
        }

        // Afternoon activities (12-17)
        else if (hour >= 12 && hour < 17) {
          const isAfternoonAppropriate =
            service.name.toLowerCase().includes('lunch') ||
            service.name.toLowerCase().includes('afternoon') ||
            service.categoryId === 'recreation' ||
            service.categoryId === 'arts';
          if (!isAfternoonAppropriate && Math.random() > 0.8) return false;
        }

        // Evening activities (17+)
        else if (hour >= 17) {
          const isEveningAppropriate =
            service.name.toLowerCase().includes('dinner') ||
            service.name.toLowerCase().includes('evening') ||
            service.categoryId === 'entertainment';
          if (!isEveningAppropriate && Math.random() > 0.8) return false;
        }
      }
    }

    return true;
  });

  // Filter appointments for diary if enabled
  const filteredAppointments = applyFilterToDiary
    ? appointments.filter((apt) => {
        if (searchQuery.trim()) {
          const searchLower = searchQuery.toLowerCase();
          return (
            apt.title.toLowerCase().includes(searchLower) ||
            apt.location.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
    : appointments;

  const handleCreateAppointment = (timeSlot?: {
    date: Date;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    isAllDay?: boolean;
  }) => {
    setSelectedAppointment(null);
    setSelectedTimeSlot(timeSlot || null);
    setFilterTimeContext(timeSlot || null); // Set filter context to match selected time
    setShowAppointmentDialog(true);
  };

  const handleTimeSlotSelection = (timeSlot: {
    date: Date;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    isAllDay?: boolean;
  }) => {
    // Allow users to select time slots just for filtering without opening dialog
    setFilterTimeContext(timeSlot);
  };

  const clearTimeContext = () => {
    setFilterTimeContext(null);
  };

  const handleEditAppointment = (appointment: CalendarAppointment) => {
    setSelectedAppointment(appointment);
    setSelectedTimeSlot(null);
    setShowAppointmentDialog(true);
  };

  const handleSaveAppointment = (appointment: CalendarAppointment) => {
    if (selectedAppointment) {
      setAppointments((prev) => prev.map((apt) => (apt.id === appointment.id ? appointment : apt)));
    } else {
      setAppointments((prev) => [...prev, { ...appointment, id: Date.now().toString() }]);
    }
    setShowAppointmentDialog(false);
    setSelectedAppointment(null);
    setSelectedTimeSlot(null);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading holiday planner...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Holiday Planner</h1>
            <p className="text-gray-600 mt-1">
              Manage activities and playdates for your children's holiday weeks
            </p>
          </div>
          <button
            onClick={() => handleCreateAppointment()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Activity
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'calendar'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar & Services
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'connections'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Friend Availability
            </button>
          </nav>
        </div>

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <CalendarSection
                  selectedWeek={selectedWeek}
                  currentPeriod={currentPeriod}
                  onPeriodChange={setCurrentPeriod}
                  appointments={filteredAppointments}
                  onCreateAppointment={handleCreateAppointment}
                  onEditAppointment={handleEditAppointment}
                  onDeleteAppointment={handleDeleteAppointment}
                  onTimeSlotSelect={handleTimeSlotSelection}
                  use5ColumnView={true}
                />
              </div>

              <div className="space-y-4">
                <AdvancedFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeFilters={activeFilters}
                  onFiltersChange={setActiveFilters}
                  serviceCategories={serviceCategories}
                  friends={friends}
                  applyToDiary={applyFilterToDiary}
                  onApplyToDiaryChange={setApplyFilterToDiary}
                  timeContext={filterTimeContext}
                  onClearTimeContext={clearTimeContext}
                />

                <FilteredServicesList
                  services={filteredServices}
                  friends={friends}
                  activeFilters={activeFilters}
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <ConnectionsAvailability
              currentWeek={selectedWeek}
              onCreatePlaydate={handleCreateAppointment}
            />
          </div>
        )}
      </div>

      <EnhancedAppointmentDialog
        isOpen={showAppointmentDialog}
        onClose={() => {
          setShowAppointmentDialog(false);
          setSelectedAppointment(null);
          setSelectedTimeSlot(null);
        }}
        appointment={selectedAppointment}
        friends={friends}
        timeSlot={selectedTimeSlot}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default HolidayPlanner;
