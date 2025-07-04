import { Badge, Checkbox, Input } from '@zygo/ui';
import { Search } from 'lucide-react';
import React from 'react';

interface ServiceCategory {
  id: string;
  name: string;
}

interface ServiceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  serviceCategories: ServiceCategory[];
  applyToDiary: boolean;
  onApplyToDiaryChange: (apply: boolean) => void;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  serviceCategories,
  applyToDiary,
  onApplyToDiaryChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Categories</h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onCategoryChange('all')}
          >
            All
          </Badge>
          {serviceCategories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Apply to Diary Checkbox */}
      <div className="flex items-center space-x-2 pt-2 border-t">
        <Checkbox
          id="apply-to-diary"
          checked={applyToDiary}
          onCheckedChange={onApplyToDiaryChange}
        />
        <label htmlFor="apply-to-diary" className="text-sm text-gray-600">
          Apply filters to diary
        </label>
      </div>
    </div>
  );
};
