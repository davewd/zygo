import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  title: string;
  description: string;
  location: string;
  price: string;
  provider: string;
  center: string;
  route: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  familyMember: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  services: Service[];
}

interface ServiceCategoriesProps {
  serviceTypes: ServiceCategory[];
}

const ServiceCategories = ({ serviceTypes }: ServiceCategoriesProps) => {
  return (
    <div className="space-y-8">
      {serviceTypes.map((category, categoryIndex) => {
        const IconComponent = category.icon;

        return (
          <Card key={categoryIndex} className="overflow-hidden">
            <CardHeader className={`${category.bgColor} border-b`}>
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full bg-white/70`}>
                  <IconComponent className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-800">{category.title}</CardTitle>
                  <CardDescription className="text-gray-700">
                    {category.description}
                  </CardDescription>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    {category.familyMember}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {category.services.map((service, serviceIndex) => (
                  <Link key={serviceIndex} to={service.route}>
                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{service.location}</span>
                            </div>
                            <span className="font-medium text-gray-700">{service.price}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ServiceCategories;
