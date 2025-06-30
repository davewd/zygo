import { Bell, Search, User, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../components/navigation-menu';

import { cn } from '@zygo/libs';

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface ProviderSuggestion {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  centerName: string;
  profileImage?: string;
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

// Provider suggestions data
const PROVIDER_SUGGESTIONS: ProviderSuggestion[] = [
  {
    id: 'rebecca-cavallaro',
    firstName: 'Rebecca',
    lastName: 'Cavallaro',
    title: 'IBCLC, Midwife, RN',
    centerName: 'Full Circle Midwifery',
    profileImage:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'jessica-dawson-dietitian',
    firstName: 'Jessica',
    lastName: 'Dawson',
    title: 'PhD, Accredited Practicing Dietitian',
    centerName: 'Kidney Nutrition',
    profileImage:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'peta-carige',
    firstName: 'Peta',
    lastName: 'Carige',
    title: 'Advanced Sports Dietitian, APD',
    centerName: 'Start Training',
    profileImage:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 'gavin-mccormack',
    firstName: 'Gavin',
    lastName: 'McCormack',
    title: 'Nutritionist, Health Coach',
    centerName: 'Gavin McCormack Nutrition',
    profileImage:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
  },
];

const NavigationBar = React.forwardRef<HTMLDivElement, INavigationBarProps>(
  (
    {
      className,
      onSearch,
      searchPlaceholder = 'Search...',
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
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    // Helper function to check if a route is active
    const isActiveRoute = (path: string) => {
      return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // Filter suggestions based on search query
    const filteredSuggestions = PROVIDER_SUGGESTIONS.filter((provider) => {
      if (!searchQuery.trim()) return false;
      const fullName = `${provider.firstName} ${provider.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      setShowDropdown(value.trim().length > 0);
      setSelectedIndex(-1);
      onSearch?.(value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleProviderSelect(filteredSuggestions[selectedIndex]);
      } else {
        onSearch?.(searchQuery);
      }
    };

    const handleProviderSelect = (provider: ProviderSuggestion) => {
      setSearchQuery(`${provider.firstName} ${provider.lastName}`);
      setShowDropdown(false);
      setSelectedIndex(-1);
      // Navigate to provider page
      window.location.href = `/network/providers/${provider.id}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showDropdown || filteredSuggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
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
            handleProviderSelect(filteredSuggestions[selectedIndex]);
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
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white text-black shadow-md',
          className
        )}
      >
        {/* Left - Search Bar with Dropdown */}
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
              <Input
                ref={inputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchQuery.trim() && filteredSuggestions.length > 0) {
                    setShowDropdown(true);
                  }
                }}
                className="pl-12 pr-4 h-10 w-80 bg-gray-100 border-black text-black placeholder:text-gray-600 focus:ring-2 focus:ring-black focus:border-black"
                autoComplete="off"
              />
            </div>
          </form>

          {/* Dropdown */}
          {showDropdown && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
              {filteredSuggestions.map((provider, index) => (
                <div
                  key={provider.id}
                  className={cn(
                    'flex items-center gap-3 p-3 cursor-pointer transition-colors',
                    'hover:bg-gray-100 hover:text-black',
                    selectedIndex === index && 'bg-gray-100 text-black'
                  )}
                  onClick={() => handleProviderSelect(provider)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {provider.profileImage ? (
                    <img
                      src={provider.profileImage}
                      alt={`${provider.firstName} ${provider.lastName}`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate text-black">
                      {provider.firstName} {provider.lastName}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{provider.title}</div>
                    <div className="text-xs text-gray-500 truncate">{provider.centerName}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center - Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/feed"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-black hover:bg-gray-100 hover:text-black',
                  isActiveRoute('/feed') && 'bg-zygo-yellow text-black'
                )}
              >
                Feed
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/community"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-black hover:bg-gray-100 hover:text-black',
                  isActiveRoute('/community') && 'bg-zygo-yellow text-black'
                )}
              >
                Community
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/updates"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-black hover:bg-gray-100 hover:text-black',
                  isActiveRoute('/updates') && 'bg-zygo-yellow text-black'
                )}
              >
                Updates
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/tools"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-black hover:bg-gray-100 hover:text-black',
                  isActiveRoute('/tools') && 'bg-zygo-yellow text-black'
                )}
              >
                Tools
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/timeline"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-black hover:bg-gray-100 hover:text-black',
                  isActiveRoute('/timeline') && 'bg-zygo-yellow text-black'
                )}
              >
                Timeline
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right - Notifications, Current User and User Switch */}
        <div className="flex items-center gap-4">
          {/* Notification Icon with Badge */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 text-black"
              onClick={onNotificationClick}
              title="Notifications"
            >
              <Bell className="h-6 w-6" />
            </Button>
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              </div>
            )}
          </div>

          {/* Current User Display */}
          {currentUser && (
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={currentUser.avatar}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                />
                <AvatarFallback className="text-sm text-black bg-gray-200">
                  {currentUser.firstName.charAt(0)}
                  {currentUser.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-black">
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
                  className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 text-black"
                  title="Switch user"
                >
                  <Users className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-gray-300">
                {otherUsers.map((user) => (
                  <DropdownMenuItem key={user.id} className="gap-2 text-black hover:bg-gray-100">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="text-xs text-black bg-gray-200">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-black">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs text-gray-600">{user.email}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                {otherUsers.length > 0 && <DropdownMenuSeparator />}
                {onUserSwitch && (
                  <DropdownMenuItem
                    onClick={onUserSwitch}
                    className="gap-2 text-black hover:bg-gray-100"
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
    );
  }
);

NavigationBar.displayName = 'NavigationBar';

export { NavigationBar };
export type { CurrentUser, INavigationBarProps };
