import { Badge } from '@zygo/ui/src/components/badge';
import { Button } from '@zygo/ui/src/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@zygo/ui/src/components/card';
import {
  BookOpen,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Heart,
  Search,
  ShoppingCart,
  Star,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { useMultipleAsyncData } from '../../hooks/useAsyncData';
import {
  getFeaturedLibraryProviders,
  getLibraryCategories,
  getLibraryItems,
  type LibraryItem,
} from '../../lib/api/library';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  // Use the new useMultipleAsyncData hook to manage multiple data sources
  const { data, loading, error, retry } = useMultipleAsyncData(
    {
      libraryItems: async () => {
        const response = await getLibraryItems();
        if (response.success && response.data) {
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to load library items');
        }
      },
      categories: async () => {
        const response = await getLibraryCategories();
        if (response.success && response.data) {
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to load categories');
        }
      },
      featuredProviders: async () => {
        const response = await getFeaturedLibraryProviders();
        if (response.success && response.data) {
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to load featured providers');
        }
      },
    },
    []
  );

  // Extract data with defaults
  const libraryItems = data.libraryItems || [];
  const categories = data.categories || [];
  const featuredProviders = data.featuredProviders || [];

  const filteredItems = libraryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFree = !showFreeOnly || item.isFree;

    return matchesCategory && matchesSearch && matchesFree;
  });

  const getTypeIcon = (type: LibraryItem['type']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-4 h-4" />;
      case 'free-resource':
        return <Download className="w-4 h-4" />;
      case 'recipe-card':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: LibraryItem['type']) => {
    switch (type) {
      case 'book':
        return 'Book';
      case 'free-resource':
        return 'Free Resource';
      case 'recipe-card':
        return 'Recipe Cards';
      case 'video':
        return 'Video';
      case 'article':
        return 'Article';
      default:
        return 'Resource';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Resource <span className="text-zygo-red">Library</span>
            </h1>
            <p className="text-xl text-gray-600">Loading library resources...</p>
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Resource <span className="text-zygo-red">Library</span>
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Resource <span className="text-zygo-red">Library</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover books, guides, recipe collections, and free resources from our expert providers
            to support your health and nutrition journey.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zygo-red/20 focus:border-zygo-red"
              />
            </div>
            <Button
              variant={showFreeOnly ? 'default' : 'outline'}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={
                showFreeOnly
                  ? 'bg-zygo-green text-white'
                  : 'border-zygo-green text-zygo-green hover:bg-zygo-green hover:text-white'
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Free Only
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'bg-zygo-red text-white'
                    : 'border-gray-200 text-gray-600 hover:bg-zygo-red hover:text-white'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} resource{filteredItems.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
            {showFreeOnly && ' (free resources only)'}
          </p>
        </div>

        {/* Library Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {item.imageUrl && (
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${item.isFree ? 'bg-zygo-green' : 'bg-zygo-blue'} text-white`}
                    >
                      {getTypeIcon(item.type)}
                      <span className="ml-1">{getTypeLabel(item.type)}</span>
                    </Badge>
                  </div>
                  {item.isFree && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-zygo-green text-white">FREE</Badge>
                    </div>
                  )}
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-zygo-red transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-3">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>by {item.author}</span>
                  {item.provider.verified && (
                    <Badge variant="outline" className="text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                  )}
                  {item.downloadCount && (
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{item.downloadCount}</span>
                    </div>
                  )}
                  {item.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.readingTime} min</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    {item.price && !item.isFree ? (
                      <div className="text-lg font-semibold text-zygo-red">
                        ${item.price.amount} {item.price.currency}
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-zygo-green">Free</div>
                    )}
                  </div>

                  <Button
                    className={`${
                      item.isFree
                        ? 'bg-zygo-green hover:bg-zygo-green/90 text-white'
                        : 'bg-zygo-red hover:bg-zygo-red/90 text-white'
                    }`}
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    {item.isFree ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Get Resource
                      </>
                    )}
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Provider Spotlight */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 border-0">
            <CardHeader>
              <CardTitle className="text-center text-gray-800 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2 text-zygo-red" />
                Featured Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                Our library features expertly crafted resources from verified providers who bring
                years of experience and evidence-based knowledge to support your health journey.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {featuredProviders.map((provider) => (
                  <Badge
                    key={provider.id}
                    className="bg-white/50 text-gray-700 border border-zygo-red/20"
                  >
                    {provider.name} - {provider.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Library;
