import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Home,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  User,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMILY_MCCONAGHY, JAKE_THOMPSON } from '../../data/network/active8KidsCenter';
import {
  KAREN_MCCLAY,
  PETER_JACKSON,
  SARAH_THOMPSON_EDUCATOR,
} from '../../data/network/calmbirthCenter';
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
  MICHAEL_CHEN_MUSIC,
  REBECCA_THOMPSON_OUTDOOR,
  SARAH_MITCHELL_DIRECTOR,
} from '../../data/network/stMarysChildcareCenter';
import {
  DANIELLE_HARMSEN,
  LUCY_WOOD,
  STEVE_LOEFFLER,
} from '../../data/network/whiteCityTennisCenter';
import { DR_ALEXANDRA_THOMPSON, SARAH_DIGITAL_SPECIALIST } from '../../data/network/zygoAppCenter';

const ServiceProviders = () => {
  const providers = [
    REBECCA_CAVALLARO,
    DR_JUSTIN_TUCKER,
    ANDREA_DUNNE,
    POLLY_DELANEY,
    PETER_JACKSON,
    KAREN_MCCLAY,
    SARAH_THOMPSON_EDUCATOR,
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
    SARAH_MITCHELL_DIRECTOR,
    REBECCA_THOMPSON_OUTDOOR,
    MICHAEL_CHEN_MUSIC,
    CAROLINE_MATERNITY_CONSULTANT,
    DR_SHELLEY_ROWLANDS,
    JESSICA_DAWSON_DIETITIAN,
    SARAH_DIGITAL_SPECIALIST,
    DR_ALEXANDRA_THOMPSON,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Service <span className="text-zygo-red">Providers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with experienced healthcare professionals and specialists who understand your
            family's unique needs and support your growth journey.
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {providers.map((provider) => (
            <Card
              key={provider.id}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {provider.profileImage ? (
                      <img
                        src={provider.profileImage}
                        alt={`${provider.firstName} ${provider.lastName}`}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-zygo-mint/30"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-zygo-mint/30 to-zygo-blue/30 rounded-full flex items-center justify-center mr-4">
                        <User className="w-8 h-8 text-zygo-red" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {provider.firstName} {provider.lastName}
                      </CardTitle>
                      {provider.title && (
                        <p className="text-zygo-red font-medium">{provider.title}</p>
                      )}
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {provider.yearsExperience} years experience
                      </div>
                    </div>
                  </div>
                  <Link to={`/network/providers/${provider.id}`}>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent>
                {/* Bio */}
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{provider.bio}</p>

                {/* Credentials */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-zygo-red" />
                    Credentials
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.credentials.slice(0, 3).map((credential, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {credential.abbreviation || credential.title}
                      </span>
                    ))}
                    {provider.credentials.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{provider.credentials.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2 text-zygo-red" />
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                    {provider.specializations.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{provider.specializations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Consultation Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.availability.inPerson && (
                      <span className="bg-zygo-mint/30 text-gray-700 text-xs px-2 py-1 rounded flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        In-Person
                      </span>
                    )}
                    {provider.availability.telehealth && (
                      <span className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded flex items-center">
                        <Video className="w-3 h-3 mr-1" />
                        Telehealth
                      </span>
                    )}
                    {provider.availability.homeVisits && (
                      <span className="bg-zygo-yellow/20 text-gray-700 text-xs px-2 py-1 rounded flex items-center">
                        <Home className="w-3 h-3 mr-1" />
                        Home Visits
                      </span>
                    )}
                    {provider.availability.emergency && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        Emergency
                      </span>
                    )}
                  </div>
                </div>

                {/* Services Count */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-zygo-red" />
                      {provider.services.length} Services Available
                    </span>
                    {provider.pricing && (
                      <span className="font-medium text-zygo-red">
                        From ${provider.pricing.consultationFee} {provider.pricing.currency}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link to={`/network/providers/${provider.id}`} className="flex-1">
                    <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                      View Full Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Personal Story Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 border-0">
            <CardHeader>
              <CardTitle className="text-center text-gray-800 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2 text-zygo-red" />
                Personal Stories Matter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                Our providers bring not only professional expertise but also personal experience and
                empathy to their care. Many are parents themselves who understand the challenges and
                joys of the family journey firsthand.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-zygo-red">17+</div>
                  <div className="text-sm text-gray-600">Years Combined Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-zygo-red">100%</div>
                  <div className="text-sm text-gray-600">Evidence-Based Care</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-zygo-red">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-zygo-yellow/20 to-zygo-cream/20 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Expanding Our Provider Network
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're actively recruiting experienced providers who share our commitment to
              family-centered care. Are you a healthcare professional interested in joining our
              network?
            </p>
            <Button className="mt-6 bg-zygo-red hover:bg-zygo-red/90 text-white">
              Join Our Network
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;
