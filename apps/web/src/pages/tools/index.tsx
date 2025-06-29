import { Button } from '@zygo/ui/src/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@zygo/ui/src/components/card';
import { Baby, Calendar, Clock, Heart, Library, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getToolCategories, type ToolCategoryData } from '../../lib/api/tools';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Calendar,
  Baby,
  Clock,
  Heart,
  Timer,
  Library,
};

export default function Tools() {
  const [toolCategories, setToolCategories] = useState<ToolCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToolCategories = async () => {
      setLoading(true);
      try {
        const response = await getToolCategories();
        if (response.success && response.data) {
          setToolCategories(response.data);
        } else {
          setError(response.error || 'Failed to load tool categories');
        }
      } catch (err) {
        setError('Failed to load tool categories');
        console.error('Error fetching tool categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchToolCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Timer className="text-zygo-red mr-3" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Family <span className="text-zygo-red">Tools</span>
            </h1>
            <p className="text-xl text-gray-600">Loading tools...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Timer className="text-zygo-red mr-3" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Family <span className="text-zygo-red">Tools</span>
            </h1>
            <p className="text-xl text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-zygo-red text-white">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Timer className="text-zygo-red mr-3" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Family <span className="text-zygo-red">Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Practical tools to help you track, monitor, and support your family's health and
            development journey.
          </p>
        </div>

        {/* Tool Categories */}
        {toolCategories.map((category, categoryIndex) => {
          // Get the icon component dynamically
          const getIconComponent = (iconName: string) => {
            return iconMap[iconName as keyof typeof iconMap] || Timer;
          };

          return (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category.title}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.tools.map((tool, toolIndex) => {
                  const IconComponent = getIconComponent(tool.iconName);

                  return (
                    <Card
                      key={toolIndex}
                      className={`${tool.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105`}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                          <div
                            className={`w-16 h-16 ${tool.bgColor} rounded-full flex items-center justify-center border-2 border-white shadow-lg`}
                          >
                            <IconComponent className={`${tool.iconColor}`} size={32} />
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                          {tool.description}
                        </CardDescription>

                        {tool.comingSoon ? (
                          <Button
                            disabled
                            className="w-full bg-gray-400 text-white cursor-not-allowed"
                          >
                            Coming Soon
                          </Button>
                        ) : (
                          <Link to={tool.route}>
                            <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                              Open Tool
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer Note */}
        <div className="text-center mt-16 p-8 bg-zygo-mint/20 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">More Tools Coming Soon!</h3>
          <p className="text-gray-600">
            We're continuously developing new tools to support your family's journey. Have a
            suggestion? We'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
}
