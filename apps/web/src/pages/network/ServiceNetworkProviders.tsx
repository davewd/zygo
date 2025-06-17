import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import { ArrowRight, Award, Globe, Heart, MapPin, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CALMBIRTH_NETWORK_PROVIDER } from '../../data/network/calmbirthCenter';

const ServiceNetworkProviders = () => {
  const networks = [CALMBIRTH_NETWORK_PROVIDER];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Service <span className="text-zygo-red">Networks</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover established networks of providers that deliver consistent, high-quality care
            across multiple locations. These trusted organizations bring specialized services
            directly to your community.
          </p>
        </div>

        {/* Networks Grid */}
        <div className="grid grid-cols-1 gap-8">
          {networks.map((network) => (
            <Card
              key={network.id}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Network Logo/Image */}
                {network.logo && (
                  <div className="lg:col-span-1 h-64 lg:h-auto bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div
                        className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl font-bold text-white"
                        style={{ backgroundColor: network.brandColors?.primary || '#8B4B8C' }}
                      >
                        {network.name.charAt(0)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{network.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">Since {network.foundedYear}</p>
                    </div>
                  </div>
                )}

                {/* Main Info */}
                <div className="lg:col-span-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                          {network.name}
                        </CardTitle>
                        <p className="text-gray-600 leading-relaxed mb-4">{network.description}</p>

                        {/* Key Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-zygo-mint/30 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            Family Focused
                          </span>
                          <span className="bg-zygo-blue/20 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Internationally Recognized
                          </span>
                          <span className="bg-zygo-yellow/20 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Evidence-Based
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Network Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-zygo-red">
                          {network.networkStats.totalEducators}
                        </div>
                        <div className="text-xs text-gray-600">Educators</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-zygo-red">
                          {network.networkStats.totalLocations}
                        </div>
                        <div className="text-xs text-gray-600">Locations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-zygo-red">
                          {network.networkStats.countriesServed?.length}
                        </div>
                        <div className="text-xs text-gray-600">Countries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-zygo-red">
                          {network.networkStats.familiesTrained
                            ? `${Math.floor(network.networkStats.familiesTrained / 1000)}K+`
                            : 'N/A'}
                        </div>
                        <div className="text-xs text-gray-600">Families Trained</div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-zygo-red" />
                        <span className="text-sm">
                          {network.headquarters.suburb}, {network.headquarters.state}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Globe className="w-4 h-4 mr-2 text-zygo-red" />
                        <a
                          href={network.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:text-zygo-red transition-colors"
                        >
                          Visit Website
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-zygo-red" />
                        <span className="text-sm">
                          {network.providers.length} Provider
                          {network.providers.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <TrendingUp className="w-4 h-4 mr-2 text-zygo-red" />
                        <span className="text-sm">
                          {network.centers.length} Service Center
                          {network.centers.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Action Panel */}
                <div className="lg:col-span-1 bg-gradient-to-br from-zygo-mint/20 to-zygo-blue/20 p-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-zygo-red" />
                      Geographic Coverage
                    </h4>
                    <div className="space-y-2">
                      {network.locations.slice(0, 6).map((location, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-medium">{location.state || location.country}:</span>
                          <span className="text-gray-600">
                            {location.centerCount} location{location.centerCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      ))}
                      {network.locations.length > 6 && (
                        <div className="text-xs text-gray-500 pt-2">
                          +{network.locations.length - 6} more regions
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      <Link to={`/network/network-providers/${network.id}`}>
                        <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                          Explore Network
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>

                      <a
                        href={network.contact.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                        >
                          Find a Course
                        </Button>
                      </a>

                      <div className="text-center pt-4">
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Operating across {network.networkStats.countriesServed?.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-zygo-yellow/20 to-zygo-cream/20 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Expanding Our Network Partners
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're actively partnering with established service networks that share our commitment
              to family-centered care. Are you part of a service network interested in joining our
              platform?
            </p>
            <Button className="mt-6 bg-zygo-red hover:bg-zygo-red/90 text-white">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceNetworkProviders;
