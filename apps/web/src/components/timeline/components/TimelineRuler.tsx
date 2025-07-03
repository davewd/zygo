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
}

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  ageGroups,
  show = true,
  viewport = { x: 0, y: 0, zoom: 1 },
}) => {
  if (!show || ageGroups.length === 0) return null;

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
      className="absolute left-0 w-48 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none border-r border-gray-200 z-10 shadow-lg"
      style={{
        top: 0,
        height: '100vh', // Full viewport height
        transform: `translateY(${viewport.y}px)`,
      }}
    >
      {ageGroups.map((ageGroup, index) => (
        <div
          key={ageGroup.id}
          className="absolute left-0 right-0 flex flex-col items-start justify-center px-4"
          style={{
            top: (ageGroup.position.y + 160) * viewport.zoom, // Better center alignment with milestone cards
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
