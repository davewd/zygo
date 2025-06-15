import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowRight,
  Award,
  Calendar,
  Clock,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACTIVE8_CENTER } from '../../data/network/active8KidsCenter';
import { ELIXR_SWIM_SCHOOL_CENTER } from '../../data/network/elixrSwimSchoolCenter';
import { FULL_CIRCLE_CENTER } from '../../data/network/fullCircleCenter';
import { KICKEROOS_SOCCER_CENTER } from '../../data/network/kickeroosSoccerCenter';
import { PROLOGUE_CENTER } from '../../data/network/prologueCenter';
import { WHITE_CITY_TENNIS_CENTER } from '../../data/network/whiteCityTennisCenter';

const ServiceCenters = () => {
  const centers = [
    FULL_CIRCLE_CENTER,
    PROLOGUE_CENTER,
    ACTIVE8_CENTER,
    WHITE_CITY_TENNIS_CENTER,
    ELIXR_SWIM_SCHOOL_CENTER,
    KICKEROOS_SOCCER_CENTER,
  ];

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

        {/* Centers Grid */}
        <div className="grid grid-cols-1 gap-8">
          {centers.map((center) => (
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
                            Medicare Rebates
                          </span>
                          <span className="bg-zygo-yellow/20 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            {center.certifications?.includes('IBCLC Certified')
                              ? 'IBCLC Certified'
                              : 'Certified'}
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
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-zygo-red" />
                          <span className="text-sm">{center.contact.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-zygo-red" />
                          <span className="text-sm">{center.contact.email}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
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
                                {hours.closed ? 'Closed' : `${hours.open}-${hours.close}`}
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
                    <Link to={`/network/centers/${center.id}`}>
                      <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    <a href={center.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="w-full border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white mb-3"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </a>

                    <Link to={`/network/centers/${center.id}`}>
                      <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                        View Full Details
                      </Button>
                    </Link>

                    <div className="text-center pt-4">
                      <p className="text-xs text-gray-500 mb-2">Quick Actions</p>
                      <div className="flex justify-center space-x-2">
                        {center.contact.socialMedia?.map((social) => (
                          <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-zygo-red transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              {social.platform === 'Instagram' ? '📷' : '📘'}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
