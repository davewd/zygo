import React from 'react';
import { Link } from 'react-router-dom';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { formatDate } from './feedUtils';
import { PrivacyIndicator } from './PrivacyIndicator';

interface FeedItemHeaderProps {
  item: FeedItemTypeMap;
  className?: string;
  avatarClassName?: string;
  children?: React.ReactNode;
  customHeader?: React.ReactNode;
}

export const FeedItemHeader: React.FC<FeedItemHeaderProps> = ({
  item,
  className = '',
  avatarClassName = '',
  children,
  customHeader,
}) => {
  if (customHeader) {
    return <>{customHeader}</>;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={item.author.avatar}
        alt={item.author.name}
        className={`w-12 h-12 rounded-full object-cover ${avatarClassName}`}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== 'https://via.placeholder.com/48') {
            img.src = 'https://via.placeholder.com/48';
          }
        }}
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Link
            to={`/community/profiles/${item.author.handle}`}
            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {item.author.name}
          </Link>
          {item.author.verified && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <span className="text-gray-500 text-sm">@{item.author.handle}</span>
          {item.sponsoredData && <span className="text-gray-400 text-sm">• Sponsored</span>}
        </div>
        <p className="text-gray-500 text-sm">{formatDate(item.metadata.createdAt)}</p>
        {children}
      </div>
      <PrivacyIndicator privacy={item.privacy} />
    </div>
  );
};
