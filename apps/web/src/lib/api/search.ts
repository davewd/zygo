// Unified search API for typeahead functionality
// Searches across service providers, service centers, service networks, and community profiles

import searchData from './data/search.json';

export interface SearchResult {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  title?: string;
  centerName?: string;
  description?: string;
  profileImage?: string;
  type: 'serviceProvider' | 'serviceCenter' | 'serviceNetwork' | 'communityProfile';
  specializations?: string[];
  services?: string[];
  interests?: string[];
  role?: string;
  location?: string;
  memberCount?: number;
  coverage?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  searchTime: number;
}

// Cache for search data
let searchDataCache: {
  serviceProviders: SearchResult[];
  serviceCenters: SearchResult[];
  serviceNetworks: SearchResult[];
  communityProfiles: SearchResult[];
} | null = null;

// Debounce utility
const createDebouncer = () => {
  let timeoutId: NodeJS.Timeout;
  return (fn: Function, delay: number) => {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await fn();
        resolve(result);
      }, delay);
    });
  };
};

const debouncer = createDebouncer();

/**
 * Load search data from imported JSON
 */
const loadSearchData = async () => {
  if (searchDataCache) return searchDataCache;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 10));
    
    searchDataCache = searchData as any;
    return searchDataCache;
  } catch (error) {
    console.error('Error loading search data:', error);
    return {
      serviceProviders: [],
      serviceCenters: [],
      serviceNetworks: [],
      communityProfiles: []
    };
  }
};

/**
 * Search function with fuzzy matching
 */
const searchInText = (text: string, query: string): boolean => {
  const normalizedText = text.toLowerCase().trim();
  const normalizedQuery = query.toLowerCase().trim();
  
  // Exact match
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Word boundary match
  const words = normalizedText.split(/\s+/);
  return words.some(word => word.startsWith(normalizedQuery));
};

/**
 * Calculate relevance score for sorting results
 */
const calculateRelevance = (item: SearchResult, query: string): number => {
  const normalizedQuery = query.toLowerCase().trim();
  let score = 0;

  // Name/title matches (highest priority)
  const fullName = item.firstName && item.lastName 
    ? `${item.firstName} ${item.lastName}` 
    : item.name || '';
  
  if (fullName.toLowerCase().startsWith(normalizedQuery)) score += 100;
  else if (fullName.toLowerCase().includes(normalizedQuery)) score += 50;
  
  if (item.title?.toLowerCase().includes(normalizedQuery)) score += 30;
  if (item.centerName?.toLowerCase().includes(normalizedQuery)) score += 25;
  
  // Specializations/services/interests matches
  const searchableArrays = [
    ...(item.specializations || []),
    ...(item.services || []),
    ...(item.interests || [])
  ];
  
  searchableArrays.forEach(term => {
    if (term.toLowerCase().includes(normalizedQuery)) score += 10;
  });
  
  // Location match
  if (item.location?.toLowerCase().includes(normalizedQuery)) score += 15;
  
  // Description match (lower priority)
  if (item.description?.toLowerCase().includes(normalizedQuery)) score += 5;

  return score;
};

/**
 * Perform search across all entity types
 */
const performSearch = async (query: string): Promise<SearchResult[]> => {
  const startTime = Date.now();
  
  if (!query || query.trim().length === 0) {
    return [];
  }

  const data = await loadSearchData();
  if (!data) return [];

  const allItems: SearchResult[] = [
    ...data.serviceProviders,
    ...data.serviceCenters,
    ...data.serviceNetworks,
    ...data.communityProfiles
  ];

  // Filter items based on search query
  const matchingItems = allItems.filter(item => {
    const searchableFields = [
      item.firstName,
      item.lastName,
      item.name,
      item.title,
      item.centerName,
      item.description,
      item.location,
      item.role,
      ...(item.specializations || []),
      ...(item.services || []),
      ...(item.interests || [])
    ].filter(Boolean) as string[];

    return searchableFields.some(field => searchInText(field, query));
  });

  // Calculate relevance scores and sort
  const resultsWithScores = matchingItems.map(item => ({
    item,
    score: calculateRelevance(item, query)
  }));

  resultsWithScores.sort((a, b) => b.score - a.score);

  return resultsWithScores.map(({ item }) => item);
};

/**
 * Debounced search function for typeahead
 * @param query - Search query string
 * @param debounceMs - Debounce delay in milliseconds (default: 300ms)
 * @param maxResults - Maximum number of results to return (default: 10)
 */
export const searchWithTypeahead = async (
  query: string,
  debounceMs: number = 300,
  maxResults: number = 10
): Promise<SearchResponse> => {
  const startTime = Date.now();
  
  const results = await debouncer(
    () => performSearch(query),
    debounceMs
  ) as SearchResult[];

  const searchTime = Date.now() - startTime;
  
  return {
    results: results.slice(0, maxResults),
    totalCount: results.length,
    searchTime
  };
};

/**
 * Immediate search without debouncing (for programmatic use)
 */
export const searchImmediate = async (
  query: string,
  maxResults: number = 20
): Promise<SearchResponse> => {
  const startTime = Date.now();
  const results = await performSearch(query);
  const searchTime = Date.now() - startTime;
  
  return {
    results: results.slice(0, maxResults),
    totalCount: results.length,
    searchTime
  };
};

/**
 * Get suggestions for empty search state
 */
export const getPopularSuggestions = async (): Promise<SearchResult[]> => {
  const data = await loadSearchData();
  if (!data) return [];

  // Return a mix of popular providers and centers
  return [
    ...data.serviceProviders.slice(0, 3),
    ...data.serviceCenters.slice(0, 2)
  ];
};
