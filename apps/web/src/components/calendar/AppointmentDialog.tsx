import type { CalendarAppointment, Friend, HolidayWeek } from '@zygo/types';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@zygo/ui';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: CalendarAppointment | null;
  week: HolidayWeek;
  onSave: (appointment: CalendarAppointment) => void;
}

export const AppointmentDialog = ({
  isOpen,
  onClose,
  appointment,
  week,
  onSave,
}: AppointmentDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    type: 'timed' as CalendarAppointment['type'],
    status: 'confirmed' as CalendarAppointment['status'],
    notes: '',
  });

  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // Mock friends data - in a real app this would come from connections
  const availableFriends: Friend[] = [
    {
      id: 'friend1',
      name: 'Sophie',
      age: 7,
      parentId: 'parent2',
      parentName: 'Sarah Johnson',
      relationship: 'friend',
    },
    {
      id: 'friend2',
      name: 'Oliver',
      age: 8,
      parentId: 'parent3',
      parentName: 'Mike Chen',
      relationship: 'neighbor',
    },
    {
      id: 'friend3',
      name: 'Lily',
      age: 6,
      parentId: 'parent4',
      parentName: 'Emma Davis',
      relationship: 'classmate',
    },
  ];

  useEffect(() => {
    if (appointment) {
      const startDate = new Date(appointment.startTime);
      const endDate = new Date(appointment.endTime);

      setFormData({
        title: appointment.title,
        location: appointment.location,
        startDate: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().substring(0, 5),
        endDate: endDate.toISOString().split('T')[0],
        endTime: endDate.toTimeString().substring(0, 5),
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes || '',
      });

      setSelectedChildren(appointment.children.map((c) => c.id));
      setSelectedFriends(appointment.friends.map((f) => f.id));
    } else {
      // Reset form for new appointment
      const now = new Date();
      const defaultDate = now.toISOString().split('T')[0];
      const defaultTime = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      setFormData({
        title: '',
        location: '',
        startDate: defaultDate,
        startTime: defaultTime,
        endDate: defaultDate,
        endTime: defaultTime,
        type: 'timed',
        status: 'confirmed',
        notes: '',
      });

      setSelectedChildren([]);
      setSelectedFriends([]);
    }
  }, [appointment, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime =
      formData.type === 'full-day'
        ? new Date(formData.startDate)
        : new Date(`${formData.startDate}T${formData.startTime}`);

    const endDateTime =
      formData.type === 'full-day'
        ? new Date(formData.endDate || formData.startDate)
        : new Date(`${formData.endDate || formData.startDate}T${formData.endTime}`);

    // If full-day, set to start and end of day
    if (formData.type === 'full-day') {
      startDateTime.setHours(0, 0, 0, 0);
      endDateTime.setHours(23, 59, 59, 999);
    }

    const selectedChildrenData = week.children.filter((c) => selectedChildren.includes(c.id));
    const selectedFriendsData = availableFriends.filter((f) => selectedFriends.includes(f.id));

    const appointmentData: CalendarAppointment = {
      id: appointment?.id || '',
      title: formData.title,
      location: formData.location,
      startTime: startDateTime,
      endTime: endDateTime,
      type: formData.type,
      status: formData.status,
      children: selectedChildrenData,
      friends: selectedFriendsData,
      notes: formData.notes,
    };

    onSave(appointmentData);
  };

  const handleChildToggle = (childId: string) => {
    setSelectedChildren((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]
    );
  };

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{appointment ? 'Edit Activity' : 'Create New Activity'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Swimming lessons, Playground meetup"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Community Pool, Central Park"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">Activity Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: CalendarAppointment['type']) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="timed">Specific Time</SelectItem>
                  <SelectItem value="half-day">Half Day</SelectItem>
                  <SelectItem value="full-day">Full Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {formData.type !== 'full-day' && (
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, startTime: e.target.value }))
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {formData.type !== 'full-day' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate || formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Participants */}
          <div className="space-y-4">
            <div>
              <Label className="flex items-center mb-3">
                <Users className="h-4 w-4 mr-2" />
                Your Children
              </Label>
              <div className="space-y-2">
                {week.children.map((child) => (
                  <div key={child.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`child-${child.id}`}
                      checked={selectedChildren.includes(child.id)}
                      onCheckedChange={() => handleChildToggle(child.id)}
                    />
                    <Label htmlFor={`child-${child.id}`} className="flex-1">
                      {child.name} ({child.age} years old)
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="flex items-center mb-3">
                <Users className="h-4 w-4 mr-2" />
                Friends
              </Label>
              <div className="space-y-2">
                {availableFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`friend-${friend.id}`}
                      checked={selectedFriends.includes(friend.id)}
                      onCheckedChange={() => handleFriendToggle(friend.id)}
                    />
                    <Label htmlFor={`friend-${friend.id}`} className="flex-1">
                      {friend.name} ({friend.age} years old) - {friend.parentName}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: CalendarAppointment['status']) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="tentative">Tentative</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional details about the activity..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{appointment ? 'Update Activity' : 'Create Activity'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
