import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@zygo/ui';
import { CalendarDays, Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { AppointmentDialog } from '../../components/calendar/AppointmentDialog';
import { ConnectionsAvailability } from '../../components/calendar/ConnectionsAvailability';
import { CalendarSection } from '../../components/holiday-planner/CalendarSection';
import { ServicesPanel } from '../../components/holiday-planner/ServicesPanel';
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
  } = useHolidayPlannerData();

  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [activeTab, setActiveTab] = useState('calendar');
  const [applyFilterToDiary, setApplyFilterToDiary] = useState(false);

  // State for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Create extended services with mock provider/location data for demo
  const extendedServices: ExtendedService[] = services.map((service) => ({
    ...service,
    provider: 'Local Provider', // In real app, this would come from service provider API
    location: 'Main Street', // In real app, this would come from service center API
    activeFriends: Math.random() > 0.7 ? [friends[0]?.id, friends[1]?.id].filter(Boolean) : [], // Mock active friends
  }));

  // Filter services based on search and category
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

  const handleCreateAppointment = (timeSlot?: { date: Date; hour?: number }) => {
    setSelectedAppointment(null);
    setShowAppointmentDialog(true);
  };

  const handleEditAppointment = (appointment: CalendarAppointment) => {
    setSelectedAppointment(appointment);
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
          <Button onClick={() => handleCreateAppointment()}>
            <Plus className="h-4 w-4 mr-2" />
            New Activity
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar & Services
          </TabsTrigger>
          <TabsTrigger value="connections">
            <Users className="h-4 w-4 mr-2" />
            Friend Availability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <CalendarSection
                selectedWeek={selectedWeek}
                appointments={filteredAppointments}
                onCreateAppointment={handleCreateAppointment}
                onEditAppointment={handleEditAppointment}
                onDeleteAppointment={handleDeleteAppointment}
              />
            </div>

            <div className="space-y-4">
              <ServicesPanel
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                serviceCategories={serviceCategories}
                applyToDiary={applyFilterToDiary}
                onApplyToDiaryChange={setApplyFilterToDiary}
                filteredServices={filteredServices}
                friends={friends}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <ConnectionsAvailability
            currentWeek={selectedWeek}
            onCreatePlaydate={handleCreateAppointment}
          />
        </TabsContent>
      </Tabs>

      <AppointmentDialog
        isOpen={showAppointmentDialog}
        onClose={() => setShowAppointmentDialog(false)}
        appointment={selectedAppointment}
        week={selectedWeek}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default HolidayPlanner;
