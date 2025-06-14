import { FeedListItemToolBreastFeeding } from '../../components/feed/tool_specific/FeedListItemToolBreastFeeding';
import { FeedItemType, FeedItemTypeMap } from '../../lib/api/feed';

const BreastfeedingDemo = () => {
  // Mock data for the breastfeeding component
  const mockBreastfeedingItem: FeedItemTypeMap = {
    id: 'bf-001',
    type: FeedItemType.POST,
    title: 'My Breastfeeding Journey - Week 2',
    post: "Tracking my breastfeeding progress this week! Some challenging days but overall feeling more confident. The chart below shows my daily feeding patterns and how I'm feeling.",
    author: {
      name: 'Sarah Johnson',
      handle: 'sarah_mom',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      verified: true,
    },
    metadata: {
      createdAt: '2024-12-12T14:30:00Z',
      source: 'web',
    },
    stats: {
      comments: 12,
      reposts: 3,
      shares: 8,
      likes: 45,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Breastfeeding Progress Tracker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive feed list item component designed to help track and visualize
            breastfeeding journeys with dual-axis charts showing feeding duration, happiness, and
            comfort levels over time.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-white shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dual-Axis Chart</h3>
            <p className="text-gray-600">
              Track feeding duration alongside happiness and soreness ratings
            </p>
          </div>

          <div className="rounded-lg border bg-white shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m4 0H3a1 1 0 00-1 1v16a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Summaries</h3>
            <p className="text-gray-600">Automated weekly statistics and insights</p>
          </div>

          <div className="rounded-lg border bg-white shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Features</h3>
            <p className="text-gray-600">Integrated social interactions and community support</p>
          </div>
        </div>

        {/* Demo Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interactive Demo</h2>
          <div className="rounded-lg border bg-white shadow-sm p-4 hover:shadow-lg transition-shadow duration-200">
            <FeedListItemToolBreastFeeding item={mockBreastfeedingItem} />
          </div>
        </div>

        {/* Technical Details */}
        <div className="rounded-lg border bg-white shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Chart Components</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Recharts ComposedChart with dual Y-axes</li>
                <li>• Bar chart for feeding duration (minutes)</li>
                <li>• Line charts for happiness and soreness (1-10 scale)</li>
                <li>• Custom tooltips with detailed information</li>
                <li>• Responsive design with hover interactions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Data Visualization</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Date-based X-axis progression</li>
                <li>• Color-coded metrics (pink, green, red)</li>
                <li>• Weekly summary statistics</li>
                <li>• Legend with clear visual indicators</li>
                <li>• Smooth line animations and transitions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Usage Instructions</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              This component is designed to be used within a feed list item context, perfect for
              parenting apps, health tracking platforms, or social networks focused on family
              wellbeing.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-700">
                {`<FeedListItemToolBreastFeeding item={feedItem} />`}
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              The component accepts a standard{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded">FeedItemTypeMap</code> object and
              automatically generates the chart with sample breastfeeding data. In a production
              environment, the chart data would be fetched from your backend API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastfeedingDemo;
