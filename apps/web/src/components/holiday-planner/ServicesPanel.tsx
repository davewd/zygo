import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { ServiceFilters } from './ServiceFilters';
import { ServiceList } from './ServiceList';
import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';

interface ServiceCategory {
  id: string;
  name: string;
}

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

interface ServicesPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  serviceCategories: ServiceCategory[];
  applyToDiary: boolean;
  onApplyToDiaryChange: (apply: boolean) => void;
  filteredServices: ExtendedService[];
  friends: CurrentUser[];
}

export const ServicesPanel: React.FC<ServicesPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  serviceCategories,
  applyToDiary,
  onApplyToDiaryChange,
  filteredServices,
  friends,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Find Services & Activities
        </CardTitle>
        <CardDescription>
          Discover activities that match your children's interests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ServiceFilters
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          serviceCategories={serviceCategories}
          applyToDiary={applyToDiary}
          onApplyToDiaryChange={onApplyToDiaryChange}
        />
        <ServiceList services={filteredServices} friends={friends} />
      </CardContent>
    </Card>
  );
};
