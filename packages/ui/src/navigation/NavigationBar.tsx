import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '../components/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../components/navigation-menu';

import { cn } from '@zygo/libs';

interface INavigationBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

const NavigationBar = React.forwardRef<HTMLDivElement, INavigationBarProps>(
  ({ className, onSearch, searchPlaceholder = 'Search...', ...props }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-4 bg-popover text-popover-foreground',
          className
        )}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="bg-popover text-popover-foreground">
              <NavigationMenuLink href="/feed" className={cn(navigationMenuTriggerStyle())}>
                Feed
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/community" className={cn(navigationMenuTriggerStyle())}>
                Community
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/updates" className={cn(navigationMenuTriggerStyle())}>
                Updates
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/tools" className={cn(navigationMenuTriggerStyle())}>
                Tools
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/timeline" className={cn(navigationMenuTriggerStyle())}>
                Timeline
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 h-9 w-64 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </form>
      </div>
    );
  }
);

NavigationBar.displayName = 'NavigationBar';

export { NavigationBar };
export type { INavigationBarProps };
