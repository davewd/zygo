import { NavigationBar } from '@zygo/ui';
import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    return ['a', 'b', 'c'].filter((item) => item.includes(query));
  };

  const handleUserSwitch = () => {
    console.log('User switch requested');
    // Here you would typically open a modal or navigate to switch user
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
    // Navigate to notifications page
    window.location.href = '/notifications';
  };

  // Sample current user data
  const currentUser: CurrentUser = {
    id: 'user-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  };

  // Sample other users for switching
  const otherUsers: CurrentUser[] = [
    {
      id: 'user-2',
      firstName: 'David',
      lastName: 'Smith',
      email: 'david.smith@example.com',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'user-3',
      firstName: 'Emma',
      lastName: 'Wilson',
      email: 'emma.wilson@example.com',
      // No avatar to test fallback initials
    },
  ];

  return (
    <>
      <NavigationBar
        onSearch={handleSearch}
        searchPlaceholder="Search Zygo..."
        currentUser={currentUser}
        otherUsers={otherUsers}
        onUserSwitch={handleUserSwitch}
        notificationCount={3}
        onNotificationClick={handleNotificationClick}
      />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
