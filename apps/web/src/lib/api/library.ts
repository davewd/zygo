// Library API
// Functions for managing library items and provider suggestions

// Types for library items
export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  author: string;
  type: 'book' | 'free-resource' | 'recipe-card' | 'video' | 'article';
  price?: {
    amount: number;
    currency: string;
  };
  isFree: boolean;
  category: string;
  tags: string[];
  imageUrl?: string;
  url: string;
  rating?: number;
  downloadCount?: number;
  readingTime?: number;
  publishedDate: string;
  provider: {
    id: string;
    name: string;
    verified: boolean;
  };
}

export interface LibraryProvider {
  id: string;
  name: string;
  title: string;
  verified: boolean;
  specialization: string[];
}

export interface LibraryAPIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Mock data for library items
const MOCK_LIBRARY_ITEMS: LibraryItem[] = [
  // Gavin McCormack Books
  {
    id: 'regarded-education-book-1',
    title: 'The Potential in Every Child',
    description:
      'A comprehensive guide exploring 100 ways to establish healthy routines, great conversations and a home environment that allows you to discover the potential in every child.',
    author: 'Gavin McCormack',
    type: 'book',
    price: { amount: 29.95, currency: 'AUD' },
    isFree: false,
    category: 'Child Development',
    tags: ['parenting', 'child-development', 'education', 'montessori'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    url: 'https://thepotentialchild.com/',
    rating: 4.8,
    publishedDate: '2024-01-15',
    provider: {
      id: 'gavin-mccormack',
      name: 'Gavin McCormack',
      verified: true,
    },
  },
  {
    id: 'regarded-education-book-2',
    title: 'Progressive Education Methods',
    description:
      'Learn how to implement progressive teaching methods that engage students and create meaningful learning experiences in any classroom.',
    author: 'Gavin McCormack',
    type: 'book',
    price: { amount: 24.95, currency: 'AUD' },
    isFree: false,
    category: 'Education',
    tags: ['progressive-education', 'teaching-methods', 'classroom-management', 'montessori'],
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    url: 'https://regarded.com.au/progressive-education',
    rating: 4.6,
    publishedDate: '2023-09-20',
    provider: {
      id: 'gavin-mccormack',
      name: 'Gavin McCormack',
      verified: true,
    },
  },
  // Gavin McCormack Free Resources
  {
    id: 'gavin-parenting-guide',
    title: 'Ultimate Parenting & Education Guide',
    description:
      'A comprehensive PDF guide to supporting your child\'s development and creating positive learning environments at home.',
    author: 'Gavin McCormack',
    type: 'free-resource',
    isFree: true,
    category: 'Parenting',
    tags: ['parenting', 'child-development', 'education', 'home-learning'],
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=200&fit=crop',
    url: 'https://gavinmccormack.com.au/resources-pdf/',
    downloadCount: 1250,
    readingTime: 15,
    publishedDate: '2024-02-10',
    provider: {
      id: 'gavin-mccormack',
      name: 'Gavin McCormack',
      verified: true,
    },
  },
  {
    id: 'gavin-classroom-engagement-guide',
    title: 'Classroom Engagement Strategies Guide',
    description:
      'Quick reference guide covering proven strategies to keep children engaged and excited about learning.',
    author: 'Gavin McCormack',
    type: 'free-resource',
    isFree: true,
    category: 'Education',
    tags: ['engagement', 'teaching-strategies', 'classroom-management', 'student-motivation'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    url: 'https://gavinmccormack.com.au/resources-pdf/',
    downloadCount: 2100,
    readingTime: 8,
    publishedDate: '2024-01-05',
    provider: {
      id: 'gavin-mccormack',
      name: 'Gavin McCormack',
      verified: true,
    },
  },
  // Peta Carige Recipe Cards
  {
    id: 'peta-performance-recipes-1',
    title: 'Pre-Workout Power Recipes',
    description:
      'Collection of nutritious pre-workout meals and snacks designed for optimal energy and performance.',
    author: 'Peta Carige',
    type: 'recipe-card',
    price: { amount: 19.95, currency: 'AUD' },
    isFree: false,
    category: 'Performance Recipes',
    tags: ['pre-workout', 'energy', 'recipes', 'performance'],
    imageUrl: 'https://images.unsplash.com/photo-1511909525232-61113c912358?w=300&h=200&fit=crop',
    url: '/library/recipe-cards/pre-workout-power',
    rating: 4.7,
    publishedDate: '2024-03-01',
    provider: {
      id: 'peta-carige',
      name: 'Peta Carige',
      verified: true,
    },
  },
  {
    id: 'peta-recovery-recipes',
    title: 'Recovery Nutrition Recipe Collection',
    description:
      'Post-workout meals and recovery smoothies to optimize muscle repair and glycogen replenishment.',
    author: 'Peta Carige',
    type: 'recipe-card',
    price: { amount: 22.95, currency: 'AUD' },
    isFree: false,
    category: 'Recovery Nutrition',
    tags: ['recovery', 'post-workout', 'muscle-repair', 'smoothies'],
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop',
    url: '/library/recipe-cards/recovery-nutrition',
    rating: 4.9,
    publishedDate: '2024-02-15',
    provider: {
      id: 'peta-carige',
      name: 'Peta Carige',
      verified: true,
    },
  },
];

const MOCK_LIBRARY_PROVIDERS: LibraryProvider[] = [
  {
    id: 'gavin-mccormack',
    name: 'Gavin McCormack',
    title: 'Sports Nutrition Expert',
    verified: true,
    specialization: ['Sports Nutrition', 'Performance Optimization', 'Meal Planning'],
  },
  {
    id: 'peta-carige',
    name: 'Peta Carige',
    title: 'Performance Dietitian',
    verified: true,
    specialization: ['Performance Nutrition', 'Recipe Development', 'Recovery Nutrition'],
  },
];

const MOCK_CATEGORIES = [
  'All Categories',
  'Sports Nutrition',
  'Lifestyle Nutrition',
  'Meal Planning',
  'Performance Recipes',
  'Recovery Nutrition',
];

/**
 * Fetch all library items
 */
export async function getLibraryItems(): Promise<LibraryAPIResponse<LibraryItem[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      data: MOCK_LIBRARY_ITEMS,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching library items:', error);
    return {
      error: 'Failed to fetch library items',
      success: false,
    };
  }
}

/**
 * Fetch library items by category
 */
export async function getLibraryItemsByCategory(category: string): Promise<LibraryAPIResponse<LibraryItem[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filteredItems = category === 'All Categories' 
      ? MOCK_LIBRARY_ITEMS 
      : MOCK_LIBRARY_ITEMS.filter(item => item.category === category);
    
    return {
      data: filteredItems,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching library items by category:', error);
    return {
      error: 'Failed to fetch library items',
      success: false,
    };
  }
}

/**
 * Fetch library categories
 */
export async function getLibraryCategories(): Promise<LibraryAPIResponse<string[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      data: MOCK_CATEGORIES,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching library categories:', error);
    return {
      error: 'Failed to fetch library categories',
      success: false,
    };
  }
}

/**
 * Fetch featured library providers
 */
export async function getFeaturedLibraryProviders(): Promise<LibraryAPIResponse<LibraryProvider[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return {
      data: MOCK_LIBRARY_PROVIDERS,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching featured library providers:', error);
    return {
      error: 'Failed to fetch featured providers',
      success: false,
    };
  }
}

/**
 * Search library items
 */
export async function searchLibraryItems(searchTerm: string): Promise<LibraryAPIResponse<LibraryItem[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const filteredItems = MOCK_LIBRARY_ITEMS.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return {
      data: filteredItems,
      success: true,
    };
  } catch (error) {
    console.error('Error searching library items:', error);
    return {
      error: 'Failed to search library items',
      success: false,
    };
  }
}
