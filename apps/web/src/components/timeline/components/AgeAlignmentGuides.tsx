import React from 'react';

interface AgeAlignmentGuidesProps {
  ageGroups: Array<{
    id: string;
    position: { x: number; y: number };
    months: [number, number];
  }>;
  show?: boolean;
  viewport?: { x: number; y: number; zoom: number };
}

export const AgeAlignmentGuides: React.FC<AgeAlignmentGuidesProps> = ({
  ageGroups,
  show = false,
  viewport = { x: 0, y: 0, zoom: 1 },
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1, // Behind all timeline cards
      }}
    >
      {ageGroups.map((ageGroup, index) => (
        <React.Fragment key={ageGroup.id}>
          {/* Horizontal line across the entire viewport, aligned with ruler tick marks */}
          <div
            className="absolute border-blue-500 opacity-50"
            style={{
              left: 0,
              right: 0,
              // Align with the center of the ruler's age group containers (where the tick marks are)
              top: (ageGroup.position.y + 160) * viewport.zoom + viewport.y + 320 * viewport.zoom, // Center of the 640px height container
              height: 1,
              width: '100vw',
              borderTop: '2px dashed',
              borderImageSource:
                'repeating-linear-gradient(to right, #3b82f6 0px, #3b82f6 4px, transparent 4px, transparent 8px)',
              borderImageSlice: 1,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

// Toggle component for showing/hiding guides
export const AgeAlignmentToggle: React.FC<{
  show: boolean;
  onToggle: (show: boolean) => void;
}> = ({ show, onToggle }) => {
  return (
    <div className="absolute top-4 right-4 z-20">
      <button
        onClick={() => onToggle(!show)}
        className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
          show
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        {show ? 'Hide' : 'Show'} Age Guides
      </button>
    </div>
  );
};
