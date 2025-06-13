import { useCallback, useEffect, useState } from 'react';
import { FeedItemTypeMap, FeedParams, FeedResponse, fetchFeedItems, fetchMoreFeedItems } from '../lib/api/feed';

export interface UseFeedState {
  items: FeedItemTypeMap[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useFeed = (initialParams: FeedParams = {}): UseFeedState => {
  const [items, setItems] = useState<FeedItemTypeMap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: FeedResponse = await fetchFeedItems(initialParams);
      setItems(response.items);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feed');
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !nextCursor) return;

    try {
      setLoading(true);
      setError(null);
      
      const response: FeedResponse = await fetchMoreFeedItems(nextCursor, initialParams.limit);
      setItems(prev => [...prev, ...response.items]);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more items');
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, nextCursor, initialParams.limit]);

  const refresh = useCallback(() => {
    setItems([]);
    setNextCursor(undefined);
    setHasMore(true);
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};

// Hook for infinite scroll detection
export const useInfiniteScroll = (callback: () => void, hasMore: boolean, loading: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      // Trigger when user scrolls to within 100px of bottom
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, hasMore, loading]);
};