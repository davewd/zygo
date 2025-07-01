import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { NavigationBar } from '@zygo/ui/src/navigation/NavigationBar';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { searchImmediate } from '../lib/api/search';
import { getCurrentUserData, switchUser } from '../lib/api/users';

const Layout = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [otherUsers, setOtherUsers] = useState<CurrentUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUserData();
        setCurrentUser(userData.currentUser);
        setOtherUsers(userData.otherUsers);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Here you would typically implement search logic
  };

  const handleSearchFunction = async (query: string) => {
    try {
      const response = await searchImmediate(query, 10);
      return response.results;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };

  const handleUserSwitch = async () => {
    console.log('User switch requested');
    // Here you would typically open a modal to select user
    // For demo purposes, let's switch to the first other user
    if (otherUsers.length > 0) {
      try {
        const newUser = await switchUser(otherUsers[0].id);
        setCurrentUser(newUser);
        // In a real app, you might also need to update the otherUsers list
      } catch (error) {
        console.error('Failed to switch user:', error);
      }
    }
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
    // Navigate to notifications page
    window.location.href = '/notifications';
  };

  // Show loading state if data is still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className=" flex items-center justify-center">
        <NavigationBar
          onSearch={handleSearch}
          searchFunction={handleSearchFunction}
          searchPlaceholder="Search Zygo..."
          currentUser={currentUser}
          otherUsers={otherUsers}
          onUserSwitch={handleUserSwitch}
          notificationCount={3}
          onNotificationClick={handleNotificationClick}
        />
      </div>
      <div className="pt-24 px-2 md:px-4 h-[calc(100vh-6rem)]">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
