import { Bell, Building, Loader2, Network, Search, User, UserCheck, Users } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Button } from '../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { Input } from '../components/input';

import { cn } from '@zygo/libs';

// Search API functionality - copied to avoid cross-package dependencies
interface SearchAPIResult {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  title?: string;
  centerName?: string;
  description?: string;
  profileImage?: string;
  type: 'serviceProvider' | 'serviceCenter' | 'serviceNetwork' | 'communityProfile';
  specializations?: string[];
  services?: string[];
  interests?: string[];
  role?: string;
  location?: string;
  memberCount?: number;
  coverage?: string;
}

interface SearchAPIResponse {
  results: SearchAPIResult[];
  totalCount: number;
  searchTime: number;
}

// Simple debounce utility
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface SearchResult {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  title?: string;
  centerName?: string;
  description?: string;
  profileImage?: string;
  type: 'serviceProvider' | 'serviceCenter' | 'serviceNetwork' | 'communityProfile';
  specializations?: string[];
  services?: string[];
  interests?: string[];
  role?: string;
  location?: string;
  memberCount?: number;
  coverage?: string;
}

// Type alias for backward compatibility
interface ProviderSuggestion extends SearchResult {}

interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  searchTime: number;
}

interface INavigationBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  currentUser?: CurrentUser;
  onUserSwitch?: () => void;
  otherUsers?: CurrentUser[];
  notificationCount?: number;
  onNotificationClick?: () => void;
}

const NavigationBar = React.forwardRef<HTMLDivElement, INavigationBarProps>(
  (
    {
      className,
      onSearch,
      searchPlaceholder = 'Search providers, centers, networks...',
      currentUser,
      onUserSwitch,
      otherUsers = [],
      notificationCount = 0,
      onNotificationClick,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchResults, setSearchResults] = useState<SearchAPIResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    // Debounce search query
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Helper function to check if a route is active
    const isActiveRoute = (path: string) => {
      return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // Search API function
    const performSearch = useCallback(async (query: string): Promise<SearchAPIResult[]> => {
      if (!query || query.trim().length === 0) {
        return [];
      }

      try {
        const response = await fetch('/data/search.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch search data: ${response.statusText}`);
        }

        const data = await response.json();
        const allItems: SearchAPIResult[] = [
          ...data.serviceProviders,
          ...data.serviceCenters,
          ...data.serviceNetworks,
          ...data.communityProfiles,
        ];

        // Simple search filtering
        const searchableQuery = query.toLowerCase().trim();
        const matchingItems = allItems.filter((item) => {
          const searchableFields = [
            item.firstName,
            item.lastName,
            item.name,
            item.title,
            item.centerName,
            item.description,
            item.location,
            item.role,
            ...(item.specializations || []),
            ...(item.services || []),
            ...(item.interests || []),
          ].filter(Boolean) as string[];

          return searchableFields.some((field) => field.toLowerCase().includes(searchableQuery));
        });

        return matchingItems.slice(0, 10); // Limit to 10 results
      } catch (error) {
        console.error('Search error:', error);
        throw error;
      }
    }, []);

    // Perform search when debounced query changes
    useEffect(() => {
      const searchFunc = async () => {
        if (debouncedSearchQuery.trim().length === 0) {
          setSearchResults([]);
          setIsSearching(false);
          setSearchError(null);
          return;
        }

        setIsSearching(true);
        setSearchError(null);

        try {
          const results = await performSearch(debouncedSearchQuery);
          setSearchResults(results);
        } catch (error) {
          setSearchError('Search failed. Please try again.');
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      };

      searchFunc();
    }, [debouncedSearchQuery, performSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      setShowDropdown(value.trim().length > 0);
      setSelectedIndex(-1);
      onSearch?.(value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        handleProviderSelect(searchResults[selectedIndex]);
      } else {
        onSearch?.(searchQuery);
      }
    };

    const handleProviderSelect = (provider: SearchAPIResult) => {
      const displayName =
        provider.firstName && provider.lastName
          ? `${provider.firstName} ${provider.lastName}`
          : provider.name || 'Unknown';

      setSearchQuery(displayName);
      setShowDropdown(false);
      setSelectedIndex(-1);

      // Navigate based on provider type
      const baseUrl =
        provider.type === 'communityProfile' ? '/community/profiles' : '/community/providers';
      window.location.href = `${baseUrl}/${provider.id}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showDropdown || searchResults.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleProviderSelect(searchResults[selectedIndex]);
          }
          break;
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
          setSelectedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          'fixed top-4 centered md:left-4 md:right-4 z-50 rounded-2xl',
          'bg-white',
          // Glassmorphism effect
          //'bg-white/25 backdrop-blur-[10px] border border-white/18',
          //'shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]',
          className
        )}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Center - Navigation Menu */}
          <div className="flex space-x-4 md:space-x-6">
            <a
              href="/feed"
              className={cn(
                'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm md:text-base',
                isActiveRoute('/feed') && 'text-blue-600'
              )}
            >
              Feed
            </a>
            <a
              href="/community"
              className={cn(
                'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm md:text-base',
                isActiveRoute('/community') && 'text-blue-600'
              )}
            >
              Community
            </a>
            <a
              href="/updates"
              className={cn(
                'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm md:text-base',
                isActiveRoute('/updates') && 'text-blue-600'
              )}
            >
              Updates
            </a>
            <a
              href="/tools"
              className={cn(
                'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm md:text-base',
                isActiveRoute('/tools') && 'text-blue-600'
              )}
            >
              Tools
            </a>
            <a
              href="/timeline"
              className={cn(
                'text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm md:text-base',
                isActiveRoute('/timeline') && 'text-blue-600'
              )}
            >
              Timeline
            </a>
          </div>

          {/* Right - Search, Notifications and User */}
          <div className="flex items-center space-x-4">
            {/* Search Button with Expandable Input */}
            <div ref={searchRef} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                onClick={() => {
                  if (!showDropdown) {
                    setShowDropdown(true);
                    inputRef.current?.focus();
                  } else {
                    setShowDropdown(false);
                  }
                }}
                title="Search"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Expandable Search Container */}
              {showDropdown && (
                <div className="absolute right-0 top-0 z-50">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div
                      className="bg-white/25 backdrop-blur-[10px] border border-white/18 rounded-full flex items-center px-3 py-1"
                      style={{
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                      }}
                    >
                      <Input
                        ref={inputRef}
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent outline-none w-64 px-2 py-1 text-gray-700 placeholder:text-gray-500 border-none focus:ring-0"
                        autoComplete="off"
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="ml-2 p-0 h-auto text-gray-600 hover:text-blue-500"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>

                  {/* Search Dropdown Results */}
                  {(searchResults.length > 0 || isSearching || searchError) && (
                    <div
                      className="absolute top-full right-0 mt-1 w-80 bg-white/25 backdrop-blur-[10px] border border-white/18 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] z-50 max-h-80 overflow-y-auto"
                      style={{
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                      }}
                    >
                      {isSearching && (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-5 w-5 animate-spin text-gray-600 mr-2" />
                          <span className="text-sm text-gray-600">Searching...</span>
                        </div>
                      )}

                      {searchError && (
                        <div className="p-3 text-sm text-red-600 text-center">{searchError}</div>
                      )}

                      {!isSearching &&
                        !searchError &&
                        searchResults.length === 0 &&
                        searchQuery.trim() && (
                          <div className="p-3 text-sm text-gray-600 text-center">
                            No results found for "{searchQuery}"
                          </div>
                        )}

                      {!isSearching &&
                        !searchError &&
                        searchResults.map((result, index) => {
                          const getResultIcon = (type: string) => {
                            switch (type) {
                              case 'serviceProvider':
                                return <User className="w-5 h-5 text-gray-600" />;
                              case 'serviceCenter':
                                return <Building className="w-5 h-5 text-gray-600" />;
                              case 'serviceNetwork':
                                return <Network className="w-5 h-5 text-gray-600" />;
                              case 'communityProfile':
                                return <UserCheck className="w-5 h-5 text-gray-600" />;
                              default:
                                return <User className="w-5 h-5 text-gray-600" />;
                            }
                          };

                          const getDisplayName = (result: SearchAPIResult) => {
                            if (result.firstName && result.lastName) {
                              return `${result.firstName} ${result.lastName}`;
                            }
                            return result.name || 'Unknown';
                          };

                          const getSubtitle = (result: SearchAPIResult) => {
                            if (result.type === 'serviceProvider') {
                              return result.title || 'Service Provider';
                            } else if (result.type === 'serviceCenter') {
                              return `Service Center${
                                result.location ? ` • ${result.location}` : ''
                              }`;
                            } else if (result.type === 'serviceNetwork') {
                              return `Service Network${
                                result.memberCount ? ` • ${result.memberCount} members` : ''
                              }`;
                            } else if (result.type === 'communityProfile') {
                              return result.role || 'Community Member';
                            }
                            return '';
                          };

                          const getThirdLine = (result: SearchAPIResult) => {
                            if (result.type === 'serviceProvider') {
                              return result.centerName;
                            } else if (result.type === 'serviceCenter') {
                              return result.services?.slice(0, 2).join(', ');
                            } else if (result.type === 'serviceNetwork') {
                              return result.coverage;
                            } else if (result.type === 'communityProfile') {
                              return result.interests?.slice(0, 2).join(', ');
                            }
                            return '';
                          };

                          return (
                            <div
                              key={result.id}
                              className={cn(
                                'flex items-center gap-3 p-3 cursor-pointer transition-all duration-200',
                                'hover:bg-white/30 hover:text-gray-800',
                                selectedIndex === index && 'bg-white/30 text-gray-800'
                              )}
                              onClick={() => handleProviderSelect(result)}
                              onMouseEnter={() => setSelectedIndex(index)}
                            >
                              {result.profileImage ? (
                                <img
                                  src={result.profileImage}
                                  alt={getDisplayName(result)}
                                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                  {getResultIcon(result.type)}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate text-gray-800">
                                  {getDisplayName(result)}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {getSubtitle(result)}
                                </div>
                                {getThirdLine(result) && (
                                  <div className="text-xs text-gray-500 truncate">
                                    {getThirdLine(result)}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Notification Icon with Badge */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                onClick={onNotificationClick}
                title="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                </div>
              )}
            </div>

            {/* Current User Display */}
            {currentUser && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 ring-2 ring-white/20">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  />
                  <AvatarFallback className="text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500">
                    {currentUser.firstName.charAt(0)}
                    {currentUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                </div>
              </div>
            )}

            {/* User Switch Dropdown */}
            {(otherUsers.length > 0 || onUserSwitch) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                    title="Switch user"
                  >
                    <Users className="h-5 w-5 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/25 backdrop-blur-[10px] border border-white/18 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  {otherUsers.map((user) => (
                    <DropdownMenuItem
                      key={user.id}
                      className="gap-2 text-gray-800 hover:bg-white/30 focus:bg-white/30"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback className="text-xs text-white bg-gradient-to-r from-blue-400 to-purple-400">
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-gray-600">{user.email}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {otherUsers.length > 0 && <DropdownMenuSeparator className="bg-white/20" />}
                  {onUserSwitch && (
                    <DropdownMenuItem
                      onClick={onUserSwitch}
                      className="gap-2 text-gray-800 hover:bg-white/30 focus:bg-white/30"
                    >
                      <Users className="h-4 w-4" />
                      <span>Switch Account</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    );
  }
);

NavigationBar.displayName = 'NavigationBar';

export { NavigationBar };
export type { CurrentUser, INavigationBarProps, SearchResponse, SearchResult };
