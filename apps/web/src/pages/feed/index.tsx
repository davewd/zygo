import { Button } from '@zygo/ui';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedListItem from '../../components/feed/FeedListItem';
import { useFeed } from '../../hooks/useFeed';

const Feed = () => {
  const { items, loading, error, hasMore, loadMore, refresh } = useFeed({ limit: 10 });

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
      <p className="text-gray-600 text-center max-w-md">
        {error || 'Failed to load feed items. Please try again.'}
      </p>
      <Button onClick={refresh} variant="outline" className="flex items-center space-x-2">
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="text-2xl">📝</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No posts yet</h3>
      <p className="text-gray-600 text-center max-w-md">
        Be the first to share something! Your feed will appear here.
      </p>
      <Button onClick={refresh} className="flex items-center space-x-2">
        <RefreshCw className="w-4 h-4" />
        <span>Refresh</span>
      </Button>
    </div>
  );

  // Infinite scroll loader
  const InfiniteScrollLoader = () => (
    <div className="flex justify-center py-8">
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading more posts...</span>
      </div>
    </div>
  );

  // Show error state if there's an error and no items
  if (error && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ErrorState />
        </div>
      </div>
    );
  }

  // Show loading state on initial load
  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
            <Button onClick={refresh} variant="outline" size="sm" disabled>
              <RefreshCw className="w-4 h-4 animate-spin" />
            </Button>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  // Show empty state if no items after loading
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
            <Button onClick={refresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={refresh}
            variant="outline"
            size="sm"
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Error banner if there's an error but items exist */}
        {error && items.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Infinite Scroll Feed */}
        <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          endMessage={
            <div className="text-center py-8">
              <p className="text-gray-500">🎉 You've reached the end! No more posts to show.</p>
            </div>
          }
          refreshFunction={refresh}
          pullDownToRefresh={false}
          className="space-y-4"
        >
          {items.map((item, index) => (
            <FeedListItem key={`${item.id}-${index}`} item={item} className="fade-in" />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
