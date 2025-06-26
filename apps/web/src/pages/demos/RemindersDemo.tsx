import { FeedListItemBreastfeedingReminder } from '../../components/feed/tool_specific/FeedListItemBreastfeedingReminder';
import { FeedListItemLibraryBookReminder } from '../../components/feed/tool_specific/FeedListItemLibraryBookReminder';
import { FeedItemType, FeedItemTypeMap, VisibilityLevel } from '../../lib/api/feed';

const RemindersDemo = () => {
  // Mock data for the breastfeeding reminder
  const mockBreastfeedingReminder: FeedItemTypeMap = {
    id: 'bf-reminder-001',
    type: FeedItemType.BREASTFEEDING_REMINDER,
    title: 'Feeding Reminder',
    post: "It's been about 3 hours since your last feeding session. Your little one might be getting ready for another feed soon!",
    author: {
      name: 'Zygo',
      handle: 'zygo_app',
      avatar:
        'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=center',
      verified: true,
    },
    metadata: {
      createdAt: '2024-12-15T15:45:00Z',
      source: 'app',
    },
    stats: {
      comments: 3,
      reposts: 0,
      shares: 1,
      likes: 12,
    },
    privacy: {
      visibility: VisibilityLevel.PRIVATE,
      sharedWith: [],
    },
  };

  // Mock data for the library book reminder
  const mockLibraryReminder: FeedItemTypeMap = {
    id: 'lib-reminder-001',
    type: FeedItemType.LIBRARY_BOOK_REMINDER,
    title: 'Library Books Due Soon',
    post: "You have 2 library books due in 3 days: 'The Very Hungry Caterpillar' and 'Where the Wild Things Are'. Remember to return them on time!",
    author: {
      name: 'Zygo',
      handle: 'zygo_app',
      avatar:
        'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=center',
      verified: true,
    },
    metadata: {
      createdAt: '2024-12-16T09:30:00Z',
      source: 'app',
    },
    stats: {
      comments: 0,
      reposts: 0,
      shares: 0,
      likes: 0,
    },
    privacy: {
      visibility: VisibilityLevel.PRIVATE,
      sharedWith: [],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reminder Components Demo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demonstrating the generic reminder component system with different reminder types. The
            components are built using a configurable approach that allows for easy customization
            and new reminder types.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Timing</h3>
            <p className="text-gray-600 text-sm">
              Automated reminders based on user patterns and preferences
            </p>
          </div>

          <div className="rounded-lg border bg-white shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Integration</h3>
            <p className="text-gray-600 text-sm">
              Connect with external services like libraries, schools, and healthcare
            </p>
          </div>
        </div>

        {/* Demo Components */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Breastfeeding Reminder</h2>
            <p className="text-gray-600 mb-6">
              Gentle reminders for feeding schedules with quick access to tracking tools.
            </p>
            <div className="bg-white rounded-lg shadow-sm border">
              <FeedListItemBreastfeedingReminder item={mockBreastfeedingReminder} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Library Book Reminder</h2>
            <p className="text-gray-600 mb-6">
              Stay on top of library due dates and avoid late fees with timely reminders.
            </p>
            <div className="bg-white rounded-lg shadow-sm border">
              <FeedListItemLibraryBookReminder item={mockLibraryReminder} />
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Generic Design</h4>
              <ul className="space-y-1">
                <li>• Configurable reminder types</li>
                <li>• Reusable component architecture</li>
                <li>• Consistent styling system</li>
                <li>• Type-safe configuration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Features</h4>
              <ul className="space-y-1">
                <li>• Dismissible reminders</li>
                <li>• Action buttons with routing</li>
                <li>• Custom icons and colors</li>
                <li>• Helpful tips and guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersDemo;
