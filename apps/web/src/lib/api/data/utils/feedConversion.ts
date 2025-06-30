import { ActorType, FeedItemType, FeedItemTypeMap, VisibilityLevel } from '../../feed';

// BlogPost interface definition (migrated from network/blogPosts.ts)
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

/**
 * Converts a BlogPost to a FeedItemTypeMap for use in the feed system
 */
export const convertBlogPostToFeedItem = (blogPost: BlogPost): FeedItemTypeMap => {
  return {
    id: blogPost.id,
    type: FeedItemType.POST,
    author: {
      name: getProviderName(blogPost.authorId), 
      handle: `@${blogPost.authorId}`,
      avatar: getProviderAvatar(blogPost.authorId),
      verified: true,
      actorType: ActorType.SERVICE_PROVIDER,
      title: getProviderTitle(blogPost.authorId),
      credentials: getProviderCredentialsFormatted(blogPost.authorId),
      yearsExperience: getProviderExperience(blogPost.authorId),
      specializations: getProviderSpecializations(blogPost.authorId),
      centerName: getProviderCenterName(blogPost.authorId)
    },
    title: blogPost.title,
    description: blogPost.excerpt,
    post: blogPost.content,
    imageUrl: blogPost.imageUrl,
    metadata: {
      createdAt: blogPost.publishDate,
      source: 'zygo-blog',
      sourceUrl: `/blog/${blogPost.id}`,
      authorId: blogPost.authorId
    },
    stats: {
      likes: blogPost.peerLikes.count,
      comments: 0,
      shares: 0,
      reposts: 0
    },
    privacy: {
      visibility: VisibilityLevel.PUBLIC,
      sharedWith: []
    }
  };
};

/**
 * Provider helper functions - these would typically fetch from a provider database
 */
function getProviderName(providerId: string): string {
  const providerNames: Record<string, string> = {
    'rebecca-cavallaro': 'Rebecca Cavallaro',
    'gavin-mccormack': 'Gavin McCormack',
    'dr-justin-tucker': 'Dr. Justin Tucker',
    'dr-sarah-chen': 'Dr. Sarah Chen',
    'michelle-rodriguez': 'Michelle Rodriguez'
  };
  return providerNames[providerId] || 'Unknown Provider';
}

function getProviderAvatar(providerId: string): string {
  const providerAvatars: Record<string, string> = {
    'rebecca-cavallaro': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    'gavin-mccormack': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    'dr-justin-tucker': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    'dr-sarah-chen': 'https://images.unsplash.com/photo-1594824705347-cb9c673607dd?w=150&h=150&fit=crop&crop=face',
    'michelle-rodriguez': 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop&crop=face'
  };
  return providerAvatars[providerId] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
}

function getProviderTitle(providerId: string): string {
  const providerTitles: Record<string, string> = {
    'rebecca-cavallaro': 'IBCLC, Midwife, RN',
    'gavin-mccormack': 'Educator, Author & Child Development Specialist',
    'dr-justin-tucker': 'Obstetrician & Fertility Specialist',
    'dr-sarah-chen': 'Pediatrician & Child Development Specialist',
    'michelle-rodriguez': 'Certified Calmbirth® Educator'
  };
  return providerTitles[providerId] || 'Healthcare Professional';
}

function getProviderCredentialsFormatted(providerId: string): { title: string; abbreviation?: string; issuingBody: string; verified: boolean; }[] {
  const credentialsData: Record<string, { title: string; abbreviation?: string; issuingBody: string; verified: boolean; }[]> = {
    'rebecca-cavallaro': [
      { title: 'International Board Certified Lactation Consultant', abbreviation: 'IBCLC', issuingBody: 'IBLCE', verified: true },
      { title: 'Registered Midwife', abbreviation: 'RM', issuingBody: 'AHPRA', verified: true },
      { title: 'Registered Nurse', abbreviation: 'RN', issuingBody: 'AHPRA', verified: true }
    ],
    'gavin-mccormack': [
      { title: 'Bachelor of Education', abbreviation: 'BEd', issuingBody: 'Australian University', verified: true },
      { title: 'Master of Education (Montessori)', abbreviation: 'MEd', issuingBody: 'Montessori Education Institute', verified: true }
    ],
    'dr-justin-tucker': [
      { title: 'Fellowship in Obstetrics and Gynaecology', abbreviation: 'FRANZCOG', issuingBody: 'RANZCOG', verified: true },
      { title: 'Bachelor of Medicine, Bachelor of Surgery', abbreviation: 'MBBS', issuingBody: 'University', verified: true }
    ]
  };
  return credentialsData[providerId] || [{ title: 'Professional Certification', issuingBody: 'Professional Body', verified: true }];
}

function getProviderExperience(providerId: string): number {
  const providerExperience: Record<string, number> = {
    'rebecca-cavallaro': 12,
    'gavin-mccormack': 25,
    'dr-justin-tucker': 15,
    'dr-sarah-chen': 18,
    'michelle-rodriguez': 8
  };
  return providerExperience[providerId] || 5;
}

function getProviderSpecializations(providerId: string): string[] {
  const providerSpecializations: Record<string, string[]> = {
    'rebecca-cavallaro': ['Lactation Support', 'Breastfeeding Difficulties', 'Antenatal Care'],
    'gavin-mccormack': ['Montessori Education', 'Child Development', 'Progressive Teaching'],
    'dr-justin-tucker': ['Fertility Medicine', 'IVF Treatments', 'Reproductive Endocrinology'],
    'dr-sarah-chen': ['Child Development', 'Pediatric Care', 'Developmental Delays'],
    'michelle-rodriguez': ['Childbirth Education', 'Antenatal Preparation', 'Birth Support']
  };
  return providerSpecializations[providerId] || ['General Practice'];
}

function getProviderCenterName(providerId: string): string {
  const providerCenters: Record<string, string> = {
    'rebecca-cavallaro': 'Full Circle Midwifery',
    'gavin-mccormack': 'Gavin McCormack Educational Services',
    'dr-justin-tucker': 'Prologue',
    'dr-sarah-chen': 'Kids Care Pediatrics',
    'michelle-rodriguez': 'Calmbirth® Australia'
  };
  return providerCenters[providerId] || 'Independent Practice';
}

/**
 * Batch convert multiple blog posts to feed items
 */
export const convertBlogPostsToFeedItems = (blogPosts: BlogPost[]): FeedItemTypeMap[] => {
  return blogPosts.map(convertBlogPostToFeedItem);
};

/**
 * Filter and convert blog posts based on criteria
 */
export const convertFilteredBlogPostsToFeedItems = (
  blogPosts: BlogPost[], 
  options: {
    authorId?: string;
    tags?: string[];
    minReadTime?: number;
    maxReadTime?: number;
    hasReferences?: boolean;
  } = {}
): FeedItemTypeMap[] => {
  let filteredPosts = blogPosts;

  if (options.authorId) {
    filteredPosts = filteredPosts.filter(post => post.authorId === options.authorId);
  }

  if (options.tags && options.tags.length > 0) {
    filteredPosts = filteredPosts.filter(post => 
      options.tags!.some(tag => post.tags.includes(tag))
    );
  }

  if (options.minReadTime !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.readingTime >= options.minReadTime!);
  }

  if (options.maxReadTime !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.readingTime <= options.maxReadTime!);
  }

  if (options.hasReferences !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.hasReferences === options.hasReferences);
  }

  return convertBlogPostsToFeedItems(filteredPosts);
};

export default {
  convertBlogPostToFeedItem,
  convertBlogPostsToFeedItems,
  convertFilteredBlogPostsToFeedItems
};
