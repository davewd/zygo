import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CALMBIRTH_NETWORK_PROVIDER } from '../../data/network/calmbirthCenter';

const ServiceNetworkProviderDetail = () => {
  const { id } = useParams();

  // Get the network provider by ID
  const networks = [CALMBIRTH_NETWORK_PROVIDER];
  const network = networks.find((n) => n.id === id);

  if (!network) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Network Provider Not Found</h1>
          <Link to="/network/network-providers">
            <Button variant="outline">Back to Network Providers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      {/* Hero Section */}
      <div
        className="relative h-64 mb-8"
        style={{
          background: `linear-gradient(135deg, ${network.brandColors?.primary || '#8B4B8C'} 0%, ${
            network.brandColors?.secondary || '#E8D5E8'
          } 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mr-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                {network.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{network.name}</h1>
                <p className="text-xl opacity-90">{network.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/network/network-providers"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Network Providers
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">About {network.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">{network.overview}</p>
                {network.mission && (
                  <div className="bg-zygo-mint/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Our Mission</h4>
                    <p className="text-gray-700 leading-relaxed">{network.mission}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Network Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <TrendingUp className="w-5 h-5 mr-2 text-zygo-red" />
                  Network Impact
                </CardTitle>
                <CardDescription>Reach and impact across our service network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-zygo-mint/20 rounded-lg">
                    <div className="text-3xl font-bold text-zygo-red mb-1">
                      {network.networkStats.totalEducators}
                    </div>
                    <div className="text-sm text-gray-600">Qualified Educators</div>
                  </div>
                  <div className="text-center p-4 bg-zygo-blue/20 rounded-lg">
                    <div className="text-3xl font-bold text-zygo-red mb-1">
                      {network.networkStats.totalLocations}
                    </div>
                    <div className="text-sm text-gray-600">Service Locations</div>
                  </div>
                  <div className="text-center p-4 bg-zygo-yellow/20 rounded-lg">
                    <div className="text-3xl font-bold text-zygo-red mb-1">
                      {network.networkStats.countriesServed?.length}
                    </div>
                    <div className="text-sm text-gray-600">Countries Served</div>
                  </div>
                  <div className="text-center p-4 bg-zygo-cream/20 rounded-lg">
                    <div className="text-3xl font-bold text-zygo-red mb-1">
                      {network.networkStats.familiesTrained
                        ? `${Math.floor(network.networkStats.familiesTrained / 1000)}K+`
                        : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Families Helped</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Geographic Coverage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <MapPin className="w-5 h-5 mr-2 text-zygo-red" />
                  Geographic Coverage
                </CardTitle>
                <CardDescription>Where you can find our services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {network.locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {location.state || location.region}
                        </h4>
                        <p className="text-gray-600 text-sm">{location.country}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-zygo-red">
                          {location.educatorCount} educators
                        </div>
                        <div className="text-gray-600 text-sm">
                          {location.centerCount} location{location.centerCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services & Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Star className="w-5 h-5 mr-2 text-zygo-red" />
                  Network Features
                </CardTitle>
                <CardDescription>What makes our network special</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {network.networkFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards & Recognition */}
            {network.awards && network.awards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Award className="w-5 h-5 mr-2 text-zygo-red" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {network.awards.map((award, index) => (
                      <div key={index} className="flex items-start p-4 border rounded-lg">
                        <Award className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{award.title}</h4>
                          <p className="text-zygo-red font-medium">{award.year}</p>
                          <p className="text-gray-600 text-sm">{award.issuingBody}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Impact */}
            {network.socialImpact && (
              <Card className="bg-gradient-to-r from-zygo-yellow/20 to-zygo-cream/20 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Heart className="w-5 h-5 mr-2 text-zygo-red" />
                    Social Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{network.socialImpact}</p>
                </CardContent>
              </Card>
            )}

            {/* Cultural Considerations */}
            {network.culturalConsiderations && (
              <Card className="bg-gradient-to-r from-zygo-blue/20 to-zygo-mint/20 border-0">
                <CardHeader>
                  <CardTitle className="text-gray-800">Cultural Acknowledgment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {network.culturalConsiderations}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-zygo-red" />
                  <div>
                    <div className="font-medium">{network.headquarters.address}</div>
                    <div className="text-sm text-gray-600">
                      {network.headquarters.suburb}, {network.headquarters.state}{' '}
                      {network.headquarters.postcode}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-zygo-red" />
                  <a
                    href={`tel:${network.contact.phone}`}
                    className="hover:text-zygo-red transition-colors"
                  >
                    {network.contact.phone}
                  </a>
                </div>

                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-zygo-red" />
                  <a
                    href={`mailto:${network.contact.email}`}
                    className="hover:text-zygo-red transition-colors"
                  >
                    {network.contact.email}
                  </a>
                </div>

                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-zygo-red" />
                  <a
                    href={network.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zygo-red transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href={network.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Find a Course
                  </Button>
                </a>
                <a href={`tel:${network.contact.phone}`}>
                  <Button
                    variant="outline"
                    className="w-full border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={`mailto:${network.contact.email}`}>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Network Providers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Users className="w-4 h-4 mr-2 text-zygo-red" />
                  Network Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {network.providers.slice(0, 3).map((provider) => (
                    <Link
                      key={provider.id}
                      to={`/community/providers/${provider.id}`}
                      className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <h4 className="font-semibold text-gray-800">
                        {provider.firstName} {provider.lastName}
                      </h4>
                      <p className="text-sm text-zygo-red">{provider.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {provider.yearsExperience} years experience
                      </p>
                    </Link>
                  ))}
                  {network.providers.length > 3 && (
                    <Link to="/community/providers">
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        View All {network.providers.length} Providers
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Service Centers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Service Centers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {network.centers.map((center) => (
                    <Link
                      key={center.id}
                      to={`/network/centers/${center.id}`}
                      className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <h4 className="font-semibold text-gray-800">{center.name}</h4>
                      <div className="flex items-start text-gray-600 text-sm mt-1">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0 mt-0.5" />
                        <span>
                          {center.location.suburb}, {center.location.state}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceNetworkProviderDetail;
