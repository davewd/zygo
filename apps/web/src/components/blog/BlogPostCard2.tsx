import { Button } from '@zygo/ui';
import { Award, Clock, Heart, ThumbsUp, Users } from 'lucide-react';
import { useState } from 'react';
import type { BlogPost } from '../../data/network/blogPosts';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showPeerLikes, setShowPeerLikes] = useState(false);

  const truncatedContent =
    post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt;

  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Reference Badge */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
              {post.isReferenced && (
                <div className="flex items-center bg-zygo-red/10 text-zygo-red px-2 py-1 rounded-full text-xs font-medium">
                  <Award className="w-3 h-3 mr-1" />
                  Referenced
                </div>
              )}
            </div>
            {post.referenceBadge && (
              <div className="text-xs text-zygo-red font-medium mb-2">{post.referenceBadge}</div>
            )}
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime} min read
              </span>
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-16 h-16 rounded-lg object-cover ml-4 flex-shrink-0"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          {expanded ? post.content : truncatedContent}
        </p>

        {post.content.length > 120 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="mb-4"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              #{tag.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Peer Likes Section */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPeerLikes(!showPeerLikes)}
              className="flex items-center text-sm text-gray-600 hover:text-zygo-red transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="font-medium">{post.peerLikes.count} peer likes</span>
              <span className="text-gray-400 ml-2">from service providers</span>
            </button>

            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Like
            </Button>
          </div>

          {/* Peer Likes Dropdown */}
          {showPeerLikes && post.peerLikes.likedBy.length > 0 && (
            <div className="mt-3 bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Liked by fellow service providers:
              </h4>
              <div className="space-y-2">
                {post.peerLikes.likedBy.slice(0, 3).map((peer) => (
                  <div key={peer.providerId} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-800">{peer.providerName}</span>
                      <div className="text-xs text-gray-500">
                        {peer.credentials.join(', ')} • {peer.specializations.join(', ')}
                      </div>
                    </div>
                    <ThumbsUp className="w-4 h-4 text-zygo-red" />
                  </div>
                ))}
                {post.peerLikes.likedBy.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{post.peerLikes.likedBy.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
