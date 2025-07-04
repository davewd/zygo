import React, { useState } from 'react';
import { Badge, Checkbox, Input } from '@zygo/ui';
import { Search, Filter, X, Settings, Save, RotateCcw } from 'lucide-react';
import type { ActiveFilter, FilterOption } from './useHolidayPlannerData';

interface ServiceCategory {
  id: string;
  name: string;
}

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
}

interface AdvancedFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: ActiveFilter[];
  onFiltersChange: (filters: ActiveFilter[]) => void;
  serviceCategories: ServiceCategory[];
  friends: Friend[];
  applyToDiary: boolean;
  onApplyToDiaryChange: (apply: boolean) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFiltersChange,
  serviceCategories,
  friends,
  applyToDiary,
  onApplyToDiaryChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [durationRange, setDurationRange] = useState([30, 180]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // Quick filter categories
  const quickFilters = [
    { id: 'sports', label: 'Sports', count: 12 },
    { id: 'arts', label: 'Arts', count: 8 },
    { id: 'outdoor', label: 'Outdoor', count: 15 },
    { id: 'indoor', label: 'Indoor', count: 10 },
    { id: 'educational', label: 'Educational', count: 6 },
  ];

  const addFilter = (type: ActiveFilter['type'], value: any, label: string) => {
    const newFilter: ActiveFilter = {
      id: `${type}-${Date.now()}`,
      type,
      value,
      label,
    };
    
    // Remove existing filter of same type for single-select filters
    const updatedFilters = type === 'search' || type === 'duration'
      ? activeFilters.filter(f => f.type !== type)
      : activeFilters;
    
    onFiltersChange([...updatedFilters, newFilter]);
  };

  const removeFilter = (filterId: string) => {
    onFiltersChange(activeFilters.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
    onSearchChange('');
    setSelectedFriends([]);
    setDurationRange([30, 180]);
  };

  const handleQuickFilterClick = (categoryId: string, label: string) => {
    const existingFilter = activeFilters.find(f => f.type === 'category' && f.value === categoryId);
    if (existingFilter) {
      removeFilter(existingFilter.id);
    } else {
      addFilter('category', categoryId, label);
    }
  };

  const handleFriendsChange = (friendId: string) => {
    const updated = selectedFriends.includes(friendId)
      ? selectedFriends.filter(id => id !== friendId)
      : [...selectedFriends, friendId];
    
    setSelectedFriends(updated);
    
    // Update active filters
    const friendNames = updated.map(id => {
      const friend = friends.find(f => f.id === id);
      return friend ? `${friend.firstName} ${friend.lastName.charAt(0)}` : '';
    }).filter(Boolean);
    
    // Remove existing friends filter
    const otherFilters = activeFilters.filter(f => f.type !== 'friends');
    
    if (updated.length > 0) {
      addFilter('friends', updated, `Friends: ${friendNames.join(', ')}`);
    } else {
      onFiltersChange(otherFilters);
    }
  };

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Find Services & Activities</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Advanced
            </div>
            {activeFilters.length > 0 && (
              <div
                className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={clearAllFilters}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Discover activities that match your children's interests
        </p>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities, providers, locations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Quick Filters */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Filters</h4>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => {
              const isActive = activeFilters.some(f => f.type === 'category' && f.value === filter.id);
              return (
                <Badge
                  key={filter.id}
                  variant={isActive ? "default" : "outline"}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleQuickFilterClick(filter.id, filter.label)}
                >
                  {filter.label}
                  <span className="ml-1 text-xs opacity-70">({filter.count})</span>
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  {filter.label}
                  <div
                    className="flex items-center justify-center w-4 h-4 ml-1 hover:bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <X className="h-3 w-3" />
                  </div>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="text-sm font-medium">Advanced Filters</h4>
            
            {/* Category Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Categories</label>
              <div className="flex flex-wrap gap-1">
                {serviceCategories.map((category) => {
                  const isSelected = activeFilters.some(f => f.type === 'category' && f.value === category.id);
                  return (
                    <Badge
                      key={category.id}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => handleQuickFilterClick(category.id, category.name)}
                    >
                      {category.name}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Duration Range */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">
                Duration: {durationRange[0]} - {durationRange[1]} minutes
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={durationRange[0]}
                  onChange={(e) => setDurationRange([parseInt(e.target.value) || 30, durationRange[1]])}
                  className="w-20 text-xs px-2 py-1 border border-gray-300 rounded"
                  min="15"
                  max="480"
                />
                <span className="text-xs text-gray-500">to</span>
                <input
                  type="number"
                  value={durationRange[1]}
                  onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value) || 180])}
                  className="w-20 text-xs px-2 py-1 border border-gray-300 rounded"
                  min="15"
                  max="480"
                />
              </div>
            </div>

            {/* Friends Filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Friends Attending</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {friends.slice(0, 8).map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`friend-${friend.id}`}
                      checked={selectedFriends.includes(friend.id)}
                      onChange={() => handleFriendsChange(friend.id)}
                      className="rounded border-gray-300"
                    />
                    <label 
                      htmlFor={`friend-${friend.id}`}
                      className="text-xs cursor-pointer"
                    >
                      {friend.firstName} {friend.lastName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Apply to Diary Checkbox */}
        <div className="flex items-center space-x-2 pt-2 border-t">
          <input
            type="checkbox"
            id="apply-to-diary"
            checked={applyToDiary}
            onChange={(e) => onApplyToDiaryChange(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="apply-to-diary" className="text-sm text-gray-600">
            Apply filters to calendar view
          </label>
        </div>
      </div>
    </div>
  );
};
