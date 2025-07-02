import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  Clock,
  Eye,
  Globe,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncData } from '../../hooks/useAsyncData';
import {
  getAllServiceCenters,
  searchServiceCenters,
  type ServiceCenterFilters,
} from '../../lib/api/serviceCenters';

// Define a local ServiceCenter type that matches our API structure
interface ServiceCenter {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  location: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    bookingUrl?: string;
  };
  providers: any[];
  services: Array<{
    id: string;
    name: string;
    description: string;
    duration?: number;
    price?: {
      amount: number;
      currency: string;
      rebate?: {
        provider: string;
        amount: number;
      };
    };
  }>;
  operatingHours: {
    [key: string]: {
      open?: string;
      close?: string;
      closed?: boolean;
    };
  };
  features: string[];
  certifications?: string[];
  insurance?: string[];
  accessibility?: string[];
  images?: string[];
  establishedYear?: number;
  culturalConsiderations?: string;
}

const ServiceCenters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleContact, setVisibleContact] = useState<{
    [key: string]: { phone: boolean; email: boolean };
  }>({});

  // Use useAsyncData to manage service centers data
  const {
    data: serviceCenters = [],
    loading,
    error,
    retry,
  } = useAsyncData(async () => {
    const filters: ServiceCenterFilters = {};
    if (selectedTags.length > 0) {
      filters.features = selectedTags;
    }

    let response;
    if (searchTerm.trim()) {
      response = await searchServiceCenters(searchTerm, filters);
    } else {
      response = await getAllServiceCenters(filters);
    }

    // Handle both array and wrapped response formats
    return Array.isArray(response) ? response : response.serviceCenters || [];
  }, [selectedTags, searchTerm]);

  const toggleContactVisibility = (centerId: string, type: 'phone' | 'email') => {
    setVisibleContact((prev) => ({
      ...prev,
      [centerId]: {
        ...prev[centerId],
        [type]: true,
      },
    }));
  };

  // Get all unique features for filtering
  const allFeatures = Array.from(
    new Set(serviceCenters.flatMap((center) => center.features || []))
  ).sort();

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zygo-red" />
            <span className="ml-2 text-lg text-gray-600">Loading service centers...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Error Loading Service Centers</h3>
              <p className="text-gray-600">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-zygo-red hover:bg-zygo-red/90"
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Service <span className="text-zygo-red">Centers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find trusted facilities and institutions that support your family's health, wellness,
            and growth journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="mx-auto max-w-md">
            <input
              type="text"
              placeholder="Search service centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-zygo-red focus:outline-none focus:ring-2 focus:ring-zygo-red/20"
            />
          </div>

          {/* Feature Tags Filter */}
          {allFeatures.length > 0 && (
            <div className="mx-auto max-w-4xl">
              <p className="mb-3 text-sm font-medium text-gray-700 text-center">
                Filter by features:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {allFeatures.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => handleTagToggle(feature)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      selectedTags.includes(feature)
                        ? 'bg-zygo-red text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {feature.replace(/-/g, ' ')}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Found {serviceCenters.length} service center{serviceCenters.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid grid-cols-1 gap-8">
          {serviceCenters.map((center) => (
            <Card
              key={center.id}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Center Image */}
                {center.images && center.images.length > 0 && (
                  <div className="lg:col-span-1 h-64 lg:h-auto">
                    <img
                      src={center.images[0]}
                      alt={`${center.name} environment`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Main Info */}
                <div
                  className={
                    center.images && center.images.length > 0 ? 'lg:col-span-1' : 'lg:col-span-2'
                  }
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                          {center.name}
                        </CardTitle>
                        <p className="text-gray-600 leading-relaxed mb-4">{center.description}</p>

                        {/* Key Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-zygo-mint/30 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            Family Friendly
                          </span>
                          <span className="bg-zygo-blue/20 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Shield className="w-3 h-3 mr-1" />
                            Professional Care
                          </span>
                          <span className="bg-zygo-yellow/20 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            {center.certifications?.length ? 'Certified' : 'Quality Assured'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-zygo-red" />
                          <span className="text-sm">
                            {center.location.address}, {center.location.suburb}{' '}
                            {center.location.postcode}
                          </span>
                        </div>
                        {center.contact.phone && (
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-zygo-red" />
                            {visibleContact[center.id]?.phone ? (
                              <span className="text-sm">{center.contact.phone}</span>
                            ) : (
                              <button
                                onClick={() => toggleContactVisibility(center.id, 'phone')}
                                className="flex items-center text-gray-600 hover:text-zygo-red transition-colors focus:outline-none text-sm"
                              >
                                <span className="mr-2">••• ••• •••</span>
                                <Eye className="w-3 h-3" />
                                <span className="ml-1 text-xs">Click to show</span>
                              </button>
                            )}
                          </div>
                        )}
                        {center.contact.email && (
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-zygo-red" />
                            {visibleContact[center.id]?.email ? (
                              <span className="text-sm">{center.contact.email}</span>
                            ) : (
                              <button
                                onClick={() => toggleContactVisibility(center.id, 'email')}
                                className="flex items-center text-gray-600 hover:text-zygo-red transition-colors focus:outline-none text-sm"
                              >
                                <span className="mr-2">••••••@••••••••</span>
                                <Eye className="w-3 h-3" />
                                <span className="ml-1 text-xs">Click to show</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {center.contact.website && (
                          <div className="flex items-center text-gray-600">
                            <Globe className="w-4 h-4 mr-2 text-zygo-red" />
                            <a
                              href={center.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:text-zygo-red transition-colors"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-zygo-red" />
                          <span className="text-sm">
                            {center.providers.length} Provider
                            {center.providers.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 mr-2 text-zygo-red" />
                          <span className="text-sm">
                            {center.services.length} Services Available
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-zygo-red" />
                        Operating Hours
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {Object.entries(center.operatingHours).map(
                          ([day, hours]: [string, any]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize font-medium">{day.slice(0, 3)}:</span>
                              <span className="text-gray-600">
                                {hours.closed
                                  ? 'Closed'
                                  : hours.open && hours.close
                                  ? `${hours.open}-${hours.close}`
                                  : 'By appointment'}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Action Panel */}
                <div className="lg:col-span-1 bg-gradient-to-br from-zygo-mint/20 to-zygo-blue/20 p-6">
                  <div className="space-y-4">
                    <Link to={`/network/service-centers/${center.id}`}>
                      <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    {center.contact.bookingUrl && (
                      <a href={center.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className="w-full border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white mb-3"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                      </a>
                    )}

                    <div className="text-center pt-4">
                      <p className="text-xs text-gray-500 mb-2">
                        Est. {center.establishedYear || 'N/A'}
                      </p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-zygo-red/10 flex items-center justify-center">
                          <Heart className="w-4 h-4 text-zygo-red" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zygo-blue/10 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-zygo-blue" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {serviceCenters.length === 0 && !loading && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-600">
              No service centers found matching your criteria.
            </p>
            <Button
              onClick={clearFilters}
              className="mt-4 bg-zygo-red hover:bg-zygo-red/90"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Coming Soon Message */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-zygo-yellow/20 to-zygo-mint/20 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Growing Our Network</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're constantly expanding our network of trusted service centers. Have a
              recommendation? Let us know and help other families discover amazing care providers in
              their area.
            </p>
            <Button className="mt-6 bg-zygo-red hover:bg-zygo-red/90 text-white">
              Suggest a Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenters;
