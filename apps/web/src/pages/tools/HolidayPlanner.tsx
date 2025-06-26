import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@zygo/ui';
import {
  CalendarDays,
  Clock,
  Filter,
  MapPin,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { CalendarGrid } from '../../components/calendar/CalendarGrid';
import { AppointmentDialog } from '../../components/calendar/AppointmentDialog';
import { ServiceFilter } from '../../components/calendar/ServiceFilter';
import { ConnectionsAvailability } from '../../components/calendar/ConnectionsAvailability';
import type { CalendarAppointment, HolidayWeek, ServiceFilter as ServiceFilterType } from '@zygo/types';

const HolidayPlanner = () => {
  const [selectedWeek, setSelectedWeek] = useState<HolidayWeek | null>(null);
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [serviceFilter, setServiceFilter] = useState<ServiceFilterType>({
    categories: [],
  });
  const [activeTab, setActiveTab] = useState('calendar');

  // Mock data for now - in a real app this would come from your data store
  const currentWeek: HolidayWeek = {
    id: '1',
    name: 'Summer Holiday Week 1',
    startDate: new Date('2025-07-22'),
    endDate: new Date('2025-07-28'),
    children: [
      { id: '1', name: 'Emma', age: 8, parentId: 'user1' },
      { id: '2', name: 'James', age: 6, parentId: 'user1' },
    ],
    appointments: appointments,
  };

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
      setAppointments(prev => prev.map(apt => apt.id === appointment.id ? appointment : apt));
    } else {
      setAppointments(prev => [...prev, { ...appointment, id: Date.now().toString() }]);
    }
    setShowAppointmentDialog(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="services">
            <Search className="h-4 w-4 mr-2" />
            Find Services
          </TabsTrigger>
          <TabsTrigger value="connections">
            <Users className="h-4 w-4 mr-2" />
            Friend Availability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2" />
                    {currentWeek.name}
                  </CardTitle>
                  <CardDescription>
                    {currentWeek.startDate.toLocaleDateString()} - {currentWeek.endDate.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarGrid
                    week={currentWeek}
                    appointments={appointments}
                    onCreateAppointment={handleCreateAppointment}
                    onEditAppointment={handleEditAppointment}
                    onDeleteAppointment={handleDeleteAppointment}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <ServiceFilter
                filter={serviceFilter}
                onFilterChange={setServiceFilter}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ServiceFilter
                filter={serviceFilter}
                onFilterChange={setServiceFilter}
                expanded={true}
              />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Nearby Activities
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Available Time Slots
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <ConnectionsAvailability
            currentWeek={currentWeek}
            onCreatePlaydate={handleCreateAppointment}
          />
        </TabsContent>
      </Tabs>

      <AppointmentDialog
        isOpen={showAppointmentDialog}
        onClose={() => setShowAppointmentDialog(false)}
        appointment={selectedAppointment}
        week={currentWeek}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default HolidayPlanner;
