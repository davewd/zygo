import type { MilestoneProgress } from '@zygo/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Play,
  Plus,
  Share2,
  Target,
  Trophy,
  Users,
  Video,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FeedListItem from '../../components/feed/FeedListItem';
import { useAsyncData } from '../../hooks/useAsyncData';
import { usePedagogyData } from '../../hooks/usePedagogyData';
import { ActorType, FeedItemType, FeedItemTypeMap } from '../../lib/api/feed';
import { getAllMilestones, Milestone } from '../../lib/api/timeline';

// Use the Milestone type from timeline API directly
type MilestoneDetailData = Milestone;

// Simple Badge component
const Badge: React.FC<{ className: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
  >
    {children}
  </span>
);

const MilestoneDetailPage: React.FC = () => {
  const { milestoneId, familyMemberId } = useParams<{
    milestoneId: string;
    familyMemberId?: string;
  }>();
  const navigate = useNavigate();
  const { pedagogyData, loading: pedagogyLoading } = usePedagogyData();

  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState<MilestoneProgress | null>(null);

  // Use the new useAsyncData hook to manage milestone data
  const {
    data: milestone,
    loading,
    error,
    retry,
  } = useAsyncData(async () => {
    if (!milestoneId) {
      throw new Error('Milestone ID is required');
    }

    const milestones = await getAllMilestones();
    const foundMilestone = milestones.find((m) => m.id === milestoneId);

    if (!foundMilestone) {
      throw new Error('Milestone not found');
    }

    return foundMilestone;
  }, [milestoneId]);

  // Generate mock activity posts as feed items for related activities
  const relatedActivities: FeedItemTypeMap[] = milestone
    ? [
        {
          id: '1',
          type: FeedItemType.POST,
          author: {
            name: 'Sarah Johnson',
            handle: 'sarah_mama',
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616b612b147?w=150&h=150&fit=crop&crop=face',
            actorType: ActorType.COMMUNITY_MEMBER,
            role: 'parent',
            location: {
              suburb: 'Paddington',
              state: 'NSW',
              country: 'Australia',
            },
          },
          title: `Achievement: ${milestone.title}`,
          post: `Just achieved the "${milestone.title}" milestone! So proud of our little one's progress.`,
          metadata: {
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          stats: {
            likes: 12,
            comments: 3,
            reposts: 0,
            shares: 1,
          },
          privacy: {
            visibility: 'group' as any,
            sharedWith: [{ type: 'group', name: 'Family', id: 'family_1' }],
          },
        },
        {
          id: '2',
          type: FeedItemType.POST,
          author: {
            name: 'Dr. Emily Chen',
            handle: 'dr_emily_chen',
            avatar:
              'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
            verified: true,
            actorType: ActorType.SERVICE_PROVIDER,
            title: 'Pediatric Development Specialist',
            credentials: [
              {
                title: 'Doctor of Medicine',
                abbreviation: 'MD',
                issuingBody: 'Medical Board',
                verified: true,
              },
            ],
            yearsExperience: 12,
            specializations: ['child development', 'pediatrics'],
            centerName: "Children's Development Centre",
          },
          title: `Tip for ${milestone.title}`,
          post: `Great question about ${milestone.title}! Here are some activities that can help: ${milestone.supportStrategies}`,
          metadata: {
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          stats: {
            likes: 8,
            comments: 1,
            reposts: 2,
            shares: 0,
          },
          privacy: {
            visibility: 'public' as any,
            sharedWith: [],
          },
        },
        {
          id: '3',
          type: FeedItemType.POST,
          author: {
            name: 'Mike Peterson',
            handle: 'mike_dad',
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            actorType: ActorType.COMMUNITY_MEMBER,
            role: 'parent',
            location: {
              suburb: 'Bondi',
              state: 'NSW',
              country: 'Australia',
            },
          },
          title: `Question about ${milestone.title}`,
          post: `Any tips for helping with ${milestone.title}? Our child seems to be struggling with this milestone.`,
          metadata: {
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          stats: {
            likes: 5,
            comments: 6,
            reposts: 0,
            shares: 1,
          },
          privacy: {
            visibility: 'group' as any,
            sharedWith: [{ type: 'group', name: 'Parents Support', id: 'parents_1' }],
          },
        },
      ]
    : [];

  // Set selected family member from URL param or default to first family member
  React.useEffect(() => {
    if (familyMemberId) {
      setSelectedFamilyMember(familyMemberId);
    } else if (pedagogyData?.familyMembers?.[0]) {
      setSelectedFamilyMember(pedagogyData.familyMembers[0].id);
    }
  }, [familyMemberId, pedagogyData]);

  // Update current progress when family member or pedagogy data changes
  React.useEffect(() => {
    if (pedagogyData && selectedFamilyMember && milestoneId) {
      // Since this is a detail page for a specific milestone, we need to find the progress
      // that corresponds to this family member. The progress entries might be structured differently
      const progress = pedagogyData.milestoneProgress?.find(
        (p) => p.familyMemberId === selectedFamilyMember
      );
      setCurrentProgress(progress || null);
    }
  }, [pedagogyData, selectedFamilyMember, milestoneId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not_started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'deferred':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateRelativeAge = (startMonths: number, endMonths: number, currentAge?: number) => {
    if (!currentAge) currentAge = 24; // Default to 24 months for demo
    const targetAge = (startMonths + endMonths) / 2;
    const difference = currentAge - targetAge;

    if (difference > 0) {
      return `+${Math.floor(difference)}m ahead`;
    } else if (difference < 0) {
      return `${Math.floor(Math.abs(difference))}m to go`;
    } else {
      return 'Right on track';
    }
  };

  if (loading || pedagogyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading milestone details...</p>
        </div>
      </div>
    );
  }

  if (error || !milestone) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Milestone Not Found</h1>
          <p className="text-gray-600 mb-4">
            {error || 'The requested milestone could not be found.'}
          </p>
          <Button onClick={() => navigate('/timeline')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Timeline
          </Button>
        </div>
      </div>
    );
  }

  const selectedMember = pedagogyData?.familyMembers?.find((m) => m.id === selectedFamilyMember);
  const familyMembersActive = pedagogyData?.familyMembers?.filter((m) => m.isActive) || [];
  const familyMembersHistorical = pedagogyData?.familyMembers?.filter((m) => !m.isActive) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/timeline')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Timeline
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{milestone.title}</h1>
                <p className="text-sm text-gray-600">
                  {milestone.category.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} •{' '}
                  {milestone.ageRange}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Milestone Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <div>
                      <CardTitle className="text-xl">{milestone.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  <Badge className={getImportanceColor(milestone.importance)}>
                    {milestone.importance.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm font-medium text-gray-800">Age Range</div>
                    <div className="text-xs text-gray-600">{milestone.ageRange}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Target className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm font-medium text-gray-800">Timeline</div>
                    <div className="text-xs text-gray-600">
                      {calculateRelativeAge(milestone.startMonths, milestone.endMonths)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm font-medium text-gray-800">Period</div>
                    <div className="text-xs text-gray-600">
                      {milestone.period.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Trophy className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm font-medium text-gray-800">Type</div>
                    <div className="text-xs text-gray-600">
                      {milestone.isTypical ? 'Typical' : 'Adaptive'}
                    </div>
                  </div>
                </div>

                {/* Family Member Selection */}
                {familyMembersActive.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Track Progress For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {familyMembersActive.map((member) => (
                        <Button
                          key={member.id}
                          variant={selectedFamilyMember === member.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedFamilyMember(member.id)}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {member.name.charAt(0)}
                          </div>
                          <span>{member.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Progress */}
                {selectedMember && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">
                        Current Progress for {selectedMember.name}
                      </h4>
                      {currentProgress && (
                        <Badge className={getStatusColor(currentProgress.status)}>
                          {currentProgress.status.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>

                    {currentProgress ? (
                      <div className="space-y-3">
                        {currentProgress.dateStarted && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Play className="w-4 h-4 mr-2" />
                            Started: {new Date(currentProgress.dateStarted).toLocaleDateString()}
                          </div>
                        )}
                        {currentProgress.dateCompleted && (
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed:{' '}
                            {new Date(currentProgress.dateCompleted).toLocaleDateString()}
                          </div>
                        )}
                        {currentProgress.notes && (
                          <div className="text-sm text-gray-700 bg-white p-3 rounded">
                            <strong>Notes:</strong> {currentProgress.notes}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="text-gray-500 mb-2">No progress recorded yet</div>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Start Tracking
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Milestone Details */}
                <div className="mt-6 space-y-4">
                  {milestone.observationTips && (
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Observation Tips</h5>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {milestone.observationTips}
                      </p>
                    </div>
                  )}

                  {milestone.supportStrategies && (
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Support Strategies</h5>
                      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                        {milestone.supportStrategies}
                      </p>
                    </div>
                  )}

                  {milestone.redFlags && (
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Red Flags</h5>
                      <p className="text-sm text-red-700 bg-red-50 p-3 rounded border border-red-200">
                        {milestone.redFlags}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Activity Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Related Community Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedActivities.map((activity) => (
                    <FeedListItem key={activity.id} item={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Family Members Active */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Users className="w-5 h-5 mr-2" />
                  Active Family Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyMembersActive.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-800">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.relationship}</div>
                      </div>
                      {member.id === selectedFamilyMember && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Family Members Historical */}
            {familyMembersHistorical.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Clock className="w-5 h-5 mr-2" />
                    Previously Involved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {familyMembersHistorical.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-600">{member.name}</div>
                          <div className="text-xs text-gray-400">{member.relationship}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo Evidence
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Record Video
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            {milestone.resources && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {milestone.resources}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneDetailPage;
