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
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        transformOrigin: '0 0',
      }}
    >
      {ageGroups.map((ageGroup, index) => (
        <React.Fragment key={ageGroup.id}>
          {/* Horizontal line across the age group */}
          <div
            className="absolute border-t-2 border-dashed border-blue-400 opacity-60"
            style={{
              left: (192 - viewport.x) / viewport.zoom, // Adjust for wider ruler position (48 * 4px = 192px) and viewport transform
              right: -viewport.x / viewport.zoom, // Adjust for viewport transform
              top: ageGroup.position.y + 560, // Center with milestone cards at much wider spacing
              height: 1,
            }}
          />

          {/* Age label on the right */}
          <div
            className="absolute text-xs text-blue-700 font-medium bg-blue-50 border border-blue-200 px-2 py-1 rounded shadow-sm"
            style={{
              right: -viewport.x / viewport.zoom + 20, // Adjust for viewport transform
              top: ageGroup.position.y + 540,
            }}
          >
            {ageGroup.months[0]}m → {ageGroup.months[1]}m
          </div>
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
