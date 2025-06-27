export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatStats = (count: number | undefined | null) => {
  // Handle undefined, null, or invalid values
  const validCount = typeof count === 'number' ? count : 0;
  
  if (validCount >= 1000000) {
    return (validCount / 1000000).toFixed(1) + 'M';
  } else if (validCount >= 1000) {
    return (validCount / 1000).toFixed(1) + 'K';
  }
  return validCount.toString();
};

// Hashtag utility functions
export const extractHashtags = (content: string): string[] => {
  const hashtagRegex = /#(\w+)/g;
  const matches = content.match(hashtagRegex);
  return matches ? matches.map(tag => tag.substring(1)) : [];
};

export const parseContentWithHashtags = (content: string) => {
  const hashtagRegex = /#(\w+)/g;
  return content.replace(hashtagRegex, '<span class="hashtag">$&</span>');
};

export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return formatDate(dateString);
  }
};
