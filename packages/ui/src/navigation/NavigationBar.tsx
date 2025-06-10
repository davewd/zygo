import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../components/navigation-menu';

import { cn } from '@zygo/libs';

interface INavigationBarProps extends React.ComponentPropsWithoutRef<typeof NavigationMenu> {}

const NavigationBar = React.forwardRef<
  React.ElementRef<typeof NavigationMenu>,
  INavigationBarProps
>(({ className, ...props }, ref) => {
  return (
    <nav>
      <NavigationMenu className={cn('', className)} ref={ref} {...props}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/feed" className={cn(navigationMenuTriggerStyle())}>
              Feed
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/village" className={cn(navigationMenuTriggerStyle())}>
              Village
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
    </nav>
  );
});

NavigationBar.displayName = 'NavigationBar';

export { NavigationBar };
