import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
} from '@zygo/ui';
import {
  Calendar,
  Clock,
  Plus,
  Users,
  MessageCircle,
  Check,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { HolidayWeek, ConnectionAvailability, Child } from '@zygo/types';

interface ConnectionsAvailabilityProps {
  currentWeek: HolidayWeek;
  onCreatePlaydate: (timeSlot?: { date: Date; hour?: number }) => void;
}

export const ConnectionsAvailability = ({
  currentWeek,
  onCreatePlaydate,
}: ConnectionsAvailabilityProps) => {
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  // Mock connections data - in a real app this would come from your social network
  const connections: ConnectionAvailability[] = [
    {
      connectionId: '1',
      connectionName: 'Sarah Johnson',
      children: [
        { id: 'friend1', name: 'Sophie', age: 7, parentId: 'parent2' },
        { id: 'friend2', name: 'Max', age: 5, parentId: 'parent2' },
      ],
      availableSlots: [
        {
          id: '1',
          childId: 'friend1',
          startTime: new Date('2024-07-23T10:00:00'),
          endTime: new Date('2024-07-23T12:00:00'),
          status: 'available',
          description: 'Free morning for park activities',
        },
        {
          id: '2',
          childId: 'friend1',
          startTime: new Date('2024-07-24T14:00:00'),
          endTime: new Date('2024-07-24T16:00:00'),
          status: 'available',
          description: 'Available for indoor activities',
        },
      ],
      mutualFreeTime: [
        {
          startTime: new Date('2024-07-23T10:00:00'),
          endTime: new Date('2024-07-23T12:00:00'),
          overlappingChildren: [
            { id: 'friend1', name: 'Sophie', age: 7, parentId: 'parent2' },
          ],
        },
      ],
    },
    {
      connectionId: '2',
      connectionName: 'Mike Chen',
      children: [
        { id: 'friend3', name: 'Oliver', age: 8, parentId: 'parent3' },
      ],
      availableSlots: [
        {
          id: '3',
          childId: 'friend3',
          startTime: new Date('2024-07-22T15:00:00'),
          endTime: new Date('2024-07-22T18:00:00'),
          status: 'available',
          description: 'Sports activities welcome',
        },
        {
          id: '4',
          childId: 'friend3',
          startTime: new Date('2024-07-25T09:00:00'),
          endTime: new Date('2024-07-25T17:00:00'),
          status: 'available',
          description: 'Full day available',
        },
      ],
      mutualFreeTime: [
        {
          startTime: new Date('2024-07-25T10:00:00'),
          endTime: new Date('2024-07-25T15:00:00'),
          overlappingChildren: [
            { id: 'friend3', name: 'Oliver', age: 8, parentId: 'parent3' },
          ],
        },
      ],
    },
    {
      connectionId: '3',
      connectionName: 'Emma Davis',
      children: [
        { id: 'friend4', name: 'Lily', age: 6, parentId: 'parent4' },
        { id: 'friend5', name: 'Charlie', age: 9, parentId: 'parent4' },
      ],
      availableSlots: [
        {
          id: '5',
          childId: 'friend4',
          startTime: new Date('2024-07-24T10:00:00'),
          endTime: new Date('2024-07-24T12:00:00'),
          status: 'maybe',
          description: 'Tentative - depends on weather',
        },
      ],
      mutualFreeTime: [],
    },
  ];

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'maybe': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'busy': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const ConnectionCard = ({ connection }: { connection: ConnectionAvailability }) => (
    <Card className={`cursor-pointer transition-all ${
      selectedConnection === connection.connectionId 
        ? 'ring-2 ring-blue-500 shadow-lg' 
        : 'hover:shadow-md'
    }`}>
      <CardHeader 
        className="pb-3"
        onClick={() => setSelectedConnection(
          selectedConnection === connection.connectionId ? null : connection.connectionId
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <div className="h-full w-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                {connection.connectionName.split(' ').map(n => n[0]).join('')}
              </div>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{connection.connectionName}</CardTitle>
              <CardDescription>
                {connection.children.length} child{connection.children.length !== 1 ? 'ren' : ''}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {connection.mutualFreeTime?.length || 0} mutual slots
            </div>
            <div className="text-xs text-gray-500">
              {connection.availableSlots.length} total slots
            </div>
          </div>
        </div>
      </CardHeader>

      {selectedConnection === connection.connectionId && (
        <CardContent className="pt-0 space-y-4">
          {/* Children */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Children
            </h4>
            <div className="flex flex-wrap gap-2">
              {connection.children.map(child => (
                <Badge key={child.id} variant="outline">
                  {child.name} ({child.age})
                </Badge>
              ))}
            </div>
          </div>

          {/* Mutual Free Time */}
          {connection.mutualFreeTime && connection.mutualFreeTime.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" />
                Perfect Match Times
              </h4>
              <div className="space-y-2">
                {connection.mutualFreeTime.map((slot, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">
                          {formatDateTime(slot.startTime)} - {slot.endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                        <div className="text-xs text-gray-600">
                          Available children: {slot.overlappingChildren.map(c => c.name).join(', ')}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => onCreatePlaydate({ 
                          date: slot.startTime, 
                          hour: slot.startTime.getHours() 
                        })}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Available Slots */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              All Available Times
            </h4>
            <div className="space-y-2">
              {connection.availableSlots.map(slot => (
                <div 
                  key={slot.id}
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium text-sm">
                          {formatDateTime(slot.startTime)} - {slot.endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(slot.status)}
                        >
                          {slot.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {connection.children.find(c => c.id === slot.childId)?.name}
                      </div>
                      {slot.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {slot.description}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {/* Message functionality */}}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onCreatePlaydate({ 
                          date: slot.startTime, 
                          hour: slot.startTime.getHours() 
                        })}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Plan
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2 pt-3 border-t">
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );

  // Summary stats
  const totalMutualSlots = connections.reduce((sum, conn) => sum + (conn.mutualFreeTime?.length || 0), 0);
  const totalAvailableSlots = connections.reduce((sum, conn) => sum + conn.availableSlots.length, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Friend Network Availability
          </CardTitle>
          <CardDescription>
            See when your friends' children are available for playdates during {currentWeek.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{connections.length}</div>
              <div className="text-sm text-gray-600">Connected Families</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalMutualSlots}</div>
              <div className="text-sm text-gray-600">Perfect Match Times</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{totalAvailableSlots}</div>
              <div className="text-sm text-gray-600">Total Available Slots</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connections List */}
      <div className="space-y-4">
        {connections.map(connection => (
          <ConnectionCard key={connection.connectionId} connection={connection} />
        ))}
        
        {connections.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No connections found</h3>
              <p className="text-gray-500 mb-4">
                Connect with other families to see their availability and plan playdates together.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Find Families
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
