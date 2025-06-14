import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Stethoscope,
  User,
  Video,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FULL_CIRCLE_CENTER, REBECCA_CAVALLARO } from '../../data/network/fullCircleCenter';

const ServiceProviderDetail = () => {
  const { providerId } = useParams();

  // In a real app, you'd fetch the provider by ID
  const provider = REBECCA_CAVALLARO;
  const center = FULL_CIRCLE_CENTER;

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Provider Not Found</h1>
          <Link to="/network/providers">
            <Button variant="outline">Back to Providers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/network/providers"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service Providers
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <Card className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 border-0">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-zygo-red/20 to-zygo-red/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-12 h-12 text-zygo-red" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {provider.firstName} {provider.lastName}
                    </h1>
                    {provider.title && (
                      <p className="text-xl text-zygo-red font-medium mb-2">{provider.title}</p>
                    )}
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{provider.yearsExperience} years of experience</span>
                      <span className="mx-3">•</span>
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Brisbane, Australia</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{provider.bio}</p>
                  </div>
                </div>
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
                  <p className="text-gray-700 leading-relaxed italic">"{provider.personalStory}"</p>
                </CardContent>
              </Card>
            )}

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
                  {provider.credentials.map((credential, index) => (
                    <div key={index} className="flex items-start p-4 border rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{credential.title}</h4>
                        {credential.abbreviation && (
                          <p className="text-zygo-red font-medium">{credential.abbreviation}</p>
                        )}
                        <p className="text-gray-600 text-sm">{credential.issuingBody}</p>
                        {credential.verified && (
                          <span className="inline-block mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Approach & Philosophy */}
            {provider.approach && (
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
                  {provider.services.map((service) => (
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
                          <span className="bg-zygo-blue/20 text-gray-700 text-xs px-2 py-1 rounded">
                            {service.category.name}
                          </span>
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
                  {provider.specializations.map((spec, index) => (
                    <div key={index} className="bg-zygo-mint/20 p-3 rounded-lg text-center">
                      <span className="text-gray-700 font-medium text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
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

            {/* Consultation Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Consultation Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {provider.availability.inPerson && (
                    <div className="flex items-center p-3 bg-zygo-mint/20 rounded-lg">
                      <MapPin className="w-4 h-4 mr-3 text-zygo-red" />
                      <div>
                        <div className="font-medium text-gray-800">In-Person</div>
                        <div className="text-xs text-gray-600">At the clinic</div>
                      </div>
                    </div>
                  )}
                  {provider.availability.telehealth && (
                    <div className="flex items-center p-3 bg-zygo-blue/20 rounded-lg">
                      <Video className="w-4 h-4 mr-3 text-zygo-red" />
                      <div>
                        <div className="font-medium text-gray-800">Telehealth</div>
                        <div className="text-xs text-gray-600">Online consultations</div>
                      </div>
                    </div>
                  )}
                  {provider.availability.homeVisits && (
                    <div className="flex items-center p-3 bg-zygo-yellow/20 rounded-lg">
                      <Home className="w-4 h-4 mr-3 text-zygo-red" />
                      <div>
                        <div className="font-medium text-gray-800">Home Visits</div>
                        <div className="text-xs text-gray-600">In your comfort zone</div>
                      </div>
                    </div>
                  )}
                  {provider.availability.emergency && (
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
                        ${provider.pricing.consultationFee} {provider.pricing.currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Follow-up</span>
                      <span className="font-semibold text-zygo-red">
                        ${provider.pricing.followUpFee} {provider.pricing.currency}
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
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-800">Practice Location</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  to={`/network/centers/${center.id}`}
                  className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">{center.name}</h4>
                  <div className="flex items-start text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <div>{center.location.address}</div>
                      <div>
                        {center.location.suburb}, {center.location.state} {center.location.postcode}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Center Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Languages */}
            {provider.languages && provider.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((language) => (
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
