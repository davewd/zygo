import { cn } from '@zygo/libs';
import { Plus } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  profileType?: string;
  title?: string;
  relationshipToCurrentUser?: string;
}

interface ProfileAvatarSelectorProps {
  currentUser: User;
  otherUsers?: User[];
  onProfileClick?: (user: User) => void;
  onUserSelect?: (user: User) => void;
  onUserSwitch?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showNameLabel?: boolean;
  showRelationshipLabel?: boolean;
  relationshipText?: string;
  className?: string;
  dropdownAlign?: 'start' | 'end';
  variant?: 'default' | 'glassmorphism';
  // New prop for getting profile display info
  getProfileDisplayInfo?: (
    profileType: string | null,
    userName?: string
  ) => {
    title: string;
    description: string;
    icon: string;
  };
}

const ProfileAvatarSelector = React.forwardRef<HTMLDivElement, ProfileAvatarSelectorProps>(
  (
    {
      currentUser,
      otherUsers = [],
      onProfileClick,
      onUserSelect,
      onUserSwitch,
      size = 'md',
      showNameLabel = false,
      showRelationshipLabel = false,
      relationshipText,
      className,
      dropdownAlign = 'end',
      variant = 'default',
      getProfileDisplayInfo,
      ...props
    },
    ref
  ) => {
    // Debug logging for click events
    const handleProfileClick = (user: User) => {
      console.log('ProfileAvatarSelector: Profile clicked', user);
      // Don't auto-navigate - let the parent component handle this
      onProfileClick?.(user);
    };

    const handleUserSelect = (user: User) => {
      console.log('ProfileAvatarSelector: User selected', user);
      onUserSelect?.(user);
    };

    const handleUserSwitch = () => {
      console.log('ProfileAvatarSelector: User switch clicked');
      onUserSwitch?.();
    };

    const hasMultipleProfiles = otherUsers.length > 0 || onUserSwitch;

    // Default profile display info function
    const defaultGetProfileDisplayInfo = (profileType: string | null, userName?: string) => {
      const profileDisplayMap: Record<
        string,
        { title: string; description: string; icon: string }
      > = {
        parent: {
          title: `${userName || 'User'} (Parent)`,
          description: 'Tracking child development and milestones',
          icon: '👨‍👧‍👦',
        },
        educational_psychologist: {
          title: `${userName || 'User'} (Educational Psychologist)`,
          description: 'Professional assessment and guidance',
          icon: '🧠',
        },
        teacher: {
          title: `${userName || 'User'} (Teacher)`,
          description: 'Educational progress and classroom insights',
          icon: '👩‍🏫',
        },
        therapist: {
          title: `${userName || 'User'} (Therapist)`,
          description: 'Therapeutic support and intervention',
          icon: '🧑‍⚕️',
        },
      };

      if (profileType && profileDisplayMap[profileType]) {
        return profileDisplayMap[profileType];
      }

      return {
        title: `${userName || 'User'} (${profileType || 'Unknown'})`,
        description: `Viewing as ${profileType || 'unknown profile type'}`,
        icon: '👤',
      };
    };

    const getDisplayInfo = getProfileDisplayInfo || defaultGetProfileDisplayInfo;

    // Size configurations
    const sizeConfig = {
      sm: {
        avatar: 'h-6 w-6',
        badge: 'h-3 w-3',
        badgeIcon: 'h-2 w-2',
        badgePosition: '-top-0.5 -right-0.5',
        text: 'text-xs',
      },
      md: {
        avatar: 'h-8 w-8',
        badge: 'h-4 w-4',
        badgeIcon: 'h-2.5 w-2.5',
        badgePosition: '-top-1 -right-1',
        text: 'text-sm',
      },
      lg: {
        avatar: 'h-10 w-10',
        badge: 'h-5 w-5',
        badgeIcon: 'h-3 w-3',
        badgePosition: '-top-1.5 -right-1.5',
        text: 'text-base',
      },
      xl: {
        avatar: 'h-12 w-12',
        badge: 'h-6 w-6',
        badgeIcon: 'h-3.5 w-3.5',
        badgePosition: '-top-2 -right-2',
        text: 'text-lg',
      },
      '2xl': {
        avatar: 'h-16 w-16',
        badge: 'h-8 w-8',
        badgeIcon: 'h-4 w-4',
        badgePosition: '-top-2.5 -right-2.5',
        text: 'text-xl',
      },
    };

    const config = sizeConfig[size];

    const avatarContent = (
      <div className={cn('relative', className)} ref={ref} {...props}>
        <button
          onClick={() => handleProfileClick(currentUser)}
          className="hover:opacity-80 transition-opacity duration-200 relative"
          title={hasMultipleProfiles ? 'Profile & Account Options' : 'Go to profile'}
        >
          <Avatar className={cn(config.avatar, 'ring-2 ring-white/20')}>
            <AvatarImage
              src={currentUser.avatar}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
            />
            <AvatarFallback className="text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500">
              {currentUser.firstName.charAt(0)}
              {currentUser.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Plus Badge - only show when multiple profiles available */}
          {hasMultipleProfiles && (
            <div
              className={cn(
                'absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-sm',
                config.badge,
                config.badgePosition
              )}
            >
              <Plus className={cn('text-white', config.badgeIcon)} />
            </div>
          )}
        </button>

        {/* Name Label */}
        {showNameLabel && (
          <div className="ml-2">
            <div className={cn('font-medium text-gray-800', config.text)}>
              {currentUser.firstName} {currentUser.lastName}
            </div>
            {/* Relationship Label */}
            {showRelationshipLabel && relationshipText && (
              <div
                className={cn(
                  'text-gray-600 mt-0.5',
                  size === '2xl'
                    ? 'text-base'
                    : size === 'xl'
                    ? 'text-sm'
                    : size === 'lg'
                    ? 'text-xs'
                    : 'text-xs'
                )}
              >
                {relationshipText}
              </div>
            )}
          </div>
        )}
      </div>
    );

    // If no multiple profiles, return simple avatar
    if (!hasMultipleProfiles) {
      return avatarContent;
    }

    // Get dropdown content classes based on variant
    const dropdownContentClasses = cn(
      'w-72 shadow-lg', // Made wider to accommodate profile info
      variant === 'glassmorphism'
        ? 'bg-white/25 backdrop-blur-[10px] border border-white/18 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
        : 'bg-white border border-gray-200 rounded-lg shadow-sm' // Match ProfileSwitcher style
    );

    const dropdownContentStyle =
      variant === 'glassmorphism'
        ? {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }
        : {};

    // Get current user display info
    const currentUserDisplayName = `${currentUser.firstName} ${currentUser.lastName}`;
    const currentProfileDisplayInfo = getDisplayInfo(
      currentUser.profileType || null,
      currentUserDisplayName
    );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{avatarContent}</DropdownMenuTrigger>
        <DropdownMenuContent
          align={dropdownAlign}
          className={dropdownContentClasses}
          style={dropdownContentStyle}
        >
          <div className="p-4">
            {/* Current User Profile Section */}
            <div className="mb-3">
              <h4
                className={cn(
                  'text-sm font-medium mb-2',
                  variant === 'glassmorphism' ? 'text-gray-700' : 'text-gray-800'
                )}
              >
                View current profile:
              </h4>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleProfileClick(currentUser);
                }}
                className={cn(
                  'w-full p-3 rounded-lg text-left transition-colors border-2 border-blue-500',
                  variant === 'glassmorphism'
                    ? 'bg-blue-50/20 text-gray-800 hover:bg-blue-50/30'
                    : 'bg-blue-50 text-gray-700 hover:bg-blue-100'
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{currentProfileDisplayInfo.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        'font-medium text-sm truncate',
                        variant === 'glassmorphism' ? 'text-gray-800' : 'text-gray-900'
                      )}
                    >
                      {currentProfileDisplayInfo.title}
                    </div>
                    <div
                      className={cn(
                        'text-xs truncate',
                        variant === 'glassmorphism' ? 'text-gray-600' : 'text-gray-600'
                      )}
                    >
                      {currentProfileDisplayInfo.description}
                    </div>
                    <div
                      className={cn(
                        'text-xs truncate mt-1',
                        variant === 'glassmorphism' ? 'text-gray-500' : 'text-gray-500'
                      )}
                    >
                      {currentUser.email}
                    </div>
                  </div>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={currentUser.avatar} alt={currentUserDisplayName} />
                    <AvatarFallback className="text-xs text-white bg-gradient-to-r from-purple-500 to-pink-500">
                      {currentUser.firstName.charAt(0)}
                      {currentUser.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </button>
            </div>

            {/* Other Users Section */}
            {otherUsers.length > 0 && (
              <>
                <div
                  className={cn(
                    'border-t my-3',
                    variant === 'glassmorphism' ? 'border-white/20' : 'border-gray-200'
                  )}
                />

                <div className="space-y-2">
                  <h4
                    className={cn(
                      'text-sm font-medium',
                      variant === 'glassmorphism' ? 'text-gray-700' : 'text-gray-800'
                    )}
                  >
                    Switch to:
                  </h4>

                  {otherUsers.map((user) => {
                    const userDisplayName = `${user.firstName} ${user.lastName}`;
                    const userDisplayInfo = getDisplayInfo(
                      user.profileType || null,
                      userDisplayName
                    );

                    return (
                      <button
                        key={user.id}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUserSelect(user);
                        }}
                        className={cn(
                          'w-full p-3 rounded-lg text-left transition-colors border',
                          variant === 'glassmorphism'
                            ? 'bg-white/10 hover:bg-white/20 border-white/20 text-gray-800'
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-900'
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{userDisplayInfo.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div
                              className={cn(
                                'font-medium text-sm truncate',
                                variant === 'glassmorphism' ? 'text-gray-800' : 'text-gray-900'
                              )}
                            >
                              {userDisplayInfo.title}
                            </div>
                            <div
                              className={cn(
                                'text-xs truncate',
                                variant === 'glassmorphism' ? 'text-gray-600' : 'text-gray-600'
                              )}
                            >
                              {userDisplayInfo.description}
                            </div>
                            <div
                              className={cn(
                                'text-xs truncate mt-1',
                                variant === 'glassmorphism' ? 'text-gray-500' : 'text-gray-500'
                              )}
                            >
                              {user.email}
                            </div>
                          </div>
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={user.avatar} alt={userDisplayName} />
                            <AvatarFallback className="text-xs text-white bg-gradient-to-r from-blue-400 to-purple-400">
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Switch Account Section */}
            {onUserSwitch && (
              <>
                <div
                  className={cn(
                    'border-t my-3',
                    variant === 'glassmorphism' ? 'border-white/20' : 'border-gray-200'
                  )}
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUserSwitch();
                  }}
                  className={cn(
                    'w-full px-3 py-2 text-sm rounded text-left hover:opacity-80 transition-colors flex items-center',
                    variant === 'glassmorphism'
                      ? 'bg-white/20 text-gray-800 hover:bg-white/30'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Account
                </button>
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

ProfileAvatarSelector.displayName = 'ProfileAvatarSelector';

export { ProfileAvatarSelector };
export type { ProfileAvatarSelectorProps, User };
