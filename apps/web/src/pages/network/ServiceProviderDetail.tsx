import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Heart,
  Home,
  Library,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Stethoscope,
  User,
  Video,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ClickableCredentialCard } from '../../components/credentials/ClickableCredentialCard';
import FeedListItem from '../../components/feed/FeedListItem';
import { useAsyncData, useMultipleAsyncData } from '../../hooks/useAsyncData';
import { fetchProviderFeedItems } from '../../lib/api/feed';
import { getCenterForProvider, getServiceProviderById } from '../../lib/api/serviceProviders';

const ServiceProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get tab from URL params, default to 'activity'
  const tabFromUrl = searchParams.get('tab') || 'activity';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Use useMultipleAsyncData to fetch both provider and center data
  const { data, loading, error, retry } = useMultipleAsyncData(
    {
      provider: async () => {
        if (!id) throw new Error('Provider ID is required');
        return await getServiceProviderById(id);
      },
      center: async () => {
        if (!id) return null;
        try {
          return await getCenterForProvider(id);
        } catch (error) {
          // Center might not exist for this provider
          return null;
        }
      },
    },
    [id]
  );

  const provider = data.provider || null;
  const center = data.center || null;

  // Separate async data for feed items since they depend on the provider being loaded
  const { data: feedResponse, loading: feedLoading } = useAsyncData(async () => {
    if (!provider?.id) return { items: [] };
    try {
      return await fetchProviderFeedItems(provider.id);
    } catch (error) {
      console.error('Failed to load feed items:', error);
      return { items: [] };
    }
  }, [provider?.id]);

  const providerFeedItems = Array.isArray(feedResponse) ? feedResponse : feedResponse?.items || [];

  const tabs = [
    { id: 'activity', label: 'Activity', icon: Star },
    { id: 'values', label: 'Values', icon: Heart },
    { id: 'services', label: 'Services', icon: Stethoscope },
    { id: 'credentials', label: 'Credentials', icon: Award },
  ];

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Update activeTab when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab && tabs.some((tab) => tab.id === urlTab)) {
      setActiveTab(urlTab);
    } else if (!urlTab) {
      setActiveTab('activity');
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zygo-red mx-auto mb-4"></div>
          <p className="text-gray-600">Loading provider details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Provider</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={retry}
              className="bg-zygo-red text-white px-4 py-2 rounded hover:bg-zygo-red/90 transition-colors"
            >
              Try Again
            </button>
            <Link to="/community/providers">
              <Button variant="outline">Back to Providers</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Provider Not Found</h1>
          <Link to="/community/providers">
            <Button variant="outline">Back to Providers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      {/* Hero Header with Background Image */}
      <div
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zygo-red/20 to-zygo-mint/20" />
        <div className="relative container mx-auto px-6 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6">
            {/* Large Profile Image */}
            <div className="relative">
              {provider.profileImage ? (
                <img
                  src={provider.profileImage}
                  alt={`${provider.firstName} ${provider.lastName}`}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-zygo-red/20 to-zygo-red/30 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-zygo-red" />
                </div>
              )}
            </div>
            <div className="text-white mb-2">
              <h1 className="text-4xl font-bold mb-2">
                {provider.firstName} {provider.lastName}
              </h1>
              {provider.title && <p className="text-xl opacity-90 mb-2">{provider.title}</p>}
              <div className="flex items-center opacity-80">
                <Clock className="w-4 h-4 mr-2" />
                <span>{provider.yearsExperience} years of experience</span>
                {center && (
                  <>
                    <span className="mx-3">•</span>
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>
                      {center.location.suburb}, {center.location.state}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/community/providers"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service Providers
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex border-b">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'border-b-2 border-zygo-red text-zygo-red bg-zygo-red/5'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Values Tab */}
              {activeTab === 'values' && (
                <div className="space-y-6">
                  {/* Bio Card */}
                  <Card className="bg-white border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-800">
                        <Heart className="w-5 h-5 mr-2 text-zygo-red" />
                        About {provider.firstName}
                      </CardTitle>
                      <CardDescription>Professional background and experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed text-lg">{provider.bio}</p>
                    </CardContent>
                  </Card>

                  {/* Personal Story */}
                  {provider.personalStory && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-gray-800">
                          <Heart className="w-5 h-5 mr-2 text-zygo-red" />
                          Personal Journey
                        </CardTitle>
                        <CardDescription>Understanding through experience</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{provider.personalStory}"
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Approach & Philosophy (standardized for all providers) */}
                  {provider?.approach && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-gray-800">
                          <BookOpen className="w-5 h-5 mr-2 text-zygo-red" />
                          Care Approach
                        </CardTitle>
                        <CardDescription>Philosophy and methodology</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{provider.approach}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  {/* Provider Activity Feed - Polymorphic for all providers */}
                  <div className="space-y-6">
                    {/* Provider Activity Feed - Using unified API for all providers */}
                    {feedLoading && (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-4 h-32" />
                        ))}
                      </div>
                    )}

                    {!feedLoading &&
                      providerFeedItems.length > 0 &&
                      providerFeedItems.map((feedItem) => (
                        <div key={feedItem.id} className="space-y-4">
                          <FeedListItem
                            item={feedItem}
                            peerLikes={feedItem.peerLikes}
                            onHashtagClick={(hashtag) => console.log('Hashtag clicked:', hashtag)}
                          />
                        </div>
                      ))}

                    {!feedLoading && providerFeedItems.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No recent activity from this provider.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  {/* Specializations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-800">
                        <Star className="w-5 h-5 mr-2 text-zygo-red" />
                        Areas of Specialization
                      </CardTitle>
                      <CardDescription>Focused expertise and special interests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {provider.specializations?.map((spec, index) => (
                          <div key={index} className="bg-zygo-mint/20 p-3 rounded-lg text-center">
                            <span className="text-gray-700 font-medium text-sm">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {/* Services Offered */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-800">
                        <Stethoscope className="w-5 h-5 mr-2 text-zygo-red" />
                        Services Offered
                      </CardTitle>
                      <CardDescription>Comprehensive care tailored to your needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {provider.services?.map((service) => (
                          <div
                            key={service.id}
                            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-1">{service.name}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {service.description}
                                </p>
                              </div>
                              {service.price && (
                                <div className="text-right ml-4 flex-shrink-0">
                                  <div className="font-semibold text-zygo-red">
                                    ${service.price.amount} {service.price.currency}
                                  </div>
                                  {service.price.rebate && (
                                    <div className="text-xs text-green-600">
                                      {service.price.rebate.provider} rebate: $
                                      {service.price.rebate.amount}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {service.category?.name && (
                                  <span className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded">
                                    {service.category.name}
                                  </span>
                                )}
                                {service.ageGroups?.map((age) => (
                                  <span
                                    key={age}
                                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                  >
                                    {age}
                                  </span>
                                ))}
                              </div>
                              {service.duration && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {service.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Library/Resources Section */}
                  {(provider.id === 'peta-carige' || provider.id === 'gavin-mccormack') && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-gray-800">
                          <Library className="w-5 h-5 mr-2 text-zygo-red" />
                          Resources & Library
                        </CardTitle>
                        <CardDescription>
                          Educational resources, guides, and tools for your journey
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {provider.id === 'peta-carige' && (
                            <>
                              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                                      <FileText className="w-4 h-4 mr-2 text-zygo-red" />
                                      Footy Meal Plans
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      Comprehensive nutrition plans designed specifically for young
                                      athletes during football season.
                                    </p>
                                  </div>
                                  <div className="text-right ml-4 flex-shrink-0">
                                    <div className="font-semibold text-zygo-red">$49.99 AUD</div>
                                    <div className="text-xs text-gray-500">Digital Download</div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-wrap gap-1">
                                    <span className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded">
                                      Nutrition Plans
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                      Sports Nutrition
                                    </span>
                                  </div>
                                  <a
                                    href="https://petacarige.com/footy-meal-plans/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-zygo-red hover:text-zygo-red/80 flex items-center"
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    View Details
                                  </a>
                                </div>
                              </div>
                            </>
                          )}
                          {provider.id === 'gavin-mccormack' && (
                            <>
                              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                                      <BookOpen className="w-4 h-4 mr-2 text-zygo-red" />
                                      Books & Publications
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      Evidence-based books on nutrition, health, and wellness
                                      available through Regarded Publications.
                                    </p>
                                  </div>
                                  <div className="text-right ml-4 flex-shrink-0">
                                    <div className="font-semibold text-zygo-red">
                                      Various Prices
                                    </div>
                                    <div className="text-xs text-gray-500">Physical & Digital</div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-wrap gap-1">
                                    <span className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded">
                                      Publications
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                      Educational
                                    </span>
                                  </div>
                                  <a
                                    href="https://regarded.com.au/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-zygo-red hover:text-zygo-red/80 flex items-center"
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Browse Books
                                  </a>
                                </div>
                              </div>

                              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                                      <Download className="w-4 h-4 mr-2 text-zygo-red" />
                                      Free Resources
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      Download free PDF guides, meal plans, and educational
                                      materials to support your health journey.
                                    </p>
                                  </div>
                                  <div className="text-right ml-4 flex-shrink-0">
                                    <div className="font-semibold text-green-600">Free</div>
                                    <div className="text-xs text-gray-500">PDF Downloads</div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-wrap gap-1">
                                    <span className="bg-green-100 text-gray-700 text-xs px-2 py-1 rounded">
                                      Free Resources
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                      PDF Guides
                                    </span>
                                  </div>
                                  <a
                                    href="https://gavinmccormack.com.au/resources-pdf/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-zygo-red hover:text-zygo-red/80 flex items-center"
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Download Resources
                                  </a>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Credentials Tab */}
              {activeTab === 'credentials' && (
                <div className="space-y-6">
                  {/* Professional Credentials */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-gray-800">
                        <Award className="w-5 h-5 mr-2 text-zygo-red" />
                        Professional Credentials
                      </CardTitle>
                      <CardDescription>Verified qualifications and certifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {provider.credentials?.map((credential, index) => (
                          <ClickableCredentialCard key={index} credential={credential} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {center && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href={center.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </a>
                  <a href={`tel:${center.contact.phone}`}>
                    <Button
                      variant="outline"
                      className="w-full border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a href={`mailto:${center.contact.email}`}>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Consultation Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Consultation Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {provider.availability?.inPerson && (
                    <div className="flex items-center p-3 bg-zygo-mint/20 rounded-lg">
                      <MapPin className="w-4 h-4 mr-3 text-zygo-red" />
                      <div>
                        <div className="font-medium text-gray-800">In-Person</div>
                        <div className="text-xs text-gray-600">At the clinic</div>
                      </div>
                    </div>
                  )}
                  {provider.availability?.telehealth && (
                    <div className="flex items-center p-3 bg-zygo-blue/20 rounded-lg">
                      <Video className="w-4 h-4 mr-3 text-zygo-red" />
                      <div>
                        <div className="font-medium text-gray-800">Telehealth</div>
                        <div className="text-xs text-gray-600">Online consultations</div>
                      </div>
                    </div>
                  )}
                  {provider.availability?.homeVisits && (
                    <div className="flex items-center p-3 bg-zygo-yellow/20 rounded-lg">
                      <Home className="w-4 h-4 mr-3 text-zygo-red" />
                      <div>
                        <div className="font-medium text-gray-800">Home Visits</div>
                        <div className="text-xs text-gray-600">In your comfort zone</div>
                      </div>
                    </div>
                  )}
                  {provider.availability?.emergency && (
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <Phone className="w-4 h-4 mr-3 text-red-600" />
                      <div>
                        <div className="font-medium text-gray-800">Emergency Support</div>
                        <div className="text-xs text-gray-600">Urgent care available</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            {provider.pricing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <DollarSign className="w-4 h-4 mr-2 text-zygo-red" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Initial Consultation</span>
                      <span className="font-semibold text-zygo-red">
                        ${provider.pricing?.consultationFee} {provider.pricing?.currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Follow-up</span>
                      <span className="font-semibold text-zygo-red">
                        ${provider.pricing?.followUpFee} {provider.pricing?.currency}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-green-600">
                        ✓ Medicare rebates available (up to $105.85)
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Private health insurance may also provide rebates
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Practice Location */}
            {center && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Practice Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    to={`/community/centers/${center.id}`}
                    className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{center.name}</h4>
                    <div className="flex items-start text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <div>{center.location.address}</div>
                        <div>
                          {center.location.suburb}, {center.location.state}{' '}
                          {center.location.postcode}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Center Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Languages */}
            {provider.languages && provider.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages?.map((language) => (
                      <span
                        key={language}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trust Indicators */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verified Credentials
                  </li>
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    AHPRA Registered
                  </li>
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Professional Indemnity Insurance
                  </li>
                  <li className="flex items-center text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Continuing Education Current
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetail;
