import React, { useState } from 'react';
import { PrivacySettings, VisibilityLevel } from '../../../lib/api/feed';

interface PrivacyIndicatorProps {
  privacy: PrivacySettings;
  className?: string;
}

export const PrivacyIndicator: React.FC<PrivacyIndicatorProps> = ({ privacy, className = '' }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getIcon = () => {
    switch (privacy.visibility) {
      case VisibilityLevel.PUBLIC:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        );
      case VisibilityLevel.GROUP:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16.5c-.83 0-1.54.5-1.85 1.22l-.92 2.65A1.5 1.5 0 0 0 15.15 14H16v8h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2.5 16v-7H6v7h2zm-2.88-8.21l.41-1.16A1.5 1.5 0 0 1 6.94 12h2.12c.83 0 1.54.5 1.85 1.22l.92 2.65A1.5 1.5 0 0 1 10.41 18H8v4H6v-6z" />
          </svg>
        );
      case VisibilityLevel.PRIVATE:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getVisibilityText = () => {
    switch (privacy.visibility) {
      case VisibilityLevel.PUBLIC:
        return 'Public';
      case VisibilityLevel.GROUP:
        return 'Groups';
      case VisibilityLevel.PRIVATE:
        return privacy.sharedWith.length === 0
          ? 'Only to you'
          : `${privacy.sharedWith.length} people`;
      default:
        return '';
    }
  };

  const getDropdownContent = () => {
    if (privacy.visibility === VisibilityLevel.PUBLIC) {
      return (
        <div className="text-sm text-gray-600">
          <p className="font-medium">Public</p>
          <p>Anyone can see this post</p>
        </div>
      );
    }

    if (privacy.sharedWith.length === 0) {
      return (
        <div className="text-sm text-gray-600">
          <p className="font-medium">Only to you</p>
          <p>Only you can see this post</p>
        </div>
      );
    }

    return (
      <div className="text-sm">
        <p className="font-medium text-gray-900 mb-2">Shared with:</p>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {privacy.sharedWith.map((entity) => (
            <div key={entity.id} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">
                {entity.name}
                {entity.type === 'group' && <span className="text-gray-500 ml-1">(group)</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {getIcon()}
        <span className="text-xs font-medium">{getVisibilityText()}</span>
      </button>

      {showDropdown && (
        <div
          className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {getDropdownContent()}
        </div>
      )}
    </div>
  );
};
