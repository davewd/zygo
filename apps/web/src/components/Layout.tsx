import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { NavigationBar } from '@zygo/ui/src/navigation/NavigationBar';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { searchImmediate } from '../lib/api/search';
import { getCurrentUserData, isMultiProfileUser, switchUser } from '../lib/api/users';
import { ProfileSwitcher } from './ProfileSwitcher';

const Layout = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [otherUsers, setOtherUsers] = useState<CurrentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [isCurrentUserMultiProfile, setIsCurrentUserMultiProfile] = useState(false);
  const navigate = useNavigate();

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUserData();
        setCurrentUser(userData.currentUser);
        setOtherUsers(userData.otherUsers);

        // Check if current user has multiple profiles
        if (userData.currentUser) {
          const hasMultipleProfiles = await isMultiProfileUser(userData.currentUser.id);
          setIsCurrentUserMultiProfile(hasMultipleProfiles);
        }
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

    // If current user has multiple profiles, show profile switcher
    if (currentUser && isCurrentUserMultiProfile) {
      setShowProfileSwitcher(!showProfileSwitcher);
      return;
    }

    // For single-profile users, use the existing logic to switch to another user
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

  const handleProfileChange = (newUser: CurrentUser) => {
    setCurrentUser(newUser);
    setShowProfileSwitcher(false);
  };

  const handleUserSelect = async (user: CurrentUser) => {
    try {
      console.log('Selecting user:', user.firstName, user.lastName);
      setCurrentUser(user);

      // Update the otherUsers list by moving the current user to others and removing the selected user
      if (currentUser) {
        const newOtherUsers = otherUsers.filter((u) => u.id !== user.id).concat(currentUser);
        setOtherUsers(newOtherUsers);
      }

      // Close profile switcher if it was open
      setShowProfileSwitcher(false);
    } catch (error) {
      console.error('Failed to select user:', error);
    }
  };

  const handleAvatarClick = (user: CurrentUser) => {
    // Navigate to the user's profile page
    navigate(`/community/profiles/${user.id}`);
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
          onUserSelect={handleUserSelect}
          onAvatarClick={handleAvatarClick}
          notificationCount={3}
          onNotificationClick={handleNotificationClick}
        />
      </div>

      {/* Profile Switcher for multi-profile users */}
      {showProfileSwitcher && currentUser && isCurrentUserMultiProfile && (
        <div className="fixed top-24 right-4 z-50 w-80">
          <ProfileSwitcher currentUser={currentUser} onUserChange={handleProfileChange} />
        </div>
      )}

      <div className="pt-24 px-2 md:px-4 h-[calc(100vh-6rem)]">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
