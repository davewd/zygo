import { ArrowRight, Baby, Camera, Clock, Heart, Plus, Users } from 'lucide-react';

const Updates = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Share Updates</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Share precious moments, milestones, and memories with your family and loved ones.
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
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo & Video Updates</h3>
              <p className="text-gray-600 text-sm">
                Share precious moments with photos and videos to keep family members connected.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Baby className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Milestone Celebrations</h3>
              <p className="text-gray-600 text-sm">
                Document and celebrate important milestones and achievements in your family's
                journey.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Sharing</h3>
              <p className="text-gray-600 text-sm">
                Keep grandparents, relatives, and close friends updated with your family's progress.
              </p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What You Can Share
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Daily Moments</h4>
                  <p className="text-gray-600 text-sm">
                    Share everyday joys, funny moments, and special activities with your family
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Growth Milestones</h4>
                  <p className="text-gray-600 text-sm">
                    Document first steps, words, achievements, and developmental progress
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Family Adventures</h4>
                  <p className="text-gray-600 text-sm">
                    Share outings, vacations, celebrations, and special family events
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">Ready to start sharing your family's journey?</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-4 h-4" />
              <span>Create Your First Update</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500">
              The Updates feature is currently under development. Soon you'll be able to share
              beautiful updates with your family circle!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
