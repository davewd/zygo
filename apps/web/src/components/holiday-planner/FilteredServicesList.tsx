import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import type { ExtendedService, ActiveFilter } from './useHolidayPlannerData';

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
}

interface FilteredServicesListProps {
  services: ExtendedService[];
  friends: Friend[];
  activeFilters: ActiveFilter[];
  searchQuery: string;
}

export const FilteredServicesList: React.FC<FilteredServicesListProps> = ({
  services,
  friends,
  activeFilters,
  searchQuery,
}) => {
  // Apply advanced filtering based on active filters
  const filteredServices = services.filter((service) => {
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

    // Apply active filters
    for (const filter of activeFilters) {
      switch (filter.type) {
        case 'category':
          if (service.categoryId !== filter.value) return false;
          break;
        case 'duration':
          const [min, max] = filter.value as [number, number];
          if (!service.duration || service.duration < min || service.duration > max) return false;
          break;
        case 'friends':
          const friendIds = filter.value as string[];
          const hasCommonFriends = service.activeFriends?.some(friendId => 
            friendIds.includes(friendId)
          );
          if (!hasCommonFriends) return false;
          break;
        case 'location':
          if (!service.location?.toLowerCase().includes(filter.value.toLowerCase())) return false;
          break;
      }
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Available Services</h4>
        <span className="text-sm text-gray-500">
          {filteredServices.length} found
        </span>
      </div>
      
      <div className="max-h-96 overflow-y-auto space-y-3">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="font-medium truncate flex-1">{service.name}</h5>
              {service.duration && (
                <div className="flex items-center text-sm text-gray-500 ml-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration}min
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {service.description}
            </p>
            
            <div className="space-y-2">
              {service.provider && (
                <div className="flex items-center text-xs text-gray-500">
                  <Users className="h-3 w-3 mr-1" />
                  {service.provider}
                </div>
              )}
              
              {service.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {service.location}
                </div>
              )}
            </div>
            
            {service.activeFriends && service.activeFriends.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap mt-3">
                <span className="text-xs text-gray-500">Friends:</span>
                <div className="flex gap-1 flex-wrap">
                  {service.activeFriends.slice(0, 3).map((friendId: string) => {
                    const friend = friends.find(f => f.id === friendId);
                    return friend ? (
                      <span
                        key={friendId}
                        className="inline-block text-xs px-2 py-0.5 bg-gray-100 rounded-full"
                      >
                        {friend.firstName} {friend.lastName.charAt(0)}
                      </span>
                    ) : null;
                  })}
                  {service.activeFriends.length > 3 && (
                    <span className="inline-block text-xs px-2 py-0.5 border border-gray-300 rounded-full">
                      +{service.activeFriends.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {filteredServices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="h-8 w-8 opacity-50" />
            </div>
            <p className="font-medium">No services found</p>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};
