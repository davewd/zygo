import { RotateCcw, Search, Settings, X } from 'lucide-react';
import React, { useState } from 'react';
import type { ActiveFilter } from './useHolidayPlannerData';

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
  timeContext?: {
    date?: Date;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    isAllDay?: boolean;
  } | null;
  onClearTimeContext?: () => void;
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
  timeContext,
  onClearTimeContext,
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
    const updatedFilters =
      type === 'search' || type === 'duration'
        ? activeFilters.filter((f) => f.type !== type)
        : activeFilters;

    onFiltersChange([...updatedFilters, newFilter]);
  };

  const removeFilter = (filterId: string) => {
    onFiltersChange(activeFilters.filter((f) => f.id !== filterId));
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
    onSearchChange('');
    setSelectedFriends([]);
    setDurationRange([30, 180]);
  };

  const handleQuickFilterClick = (categoryId: string, label: string) => {
    const existingFilter = activeFilters.find(
      (f) => f.type === 'category' && f.value === categoryId
    );
    if (existingFilter) {
      removeFilter(existingFilter.id);
    } else {
      addFilter('category', categoryId, label);
    }
  };

  const handleFriendsChange = (friendId: string) => {
    const updated = selectedFriends.includes(friendId)
      ? selectedFriends.filter((id) => id !== friendId)
      : [...selectedFriends, friendId];

    setSelectedFriends(updated);

    // Update active filters
    const friendNames = updated
      .map((id) => {
        const friend = friends.find((f) => f.id === id);
        return friend ? `${friend.firstName} ${friend.lastName.charAt(0)}` : '';
      })
      .filter(Boolean);

    // Remove existing friends filter
    const otherFilters = activeFilters.filter((f) => f.type !== 'friends');

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

        {/* Time Context Display */}
        {timeContext && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">
                  Filtering for{' '}
                  {timeContext.isAllDay
                    ? 'All-Day Activities'
                    : timeContext.startHour !== undefined
                    ? `${timeContext.startHour}:${(timeContext.startMinute || 0)
                        .toString()
                        .padStart(2, '0')} Time Slot`
                    : 'Selected Time'}
                  {timeContext.date && (
                    <span className="text-blue-600">
                      {' '}
                      on{' '}
                      {timeContext.date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </span>
              </div>
              {onClearTimeContext && (
                <button
                  onClick={onClearTimeContext}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Services are filtered to show{' '}
              {timeContext.isAllDay ? 'full-day suitable' : 'time-appropriate'} activities
            </p>
          </div>
        )}

        {/* Quick Filters */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Filters</h4>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => {
              const isActive = activeFilters.some(
                (f) => f.type === 'category' && f.value === filter.id
              );
              return (
                <span
                  key={filter.id}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleQuickFilterClick(filter.id, filter.label)}
                >
                  {filter.label}
                  <span className="ml-1 text-xs opacity-70">({filter.count})</span>
                </span>
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
                <span
                  key={filter.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800"
                >
                  {filter.label}
                  <button
                    className="flex items-center justify-center w-4 h-4 ml-1 hover:bg-gray-300 rounded-full cursor-pointer transition-colors"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
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
                  const isSelected = activeFilters.some(
                    (f) => f.type === 'category' && f.value === category.id
                  );
                  return (
                    <span
                      key={category.id}
                      className={`inline-flex items-center px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => handleQuickFilterClick(category.id, category.name)}
                    >
                      {category.name}
                    </span>
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
                  onChange={(e) =>
                    setDurationRange([parseInt(e.target.value) || 30, durationRange[1]])
                  }
                  className="w-20 text-xs px-2 py-1 border border-gray-300 rounded"
                  min="15"
                  max="480"
                />
                <span className="text-xs text-gray-500">to</span>
                <input
                  type="number"
                  value={durationRange[1]}
                  onChange={(e) =>
                    setDurationRange([durationRange[0], parseInt(e.target.value) || 180])
                  }
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
                    <label htmlFor={`friend-${friend.id}`} className="text-xs cursor-pointer">
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
