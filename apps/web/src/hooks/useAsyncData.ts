import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for managing async data loading with loading, error, and retry states
 * This abstraction reduces boilerplate across components that fetch data
 * 
 * @param fetchFunction - The async function to fetch data
 * @param dependencies - Array of dependencies for useCallback (default: [])
 * @returns Object containing data, loading state, error state, retry function, and setData
 * 
 * @example
 * ```tsx
 * const { data, loading, error, retry } = useAsyncData(async () => {
 *   return await fetch('/api/users').then(r => r.json());
 * }, []);
 * 
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error} <button onClick={retry}>Retry</button></div>;
 * return <div>{data?.length} users found</div>;
 * ```
 */
export function useAsyncData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const retry = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    retry,
    setData
  };
}

/**
 * Variant for handling multiple async operations in parallel
 * 
 * @param fetchFunctions - Object with keys as data property names and values as fetch functions
 * @param dependencies - Array of dependencies for useCallback (default: [])
 * @returns Object containing combined data, loading state, error state, retry function, and setData
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useMultipleAsyncData({
 *   users: () => fetch('/api/users').then(r => r.json()),
 *   posts: () => fetch('/api/posts').then(r => r.json())
 * }, []);
 * 
 * // data will be { users: User[], posts: Post[] }
 * ```
 */
export function useMultipleAsyncData<T extends Record<string, any>>(
  fetchFunctions: { [K in keyof T]: () => Promise<T[K]> },
  dependencies: any[] = []
) {
  const [data, setData] = useState<Partial<T>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const keys = Object.keys(fetchFunctions) as Array<keyof T>;
      const promises = keys.map(key => 
        fetchFunctions[key]().then(result => ({ [key]: result }))
      );
      
      const results = await Promise.all(promises);
      const combinedData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {}) as T;
      
      setData(combinedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData({});
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const retry = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    retry,
    setData
  };
}
