import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { Search } from 'lucide-react';
import React from 'react';
import { ServiceCard } from './ServiceCard';

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

interface ServiceListProps {
  services: ExtendedService[];
  friends: CurrentUser[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services, friends }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Available Services</h4>
        <span className="text-xs text-gray-500">{services.length} found</span>
      </div>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} friends={friends} />
        ))}
        {services.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No services found</p>
          </div>
        )}
      </div>
    </div>
  );
};
