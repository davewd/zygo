import { Badge } from '@zygo/ui';
import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import React from 'react';

interface ExtendedService {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  duration?: number;
  provider?: string;
  location?: string;
  activeFriends?: string[];
}

interface ServiceCardProps {
  service: ExtendedService;
  friends: CurrentUser[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, friends }) => (
  <div className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-medium text-sm truncate">{service.name}</h4>
      <div className="text-xs text-gray-500">{service.duration}min</div>
    </div>
    <div className="text-xs text-gray-600 mb-2">
      <div className="truncate">{service.provider}</div>
      <div className="truncate">{service.location}</div>
    </div>
    {service.activeFriends && service.activeFriends.length > 0 && (
      <div className="flex items-center gap-1 flex-wrap">
        <span className="text-xs text-gray-500">Friends:</span>
        <div className="flex gap-1 flex-wrap">
          {service.activeFriends.slice(0, 3).map((friendId: string) => {
            const friend = friends.find((f) => f.id === friendId);
            return friend ? (
              <Badge key={friendId} variant="secondary" className="text-xs px-1.5 py-0.5 h-auto">
                {friend.firstName} {friend.lastName.charAt(0)}
              </Badge>
            ) : null;
          })}
          {service.activeFriends.length > 3 && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto">
              +{service.activeFriends.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    )}
  </div>
);
