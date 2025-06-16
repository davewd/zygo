import type { PrimaryConsumer, UserRole } from '@zygo/types';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowLeft,
  Award,
  Baby,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  Star,
  Stethoscope,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  getCommunityProfileByHandle,
  getCommunityProfileById,
} from '../../data/community/primaryConsumers';

const ProfileDetail = () => {
  const { id } = useParams();

  // Try to get profile by ID first, then by handle
  let communityProfile = id ? getCommunityProfileById(id) : undefined;
  if (!communityProfile && id) {
    communityProfile = getCommunityProfileByHandle(id);
  }

  if (!communityProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
          <Link to="/community/profiles">
            <Button variant="outline">Back to Community</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { consumer, stats, recentActivity, badges } = communityProfile;

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'parent':
        return Heart;
      case 'grandparent':
        return Star;
      case 'child':
        return Baby;
      default:
        return User;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'parent':
        return 'text-zygo-red';
      case 'grandparent':
        return 'text-zygo-yellow';
      case 'child':
        return 'text-zygo-blue';
      default:
        return 'text-gray-600';
    }
  };

  const RoleIcon = getRoleIcon(consumer.role);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAgeFromBirthDate = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 2) {
      const totalMonths = (today.getFullYear() - birth.getFullYear()) * 12 + monthDiff;
      return totalMonths < 0 ? '0 months' : `${totalMonths} months`;
    }

    return `${age} years`;
  };

  const canViewFullProfile = (consumer: PrimaryConsumer) => {
    // In a real app, this would check if the current user has permission
    // For now, we'll show limited profiles for children
    return !consumer.hasLimitedProfile || consumer.privacyLevel !== 'private';
  };

  const shouldShowField = (consumer: PrimaryConsumer, fieldName: string) => {
    if (!consumer.parentalControls) return true;
    return !consumer.parentalControls.restrictedFields.includes(fieldName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      {/* Hero Header */}
      <div className="relative h-64 bg-gradient-to-r from-zygo-mint/40 to-zygo-blue/40">
        <div className="absolute inset-0 bg-gradient-to-r from-zygo-red/10 to-transparent" />
        <div className="relative container mx-auto px-6 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6 w-full">
            {/* Profile Image */}
            <div className="relative">
              {consumer.profileImage && canViewFullProfile(consumer) ? (
                <img
                  src={consumer.profileImage}
                  alt={consumer.displayName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-zygo-red/20 to-zygo-red/30 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-zygo-red" />
                </div>
              )}
              {consumer.isActive && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            {/* Profile Info */}
            <div className="text-white mb-2 flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold">{consumer.displayName}</h1>
                <RoleIcon
                  className={`w-8 h-8 ${getRoleColor(consumer.role)} bg-white rounded-full p-1`}
                />
                {consumer.privacyLevel === 'family' && (
                  <Shield className="w-6 h-6 text-yellow-300" />
                )}
              </div>
              <p className="text-xl opacity-90 mb-2">@{consumer.handle}</p>
              <div className="flex items-center opacity-80 space-x-4">
                <span className="capitalize bg-white/20 px-3 py-1 rounded-full text-sm">
                  {consumer.role} • {getAgeFromBirthDate(consumer.dateOfBirth)}
                </span>
                {consumer.location?.suburb &&
                  consumer.location?.state &&
                  canViewFullProfile(consumer) &&
                  shouldShowField(consumer, 'location.suburb') && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {consumer.location.suburb}, {consumer.location.state}
                      </span>
                    </div>
                  )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {consumer.hasLimitedProfile && (
                <div className="text-right">
                  <span className="text-xs bg-orange-500/80 text-white px-2 py-1 rounded">
                    Protected Profile
                  </span>
                </div>
              )}
              <div className="flex space-x-2">
                <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-800"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/community/profiles"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio & Tagline */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                {consumer.tagline && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-700 text-lg italic">"{consumer.tagline}"</p>
                  </div>
                )}
                {consumer.bio &&
                  canViewFullProfile(consumer) &&
                  shouldShowField(consumer, 'bio') && (
                    <div>
                      {consumer.tagline && <hr className="my-4" />}
                      <p className="text-gray-700 leading-relaxed">{consumer.bio}</p>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Family Relationships */}
            {consumer.familyRelationships.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Users className="w-5 h-5 mr-2 text-zygo-red" />
                    Family Connections
                  </CardTitle>
                  <CardDescription>Important family relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {consumer.familyRelationships.map((relationship) => (
                      <div
                        key={relationship.id}
                        className="flex items-center p-3 bg-zygo-mint/10 rounded-lg"
                      >
                        <Heart className="w-4 h-4 text-zygo-red mr-3" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 capitalize">
                            {relationship.description || relationship.relationshipType}
                          </div>
                          <div className="text-xs text-gray-500">
                            Connected since {formatDate(relationship.dateEstablished)}
                          </div>
                        </div>
                        {relationship.isPrimary && (
                          <div className="text-xs bg-zygo-red/10 text-zygo-red px-2 py-1 rounded">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Provider Connections */}
            {consumer.followedProviders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Stethoscope className="w-5 h-5 mr-2 text-zygo-red" />
                    Connected Providers
                  </CardTitle>
                  <CardDescription>Healthcare and service providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consumer.followedProviders.map((provider, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{provider.providerName}</h4>
                          <p className="text-zygo-red text-sm">{provider.providerTitle}</p>
                          {provider.centerName && (
                            <p className="text-gray-600 text-sm">at {provider.centerName}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {provider.tags.slice(0, 3).map((tag, tagIdx) => (
                              <span
                                key={tagIdx}
                                className="text-xs bg-zygo-blue/10 text-gray-600 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              provider.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : provider.status === 'past'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {provider.status}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            Since {formatDate(provider.dateFollowed)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interests */}
            {consumer.interests &&
              consumer.interests.length > 0 &&
              canViewFullProfile(consumer) &&
              shouldShowField(consumer, 'interests') && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-800">
                      <Star className="w-5 h-5 mr-2 text-zygo-red" />
                      Interests & Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {consumer.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-zygo-yellow/20 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {interest.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Community Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Posts</span>
                    <span className="font-semibold text-zygo-red">{stats.postsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-semibold text-zygo-blue">{stats.connectionsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Milestones Shared</span>
                    <span className="font-semibold text-zygo-yellow">{stats.milestonesShared}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Communities</span>
                    <span className="font-semibold text-purple-600">{stats.communitiesJoined}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {recentActivity.lastPostDate && (
                    <div className="flex items-center text-gray-600">
                      <MessageCircle className="w-4 h-4 mr-2 text-zygo-red" />
                      <span>Last post: {formatDate(recentActivity.lastPostDate)}</span>
                    </div>
                  )}
                  {recentActivity.lastMilestoneDate && (
                    <div className="flex items-center text-gray-600">
                      <Award className="w-4 h-4 mr-2 text-zygo-yellow" />
                      <span>Milestone shared: {formatDate(recentActivity.lastMilestoneDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Active: {formatDate(consumer.lastActiveDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            {badges && badges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Community Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg"
                      >
                        <div className="text-2xl mr-3">{badge.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{badge.name}</div>
                          <div className="text-xs text-gray-600">{badge.description}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Earned {formatDate(badge.earnedDate)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Profile Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined</span>
                    <span className="text-gray-800">{formatDate(consumer.joinedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age Group</span>
                    <span className="text-gray-800 capitalize">{consumer.ageGroup}</span>
                  </div>
                  {consumer.preferredLanguages && consumer.preferredLanguages.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Languages</span>
                      <span className="text-gray-800">
                        {consumer.preferredLanguages.join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Privacy</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        consumer.privacyLevel === 'public'
                          ? 'bg-green-100 text-green-700'
                          : consumer.privacyLevel === 'family'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {consumer.privacyLevel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parental Controls Notice */}
            {consumer.hasLimitedProfile && (
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800 mb-1">Protected Profile</h4>
                      <p className="text-orange-700 text-sm">
                        This profile has limited information visible due to parental controls and
                        privacy settings.
                      </p>
                    </div>
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

export default ProfileDetail;
