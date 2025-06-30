import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Globe,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceCenterById } from '../../lib/api/serviceCenters';

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

const ServiceCenterDetail = () => {
  const { id } = useParams();
  const [center, setCenter] = useState<ServiceCenter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // Load service center details
  useEffect(() => {
    const loadCenter = async () => {
      if (!id) {
        setError('Service center ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const centerData = await getServiceCenterById(id);

        if (!centerData) {
          setError('Service center not found');
          return;
        }

        setCenter(centerData as ServiceCenter);
      } catch (err) {
        setError('Failed to load service center details. Please try again.');
        console.error('Error loading service center:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCenter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zygo-red" />
            <span className="ml-2 text-lg text-gray-600">Loading service center details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Service Center Not Found</h3>
              <p className="text-gray-600">
                {error || 'The requested service center could not be found.'}
              </p>
              <Link to="/network/service-centers">
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-zygo-red text-white rounded-lg hover:bg-zygo-red/90 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Service Centers
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      {/* Hero Section with Center Images */}
      {center.images && center.images.length > 0 && (
        <div className="relative h-96 mb-8">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('${center.images[0]}')`,
            }}
          />
          <div className="relative container mx-auto px-6 h-full flex items-end pb-8">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">{center.name}</h1>
              <p className="text-xl opacity-90 max-w-2xl">{center.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/network/centers"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service Centers
          </Link>
        </div>

        {/* Header for centers without images */}
        {(!center.images || center.images.length === 0) && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{center.name}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">{center.overview}</p>
          </div>
        )}

        {/* Overview Section */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{center.overview}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href={center.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </a>
            <a href={`tel:${center.contact.phone}`}>
              <Button
                variant="outline"
                className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>

        {/* Center Image Gallery */}
        {center.images && center.images.length > 1 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Environment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {center.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`${center.name} environment ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission & Overview */}
            {center.mission && (
              <Card className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Heart className="w-5 h-5 mr-2 text-zygo-red" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{center.mission}</p>
                </CardContent>
              </Card>
            )}

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Stethoscope className="w-5 h-5 mr-2 text-zygo-red" />
                  Services Available
                </CardTitle>
                <CardDescription>
                  Comprehensive care tailored to your family's needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {center.services.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{service.name}</h4>
                        {service.price && (
                          <div className="text-right">
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
                      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {service.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {service.duration && (
                          <span className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {service.duration} min
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Providers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Users className="w-5 h-5 mr-2 text-zygo-red" />
                  Our Providers
                </CardTitle>
                <CardDescription>Expert professionals dedicated to your care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {center.providers.map((provider) => (
                    <div
                      key={provider.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-800">
                            {provider.firstName} {provider.lastName}
                          </h4>
                          {provider.title && (
                            <p className="text-zygo-red font-medium">{provider.title}</p>
                          )}
                          <p className="text-gray-600 text-sm mt-1">
                            {provider.yearsExperience} years experience
                          </p>
                        </div>
                        <Link to={`/community/providers/${provider.id}`}>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4">{provider.bio}</p>

                      {/* Credentials */}
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-800 mb-2">Credentials</h5>
                        <div className="flex flex-wrap gap-2">
                          {provider.credentials.map((credential, index) => (
                            <span
                              key={index}
                              className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {credential.abbreviation || credential.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Specializations */}
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Specializations</h5>
                        <div className="flex flex-wrap gap-2">
                          {provider.specializations.slice(0, 4).map((spec) => (
                            <span
                              key={spec}
                              className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {spec}
                            </span>
                          ))}
                          {provider.specializations.length > 4 && (
                            <span className="text-xs text-gray-500">
                              +{provider.specializations.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultural Considerations */}
            {center.culturalConsiderations && (
              <Card className="bg-gradient-to-r from-zygo-yellow/20 to-zygo-cream/20 border-0">
                <CardHeader>
                  <CardTitle className="text-gray-800">Cultural Acknowledgment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {center.culturalConsiderations}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-zygo-red flex-shrink-0" />
                  <div>
                    <div className="font-medium">{center.location.address}</div>
                    <div className="text-sm text-gray-600">
                      {center.location.suburb}, {center.location.state} {center.location.postcode}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-zygo-red" />
                  {showPhone ? (
                    <a
                      href={`tel:${center.contact.phone}`}
                      className="hover:text-zygo-red transition-colors"
                    >
                      {center.contact.phone}
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowPhone(true)}
                      className="flex items-center text-gray-600 hover:text-zygo-red transition-colors focus:outline-none"
                    >
                      <span className="mr-2">••• ••• •••</span>
                      <Eye className="w-4 h-4" />
                      <span className="ml-1 text-sm">Click to show</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-zygo-red" />
                  {showEmail ? (
                    <a
                      href={`mailto:${center.contact.email}`}
                      className="hover:text-zygo-red transition-colors"
                    >
                      {center.contact.email}
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowEmail(true)}
                      className="flex items-center text-gray-600 hover:text-zygo-red transition-colors focus:outline-none"
                    >
                      <span className="mr-2">••••••@••••••••</span>
                      <Eye className="w-4 h-4" />
                      <span className="ml-1 text-sm">Click to show</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-zygo-red" />
                  <a
                    href={center.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zygo-red transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Clock className="w-4 h-4 mr-2 text-zygo-red" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(center.operatingHours).map(([day, hours]: [string, any]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="capitalize font-medium">{day}</span>
                      <span className="text-gray-600">
                        {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Star className="w-4 h-4 mr-2 text-zygo-red" />
                  Features & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {center.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Insurance */}
            {center.insurance && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <DollarSign className="w-4 h-4 mr-2 text-zygo-red" />
                    Insurance & Rebates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {center.insurance.map((insurance, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-gray-600">{insurance}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenterDetail;
