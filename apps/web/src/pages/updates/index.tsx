import { Calendar, Bell, Star, Clock, ArrowRight } from 'lucide-react';

const Updates = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <Bell className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Updates Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay informed with the latest news, feature updates, and community announcements from Zygo.
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full text-amber-800 font-medium mb-8">
            <Clock className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Release Notes
              </h3>
              <p className="text-gray-600 text-sm">
                Detailed changelogs for all new features, improvements, and bug fixes.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Feature Highlights
              </h3>
              <p className="text-gray-600 text-sm">
                Spotlight on exciting new capabilities and improvements to your experience.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Announcements
              </h3>
              <p className="text-gray-600 text-sm">
                Important updates, community news, and upcoming events.
              </p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What to Expect
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Regular Updates</h4>
                  <p className="text-gray-600 text-sm">
                    Weekly feature releases and monthly community highlights
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Community Insights</h4>
                  <p className="text-gray-600 text-sm">
                    Stories and feedback from families using Zygo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Content</h4>
                  <p className="text-gray-600 text-sm">
                    Educational articles and tips from healthcare professionals
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Want to be notified when updates are available?
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Bell className="w-4 h-4" />
              <span>Enable Notifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500">
              The Updates hub is currently under development. Check back soon for the latest news and announcements!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
