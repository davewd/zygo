import { ProfileAvatarSelector } from '@zygo/ui/src/components/profile-avatar-selector';
import type { CurrentUser } from '@zygo/ui/src/navigation/NavigationBar';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalTimeLine from '../../components/timeline/PedagogyTimelineVertical';
import { useMultiProfiles } from '../../hooks/useMultiProfiles';
import { usePedagogyData } from '../../hooks/usePedagogyData';
import { getCurrentUser } from '../../lib/api/users';

export default function TimeLine() {
  const { pedagogyData, loading, error } = usePedagogyData();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  // Load current user on mount
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error('Error loading current user:', err);
      } finally {
        setUserLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  // Initialize multi-profiles hook only when we have a current user
  const multiProfilesResult = useMultiProfiles(currentUser?.id || '');
  const { availableProfiles, switchToProfile } = multiProfilesResult;

  const handleNodeClick = (nodeId: string, nodeData: any) => {
    if (nodeData.milestone) {
      // Navigate to the detailed milestone page
      navigate(`/timeline/milestone/${nodeData.milestone.id}`);
    }
  };

  const handleProfileSwitch = async (user: CurrentUser) => {
    try {
      const newUser = await switchToProfile(user.id);
      if (newUser) {
        setCurrentUser(newUser);
      }
    } catch (err) {
      console.error('Error switching profile:', err);
    }
  };

  const getProfileDisplayInfo = (profileType: string | null, userName?: string) => {
    const profileDisplayMap: Record<string, { title: string; description: string; icon: string }> =
      {
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
          icon: '🎓',
        },
        speech_therapist: {
          title: `${userName || 'User'} (Speech Therapist)`,
          description: 'Language and communication development',
          icon: '🗣️',
        },
        occupational_therapist: {
          title: `${userName || 'User'} (Occupational Therapist)`,
          description: 'Motor skills and daily living activities',
          icon: '🤲',
        },
        pediatrician: {
          title: `${userName || 'User'} (Pediatrician)`,
          description: 'Medical development and health milestones',
          icon: '👩‍⚕️',
        },
        childcare_provider: {
          title: `${userName || 'User'} (Childcare Provider)`,
          description: 'Daily care and early learning support',
          icon: '👶',
        },
        family_member: {
          title: `${userName || 'User'} (Family Member)`,
          description: 'Supporting family development journey',
          icon: '👨‍👩‍👧‍👦',
        },
      };

    return profileDisplayMap[profileType || 'parent'] || profileDisplayMap['parent'];
  };

  if (loading || userLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading family pedagogy timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-2">Error loading pedagogy data</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <p className="text-gray-500 text-sm mt-4">Showing demo timeline instead...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {/* Timeline Component with Profile Avatar Selector in ruler */}
      <VerticalTimeLine
        pedagogyData={pedagogyData || undefined}
        onNodeClick={handleNodeClick}
        profileAvatarSelector={
          currentUser ? (
            <ProfileAvatarSelector
              currentUser={currentUser}
              otherUsers={availableProfiles.filter((u) => u.id !== currentUser.id)}
              onProfileClick={() => navigate('/profile')}
              onUserSelect={handleProfileSwitch}
              onUserSwitch={() => navigate('/settings')}
              getProfileDisplayInfo={getProfileDisplayInfo}
              variant="glassmorphism"
              size="lg"
              showNameLabel={true}
              showRelationshipLabel={true}
              relationshipText={(currentUser as any).relationshipToCurrentUser || 'Primary User'}
            />
          ) : undefined
        }
      />
    </div>
  );
}
