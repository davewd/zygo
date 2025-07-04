import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { CalendarAppointment, HolidayWeek } from '../holiday-planner/useHolidayPlannerData';

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface EnhancedAppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: CalendarAppointment | null;
  week?: HolidayWeek | null;
  friends: Friend[];
  timeSlot?: { date: Date; hour?: number; isAllDay?: boolean };
  onSave: (appointment: CalendarAppointment) => void;
}

const DEFAULT_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-teal-500',
];

export const EnhancedAppointmentDialog: React.FC<EnhancedAppointmentDialogProps> = ({
  isOpen,
  onClose,
  appointment,
  week,
  friends,
  timeSlot,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    isAllDay: false,
    selectedFriends: [] as string[],
    color: 'bg-blue-500',
    type: 'activity',
  });

  useEffect(() => {
    if (isOpen) {
      if (appointment) {
        // Editing existing appointment
        setFormData({
          title: appointment.title,
          description: appointment.description || '',
          location: appointment.location,
          date: new Date(appointment.date),
          startTime: appointment.startTime === 'All Day' ? '09:00' : appointment.startTime,
          endTime: appointment.endTime === 'All Day' ? '10:00' : appointment.endTime,
          isAllDay: appointment.startTime === 'All Day',
          selectedFriends: appointment.participants || [],
          color: appointment.color,
          type: appointment.type,
        });
      } else if (timeSlot) {
        // Creating new appointment from time slot
        const defaultEndHour = timeSlot.hour !== undefined ? timeSlot.hour + 1 : 10;
        setFormData({
          title: '',
          description: '',
          location: '',
          date: timeSlot.date,
          startTime:
            timeSlot.hour !== undefined
              ? `${timeSlot.hour.toString().padStart(2, '0')}:00`
              : '09:00',
          endTime: `${defaultEndHour.toString().padStart(2, '0')}:00`,
          isAllDay: timeSlot.isAllDay || false,
          selectedFriends: [],
          color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
          type: 'activity',
        });
      } else {
        // Default new appointment
        setFormData({
          title: '',
          description: '',
          location: '',
          date: new Date(),
          startTime: '09:00',
          endTime: '10:00',
          isAllDay: false,
          selectedFriends: [],
          color: 'bg-blue-500',
          type: 'activity',
        });
      }
    }
  }, [isOpen, appointment, timeSlot]);

  const handleFriendToggle = (friendId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFriends: prev.selectedFriends.includes(friendId)
        ? prev.selectedFriends.filter((id) => id !== friendId)
        : [...prev.selectedFriends, friendId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment: CalendarAppointment = {
      id: appointment?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.isAllDay ? 'All Day' : formData.startTime,
      endTime: formData.isAllDay ? 'All Day' : formData.endTime,
      type: formData.type,
      location: formData.location,
      participants: formData.selectedFriends,
      color: formData.color,
    };

    onSave(newAppointment);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {appointment ? 'Edit Activity' : 'New Activity'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter activity title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Activity description"
              rows={3}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Where is this activity?"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date.toISOString().split('T')[0]}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: new Date(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.isAllDay}
              onChange={(e) => setFormData((prev) => ({ ...prev, isAllDay: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
              All Day Activity
            </label>
          </div>

          {/* Time Selection */}
          {!formData.isAllDay && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Friends Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
            <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
              {friends.length > 0 ? (
                <div className="space-y-2">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                        formData.selectedFriends.includes(friend.id)
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleFriendToggle(friend.id)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium">
                          {friend.firstName.charAt(0)}
                          {friend.lastName.charAt(0)}
                        </div>
                        <span className="text-sm">
                          {friend.firstName} {friend.lastName}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.selectedFriends.includes(friend.id)}
                        onChange={() => handleFriendToggle(friend.id)}
                        className="rounded border-gray-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No friends available to invite
                </p>
              )}
            </div>
          </div>

          {/* Selected Friends Display */}
          {formData.selectedFriends.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Participants ({formData.selectedFriends.length})
              </label>
              <div className="flex flex-wrap gap-1">
                {formData.selectedFriends.map((friendId) => {
                  const friend = friends.find((f) => f.id === friendId);
                  return friend ? (
                    <span
                      key={friendId}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {friend.firstName} {friend.lastName.charAt(0)}
                      <button
                        type="button"
                        onClick={() => handleFriendToggle(friendId)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Color</label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full ${color} ${
                    formData.color === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {appointment ? 'Update Activity' : 'Create Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
