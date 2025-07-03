import React from 'react';

interface TimelineRulerProps {
  ageGroups: Array<{
    id: string;
    position: { x: number; y: number };
    months: [number, number];
    title: string;
  }>;
  show?: boolean;
  viewport?: { x: number; y: number; zoom: number };
  currentZoomLevel?: number;
  userProfile?: 'parent' | 'service_provider' | null;
}

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  ageGroups,
  show = true,
  viewport = { x: 0, y: 0, zoom: 1 },
  currentZoomLevel = 2,
  userProfile = null,
}) => {
  if (!show || ageGroups.length === 0) return null;

  // Zoom level descriptions
  const getZoomLevelDescription = (level: number) => {
    switch (level) {
      case 0:
        return { level: '1/4', description: 'Age Groups' };
      case 1:
        return { level: '2/4', description: 'Key Milestones' };
      case 2:
        return { level: '3/4', description: 'All Milestones' };
      case 3:
        return { level: '4/4', description: 'Step Level' };
      default:
        return { level: '3/4', description: 'All Milestones' };
    }
  };

  // User profile information
  const getUserProfileInfo = () => {
    switch (userProfile) {
      case 'parent':
        return {
          name: 'Daughter Lily',
          avatar: '👧',
          bgColor: 'from-pink-100 to-purple-100',
        };
      case 'service_provider':
        return {
          name: 'Patient 3',
          avatar: '🩺',
          bgColor: 'from-blue-100 to-teal-100',
        };
      default:
        return {
          name: 'My Timeline',
          avatar: '📊',
          bgColor: 'from-gray-100 to-slate-100',
        };
    }
  };

  const zoomInfo = getZoomLevelDescription(currentZoomLevel);
  const profileInfo = getUserProfileInfo();

  const formatAge = (months: number) => {
    if (months < 0) {
      return `${Math.abs(months)}m prenatal`;
    } else if (months < 12) {
      return `${months}m`;
    } else if (months < 24) {
      const remainingMonths = months % 12;
      return remainingMonths > 0 ? `1y ${remainingMonths}m` : `1y`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years}y`;
    }
  };

  return (
    <div
      className="fixed left-0 w-32 pointer-events-none border-r border-white/20 z-10"
      style={{
        top: 0,
        height: '100vh', // Full viewport height
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), transparent)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', // Safari support
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        // Remove transform so it stays fixed to the viewport
      }}
    >
      {/* Zoom Level Legend with Avatar */}
      <div className="absolute top-2 left-2 right-2 z-20">
        <div
          className={`bg-gradient-to-r ${profileInfo.bgColor} backdrop-blur-sm border border-gray-200 rounded-md p-2 text-center shadow-sm`}
        >
          {/* User Profile Row */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-lg">{profileInfo.avatar}</span>
            <div className="text-xs font-medium text-gray-700">{profileInfo.name}</div>
          </div>

          {/* Zoom Level Row */}
          <div className="border-t border-gray-300 pt-1">
            <div className="text-xs font-semibold text-gray-700">{zoomInfo.level}</div>
            <div className="text-xs text-gray-600">{zoomInfo.description}</div>
          </div>
        </div>
      </div>

      {ageGroups.map((ageGroup, index) => (
        <div
          key={ageGroup.id}
          className="absolute left-0 right-0 flex flex-col items-start justify-center px-4"
          style={{
            top: (ageGroup.position.y + 160) * viewport.zoom + viewport.y, // Adjust for fixed positioning
            height: 640 * viewport.zoom, // Much larger height to accommodate 4x spacing
          }}
        >
          {/* Age marker */}
          <div
            className="text-lg font-bold text-gray-800 bg-white/95 px-4 py-2 rounded-lg shadow-md mb-4 border border-gray-300"
            style={{
              fontSize: `${18 * Math.min(viewport.zoom, 1.2)}px`, // Larger base font size, scale but cap at 1.2x
              marginBottom: `${16 * viewport.zoom}px`,
              padding: `${8 * viewport.zoom}px ${16 * viewport.zoom}px`,
            }}
          >
            {formatAge(ageGroup.months[0])}
          </div>

          {/* Period indicator */}
          <div
            className="text-sm text-gray-600 bg-white/90 px-3 py-1.5 rounded-md border border-gray-200"
            style={{
              fontSize: `${14 * Math.min(viewport.zoom, 1.2)}px`, // Larger base font size, scale but cap at 1.2x
              padding: `${6 * viewport.zoom}px ${12 * viewport.zoom}px`,
            }}
          >
            to {formatAge(ageGroup.months[1])}
          </div>

          {/* Enhanced tick mark */}
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-600 to-gray-400"
            style={{
              width: `${32 * viewport.zoom}px`, // Larger tick mark width
              height: `${3 * viewport.zoom}px`, // Thicker tick mark
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Toggle for the ruler
export const TimelineRulerToggle: React.FC<{
  show: boolean;
  onToggle: (show: boolean) => void;
}> = ({ show, onToggle }) => {
  return (
    <div className="absolute top-16 right-4 z-20">
      <button
        onClick={() => onToggle(!show)}
        className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
          show
            ? 'bg-purple-600 text-white'
            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        {show ? 'Hide' : 'Show'} Age Ruler
      </button>
    </div>
  );
};
