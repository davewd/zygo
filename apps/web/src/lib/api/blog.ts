/**
 * Blog Posts API
 * Provides access to blog post data
 */

import blogPostsData from './data/blogPosts.json';

// Mock delay for API simulation
const API_DELAY = 300;

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  authorId: string;
  publishDate: string;
  tags: string[];
  hasReferences: boolean;
  peerLikes: {
    count: number;
    likedBy: PeerLike[];
  };
  readingTime: number;
}

export interface PeerLike {
  providerId: string;
  providerName: string;
  credentials: string[];
  specializations: string[];
  dateLiked: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  credentials: string[];
  specializations: string[];
  bio: string;
}

export interface BlogPostsResponse {
  blogPosts: BlogPost[];
  total: number;
}

export interface BlogPostFilters {
  authorId?: string;
  tags?: string[];
  hasReferences?: boolean;
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(
  filters?: BlogPostFilters
): Promise<BlogPostsResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  let posts = blogPostsData.blogPosts as BlogPost[];
  
  // Apply filters if provided
  if (filters) {
    if (filters.authorId) {
      posts = posts.filter(post => post.authorId === filters.authorId);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      posts = posts.filter(post =>
        post.tags.some(tag =>
          filters.tags!.some(filterTag =>
            tag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      );
    }
    
    if (filters.hasReferences !== undefined) {
      posts = posts.filter(post => post.hasReferences === filters.hasReferences);
    }
  }
  
  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  return {
    blogPosts: posts,
    total: posts.length
  };
}

/**
 * Get blog post by ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const post = blogPostsData.blogPosts.find(
    post => post.id === id
  ) as BlogPost | undefined;
  
  return post || null;
}

/**
 * Get blog posts by author
 */
export async function getBlogPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const posts = blogPostsData.blogPosts.filter(
    post => post.authorId === authorId
  ) as BlogPost[];
  
  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  return posts;
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(
  query: string,
  filters?: BlogPostFilters
): Promise<BlogPostsResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  let posts = blogPostsData.blogPosts as BlogPost[];
  
  // Apply text search
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Apply additional filters
  if (filters) {
    if (filters.authorId) {
      posts = posts.filter(post => post.authorId === filters.authorId);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      posts = posts.filter(post =>
        post.tags.some(tag =>
          filters.tags!.some(filterTag =>
            tag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      );
    }
  }
  
  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  return {
    blogPosts: posts,
    total: posts.length
  };
}

/**
 * Get blog posts with pagination
 */
export async function getBlogPostsPaginated(
  page: number = 1,
  limit: number = 10,
  filters?: BlogPostFilters
): Promise<BlogPostsResponse & { page: number; totalPages: number }> {
  // Get all posts first
  const allPosts = await getAllBlogPosts(filters);
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = allPosts.blogPosts.slice(startIndex, endIndex);
  
  return {
    blogPosts: paginatedPosts,
    total: allPosts.total,
    page,
    totalPages: Math.ceil(allPosts.total / limit)
  };
}

/**
 * Get all blog authors
 */
export async function getAllBlogAuthors(): Promise<BlogAuthor[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  return blogPostsData.authors as BlogAuthor[];
}

/**
 * Get blog author by ID
 */
export async function getBlogAuthorById(id: string): Promise<BlogAuthor | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const author = blogPostsData.authors.find(
    author => author.id === id
  ) as BlogAuthor | undefined;
  
  return author || null;
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const posts = blogPostsData.blogPosts as BlogPost[];
  
  // Sort by publish date (newest first) and limit
  return posts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
}

/**
 * Get popular blog posts (by peer likes)
 */
export async function getPopularBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const posts = blogPostsData.blogPosts as BlogPost[];
  
  // Sort by peer likes count (highest first) and limit
  return posts
    .sort((a, b) => b.peerLikes.count - a.peerLikes.count)
    .slice(0, limit);
}
