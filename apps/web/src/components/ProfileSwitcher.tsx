import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { getProfileDisplayInfo, useMultiProfiles } from '../hooks/useMultiProfiles';

interface ProfileSwitcherProps {
  currentUser: CurrentUser;
  onUserChange: (user: CurrentUser) => void;
  className?: string;
  userHandle?: string;
  userDisplayName?: string;
}

/**
 * Generic component for switching between user profiles
 */
export function ProfileSwitcher({
  currentUser,
  onUserChange,
  className = '',
  userHandle,
  userDisplayName,
}: ProfileSwitcherProps) {
  const {
    isLoading,
    error,
    availableProfiles,
    isMultiProfile,
    switchToProfile,
    toggleProfile,
    clearError,
  } = useMultiProfiles(currentUser.id);

  const currentProfileType = (currentUser as any).profileType || null;
  const displayName = userDisplayName || `${currentUser.firstName} ${currentUser.lastName}`;
  const displayInfo = getProfileDisplayInfo(currentProfileType, displayName);

  const handleSwitchToProfile = async (userId: string) => {
    const newUser = await switchToProfile(userId);
    if (newUser) {
      onUserChange(newUser);
    }
  };

  const handleToggleProfile = async () => {
    const newUser = await toggleProfile(currentUser);
    if (newUser) {
      onUserChange(newUser);
    }
  };

  // Don't show component if user doesn't have multiple profiles
  if (!isMultiProfile || availableProfiles.length <= 1) {
    return null;
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{displayInfo.icon}</span>
            <div>
              <h3 className="font-medium text-gray-900">{displayInfo.title}</h3>
              <p className="text-sm text-gray-600">{displayInfo.description}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
            <button onClick={clearError} className="ml-2 text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        )}

        <div className="space-y-2">
          {/* Toggle between all profiles */}
          <button
            onClick={handleToggleProfile}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>{isLoading ? 'Switching...' : 'Switch Profile'}</span>
          </button>

          {/* Individual profile buttons */}
          <div className="grid grid-cols-1 gap-2">
            {availableProfiles
              .filter((profile) => profile.id !== currentUser.id) // Don't show current profile
              .map((profile) => {
                const profileType = (profile as any).profileType || 'unknown';
                const isCurrentProfile = profile.id === currentUser.id;

                return (
                  <button
                    key={profile.id}
                    onClick={() => handleSwitchToProfile(profile.id)}
                    disabled={isLoading || isCurrentProfile}
                    className={`px-3 py-2 text-white text-sm rounded hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isCurrentProfile ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {isCurrentProfile ? '✓ ' : ''}
                    {profileType.charAt(0).toUpperCase() + profileType.slice(1).replace('_', ' ')}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSwitcher;
