import React, { useState } from 'react';
import { FeedItemTypeMap, ActorType } from '../../../lib/api/feed';
import { FeedItemFeedback } from './FeedItemFeedback';

// Example usage component demonstrating the enhanced FeedItemFeedback
export const FeedItemFeedbackExample: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);

  // Sample feed item with hashtags in content
  const sampleFeedItem: FeedItemTypeMap = {
    id: '1',
    type: 'post' as any,
    author: {
      name: 'Dr. Sarah Johnson',
      handle: '@dr_sarah_j',
      avatar: 'https://example.com/avatar.jpg',
      verified: true,
      actorType: ActorType.SERVICE_PROVIDER,
      title: 'Dietitian & Kidney Health Specialist',
      credentials: [
        {
          title: 'Registered Dietitian',
          abbreviation: 'RD',
          issuingBody: 'Dietitians Association',
          verified: true
        }
      ],
      yearsExperience: 10,
      specializations: ['kidney health', 'nutrition'],
      centerName: 'Kidney Health Centre'
    },
    title: 'Kidney Health Tips',
    description: 'Essential nutrition tips for maintaining healthy kidneys',
    post: `
      <p>Here are some essential nutrition tips for maintaining healthy kidneys:</p>
      <ul>
        <li>🧂 <strong>Watch your sodium</strong> - aim for less than 2,300mg per day</li>
        <li>🥤 <strong>Stay hydrated</strong> - drink plenty of water throughout the day</li>
        <li>🫘 <strong>Choose quality protein</strong> - lean meats, fish, eggs, and plant proteins</li>
        <li>🍎 <strong>Eat plenty of fruits and vegetables</strong> - they're rich in antioxidants</li>
        <li>🌾 <strong>Opt for whole grains</strong> - better for blood sugar control</li>
        <li>❤️ <strong>Heart-healthy = kidney-healthy</strong> - what's good for your heart helps your kidneys too!</li>
      </ul>
      
      <p>Remember: <strong>prevention is always better than treatment</strong>. Small dietary changes today can make a huge difference for your kidney health in the long run.</p>
      
      <p>💡 <em>If you have kidney disease or are at risk, always consult with a qualified renal dietitian for personalized advice.</em></p>
      
      <p>#KidneyHealth #HealthyEating #NutritionTips #PreventiveCare #HealthyLifestyle #WellnessJourney</p>
    `,
    imageUrl:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    metadata: {
      createdAt: '2024-01-15T10:30:00Z',
      source: 'zygo',
    },
    stats: {
      likes: 24,
      shares: 8,
      comments: 12,
      reposts: 3,
    },
    privacy: {
      visibility: 'public' as any,
      sharedWith: [],
    },
  };

  // Sample peer likes data
  const peerLikes = {
    count: 5,
    likedBy: [
      {
        providerId: '1',
        providerName: 'Dr. Emily Chen',
        credentials: ['MD', 'PhD'],
        specializations: ['Nephrology', 'Internal Medicine'],
        dateLiked: '2024-01-15T11:00:00Z',
      },
      {
        providerId: '2',
        providerName: 'Sarah Martinez',
        credentials: ['RD', 'CDE'],
        specializations: ['Renal Nutrition', 'Diabetes Education'],
        dateLiked: '2024-01-15T11:15:00Z',
      },
      {
        providerId: '3',
        providerName: 'Dr. Michael Thompson',
        credentials: ['MD', 'FASN'],
        specializations: ['Nephrology', 'Hypertension'],
        dateLiked: '2024-01-15T11:30:00Z',
      },
      {
        providerId: '4',
        providerName: 'Lisa Wang',
        credentials: ['RN', 'CNN'],
        specializations: ['Dialysis Care', 'Patient Education'],
        dateLiked: '2024-01-15T12:00:00Z',
      },
      {
        providerId: '5',
        providerName: 'Dr. James Rodriguez',
        credentials: ['MD', 'FASN'],
        specializations: ['Pediatric Nephrology', 'Transplant Medicine'],
        dateLiked: '2024-01-15T12:15:00Z',
      },
    ],
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Update like count logic would go here
  };

  const handleComment = () => {
    console.log('Open comments...');
  };

  const handleShare = () => {
    console.log('Share post...');
  };

  const handleHashtagClick = (hashtag: string) => {
    console.log(`Navigate to hashtag: #${hashtag}`);
    // Navigation logic would go here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Enhanced FeedItemFeedback Component
        </h3>
        <p className="text-sm text-gray-600">
          This component now includes hashtag support, enhanced peer likes display, and improved
          interactivity.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm text-gray-700 mb-4">
          Sample post content with hashtags: #KidneyHealth #HealthyEating #NutritionTips
          #PreventiveCare #HealthyLifestyle #WellnessJourney
        </p>

        <FeedItemFeedback
          item={sampleFeedItem}
          peerLikes={peerLikes}
          isLiked={isLiked}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onHashtagClick={handleHashtagClick}
          showHashtags={true}
        />
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <h4 className="font-medium mb-2">Features demonstrated:</h4>
        <ul className="space-y-1">
          <li>• Hashtag extraction and display from post content</li>
          <li>• Toggleable hashtag list (shows first 3, expandable)</li>
          <li>• Enhanced peer likes with provider credentials and specializations</li>
          <li>• Improved visual design with better spacing and hover effects</li>
          <li>• Interactive like button with filled/unfilled states</li>
          <li>• Click handlers for hashtags, likes, comments, and shares</li>
        </ul>
      </div>
    </div>
  );
};
