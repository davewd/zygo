import { Button, Card, CardContent, CardHeader } from '@zygo/ui';
import { ArrowLeft, Grid3X3, List, MapPin, Search, Star, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EMILY_MCCONAGHY, JAKE_THOMPSON } from '../../data/network/active8KidsCenter';
import {
  EMMA_RODRIGUEZ,
  MARCUS_CHEN,
  SARAH_MITCHELL,
} from '../../data/network/elixrSwimSchoolCenter';
import { DR_SHELLEY_ROWLANDS } from '../../data/network/emogCenter';
import { REBECCA_CAVALLARO } from '../../data/network/fullCircleCenter';
import {
  JAMES_THOMPSON,
  MICHAEL_OCONNOR,
  SOFIA_MARTINEZ,
} from '../../data/network/kickeroosSoccerCenter';
import { JESSICA_DAWSON_DIETITIAN } from '../../data/network/kidneyNutritionCenter';
import { CAROLINE_MATERNITY_CONSULTANT } from '../../data/network/mummysWhispersCenter';
import { ANDREA_DUNNE, DR_JUSTIN_TUCKER, POLLY_DELANEY } from '../../data/network/prologueCenter';
import {
  DANIELLE_HARMSEN,
  LUCY_WOOD,
  STEVE_LOEFFLER,
} from '../../data/network/whiteCityTennisCenter';
import { DR_ALEXANDRA_THOMPSON, SARAH_DIGITAL_SPECIALIST } from '../../data/network/zygoAppCenter';

const CommunityProviders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const providers = [
    REBECCA_CAVALLARO,
    DR_JUSTIN_TUCKER,
    ANDREA_DUNNE,
    POLLY_DELANEY,
    EMILY_MCCONAGHY,
    JAKE_THOMPSON,
    STEVE_LOEFFLER,
    LUCY_WOOD,
    DANIELLE_HARMSEN,
    SARAH_MITCHELL,
    MARCUS_CHEN,
    EMMA_RODRIGUEZ,
    JAMES_THOMPSON,
    SOFIA_MARTINEZ,
    MICHAEL_OCONNOR,
    CAROLINE_MATERNITY_CONSULTANT,
    DR_SHELLEY_ROWLANDS,
    JESSICA_DAWSON_DIETITIAN,
    SARAH_DIGITAL_SPECIALIST,
    DR_ALEXANDRA_THOMPSON,
  ];

  const specialties = [
    'All Specialties',
    'Lactation Support',
    'Fertility',
    'Obstetrics',
    'Swimming',
    'Gymnastics',
    'Soccer',
    'Tennis',
    'Parkour',
    'Sleep Consulting',
    'Maternity Care',
    'Newborn Care',
  ];

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specializations.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSpecialty =
      selectedSpecialty === '' ||
      selectedSpecialty === 'All Specialties' ||
      provider.specializations.some((spec) =>
        spec.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );

    return matchesSearch && matchesSpecialty;
  });

  const getProviderRating = (providerId: string) => {
    // Mock rating data - in a real app this would come from reviews
    const ratings: { [key: string]: number } = {
      'rebecca-cavallaro': 4.9,
      'dr-justin-tucker': 4.8,
      'andrea-dunne': 4.9,
      'polly-delaney': 4.8,
      'emily-mcconaghy': 4.7,
      'jake-thompson': 4.6,
      'steve-loeffler': 4.5,
      'lucy-wood': 4.7,
      'danielle-harmsen': 4.8,
      'sarah-mitchell': 4.6,
      'marcus-chen': 4.5,
      'emma-rodriguez': 4.7,
      'james-thompson': 4.8,
      'sofia-martinez': 4.6,
      'michael-oconnor': 4.5,
      'caroline-maternity-consultant': 4.9,
    };
    return ratings[providerId] || 4.5;
  };

  const renderProviderCard = (provider: any) => {
    const rating = getProviderRating(provider.id);

    if (viewMode === 'list') {
      return (
        <Link key={provider.id} to={`/community/providers/${provider.id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={provider.profileImage}
                  alt={`${provider.firstName} ${provider.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {provider.firstName} {provider.lastName}
                      </h3>
                      <p className="text-gray-600 mb-2">{provider.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>Sydney, NSW</span>
                        </div>
                        <span>{provider.yearsExperience} years experience</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.specializations.slice(0, 3).map((spec: string, index: number) => (
                          <span
                            key={index}
                            className="bg-zygo-mint/20 text-zygo-blue text-xs px-2 py-1 rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                        {provider.specializations.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{provider.specializations.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-800">
                        ${provider.pricing.consultationFee}
                      </div>
                      <div className="text-sm text-gray-600">Initial consultation</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    }

    return (
      <Link key={provider.id} to={`/community/providers/${provider.id}`}>
        <Card className="hover:shadow-lg transition-shadow h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <img
                src={provider.profileImage}
                alt={`${provider.firstName} ${provider.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {provider.firstName} {provider.lastName}
                </h3>
                <p className="text-sm text-gray-600">{provider.title}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{rating}</span>
                </div>
                <span className="text-gray-600">{provider.yearsExperience} years</span>
              </div>

              <div className="text-sm text-gray-600 line-clamp-2">{provider.bio}</div>

              <div className="flex flex-wrap gap-1">
                {provider.specializations.slice(0, 2).map((spec: string, index: number) => (
                  <span
                    key={index}
                    className="bg-zygo-mint/20 text-zygo-blue text-xs px-2 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
                {provider.specializations.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{provider.specializations.length - 2}
                  </span>
                )}
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">From</span>
                  <span className="font-semibold text-gray-800">
                    ${provider.pricing.consultationFee}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/community">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Community
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Service Providers</h1>
              <p className="text-gray-600">
                Professional support for your family's health, development, and wellbeing
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search providers, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zygo-blue focus:border-transparent"
              />
            </div>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zygo-blue focus:border-transparent"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredProviders.length} providers found
              </span>
            </div>
          </div>
        </div>

        {/* Providers Grid/List */}
        <div
          className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
        >
          {filteredProviders.map(renderProviderCard)}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No providers found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all providers
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityProviders;
