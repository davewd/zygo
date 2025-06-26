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
  Badge,
  Checkbox,
} from '@zygo/ui';
import {
  Clock,
  MapPin,
  Search,
  Filter,
  X,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import type { CalendarService, ServiceFilter as ServiceFilterType } from '@zygo/types';

interface ServiceFilterProps {
  filter: ServiceFilterType;
  onFilterChange: (filter: ServiceFilterType) => void;
  expanded?: boolean;
}

export const ServiceFilter = ({
  filter,
  onFilterChange,
  expanded = false,
}: ServiceFilterProps) => {
  const [localSearchText, setLocalSearchText] = useState(filter.searchText || '');

  // Mock services data - in a real app this would come from your data store
  const availableServices: CalendarService[] = [
    {
      id: '1',
      name: 'Swimming Lessons',
      category: 'sport',
      description: 'Learn to swim in a safe environment',
      provider: 'AquaFun Center',
      location: 'Main Street Pool',
      duration: 60,
      ageRange: { min: 4, max: 12 },
      tags: ['water', 'fitness', 'skills'],
    },
    {
      id: '2',
      name: 'Art Workshop',
      category: 'education',
      description: 'Creative art sessions for children',
      provider: 'Creative Kids Studio',
      location: 'Downtown Art Center',
      duration: 90,
      ageRange: { min: 5, max: 10 },
      tags: ['creative', 'indoor', 'learning'],
    },
    {
      id: '3',
      name: 'Nature Walk',
      category: 'outdoor',
      description: 'Explore local wildlife and plants',
      provider: 'Nature Guides',
      location: 'Riverside Park',
      duration: 120,
      ageRange: { min: 3, max: 15 },
      tags: ['nature', 'exercise', 'educational'],
    },
    {
      id: '4',
      name: 'Science Lab',
      category: 'education',
      description: 'Hands-on science experiments',
      provider: 'Mad Scientists',
      location: 'Community Center',
      duration: 75,
      ageRange: { min: 6, max: 12 },
      tags: ['science', 'experiments', 'learning'],
    },
    {
      id: '5',
      name: 'Football Training',
      category: 'sport',
      description: 'Learn football skills and teamwork',
      provider: 'Youth Sports Club',
      location: 'Sports Complex',
      duration: 90,
      ageRange: { min: 7, max: 14 },
      tags: ['team sport', 'fitness', 'outdoor'],
    },
  ];

  const categories = [
    { id: 'activity', label: 'Activity', count: 2 },
    { id: 'sport', label: 'Sport', count: 3 },
    { id: 'education', label: 'Education', count: 4 },
    { id: 'entertainment', label: 'Entertainment', count: 1 },
    { id: 'outdoor', label: 'Outdoor', count: 3 },
    { id: 'indoor', label: 'Indoor', count: 2 },
  ];

  const handleCategoryToggle = (category: string) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter(c => c !== category)
      : [...filter.categories, category];
    
    onFilterChange({ ...filter, categories: newCategories });
  };

  const handleSearchSubmit = () => {
    onFilterChange({ ...filter, searchText: localSearchText });
  };

  const handleClearFilters = () => {
    setLocalSearchText('');
    onFilterChange({
      categories: [],
      searchText: '',
    });
  };

  const filteredServices = availableServices.filter(service => {
    // Category filter
    if (filter.categories.length > 0 && !filter.categories.includes(service.category)) {
      return false;
    }
    
    // Text search
    if (filter.searchText) {
      const searchLower = filter.searchText.toLowerCase();
      return (
        service.name.toLowerCase().includes(searchLower) ||
        service.description?.toLowerCase().includes(searchLower) ||
        service.provider?.toLowerCase().includes(searchLower) ||
        service.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  const ServiceCard = ({ service }: { service: CalendarService }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{service.name}</CardTitle>
            <CardDescription className="flex items-center text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {service.location}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="capitalize">
            {service.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {service.tags?.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {service.duration} min
          </div>
          {service.ageRange && (
            <div>
              Ages {service.ageRange.min}-{service.ageRange.max}
            </div>
          )}
        </div>
        
        {service.provider && (
          <div className="text-xs text-gray-400 mt-2">
            by {service.provider}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!expanded) {
    // Compact version for sidebar
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Service Finder
          </CardTitle>
          <CardDescription>
            Find activities that fit your schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search activities..."
              value={localSearchText}
              onChange={(e) => setLocalSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Categories</h4>
            <div className="space-y-1">
              {categories.slice(0, 4).map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filter.categories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm flex-1">
                    {category.label} ({category.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleSearchSubmit} className="flex-1">
              <Search className="h-3 w-3 mr-1" />
              Search
            </Button>
            <Button size="sm" variant="outline" onClick={handleClearFilters}>
              <X className="h-3 w-3" />
            </Button>
          </div>

          {filteredServices.length > 0 && (
            <div className="text-sm text-gray-600">
              {filteredServices.length} services found
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Expanded version for main content
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Find Services & Activities
          </CardTitle>
          <CardDescription>
            Discover activities that match your children's interests and your schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for activities, providers, or locations..."
              value={localSearchText}
              onChange={(e) => setLocalSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
                className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all ${
                  filter.categories.includes(category.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{category.label}</div>
                <div className="text-xs text-gray-500">{category.count} services</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearchSubmit}>
              <Search className="h-4 w-4 mr-2" />
              Search Services
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Available Services ({filteredServices.length})
          </CardTitle>
          <CardDescription>
            Click on any service to see available time slots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No services found matching your criteria.</p>
              <p className="text-sm">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
