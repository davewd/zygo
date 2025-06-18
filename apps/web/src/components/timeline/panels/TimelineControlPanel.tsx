import { Panel } from '@xyflow/react';
import { Button } from '@zygo/ui';
import { Focus, ZoomIn, ZoomOut } from 'lucide-react';
import { TimelineZoomLevel } from '../types';

// Temporary wrapper to fix TypeScript issues
const SafeButton = Button as any;

interface TimelineControlPanelProps {
  currentZoomLevel: number;
  zoomLevels: TimelineZoomLevel[];
  focusArea: string | null;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onVisualZoomIn: () => void;
  onVisualZoomOut: () => void;
}

export const TimelineControlPanel = ({
  currentZoomLevel,
  zoomLevels,
  focusArea,
  onZoomIn,
  onZoomOut,
  onFitView,
  onVisualZoomIn,
  onVisualZoomOut,
}) => {
  return (
    <Panel position="top-left" className="bg-white p-4 rounded-lg shadow-lg border">
      <div className="space-y-3">
        {/* Zoom Level Info */}
        <div className="text-sm">
          <div className="font-semibold text-gray-800">{zoomLevels[currentZoomLevel].name}</div>
          <div className="text-gray-600 text-xs">{zoomLevels[currentZoomLevel].description}</div>
          {focusArea && (
            <div className="text-blue-600 text-xs mt-1">📍 Focused on: {focusArea}</div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <SafeButton
            size="sm"
            variant="outline"
            onClick={onZoomOut}
            disabled={currentZoomLevel === 0}
            className="flex items-center space-x-1"
          >
            <ZoomOut className="w-3 h-3" />
            <span>Out</span>
          </SafeButton>
          <SafeButton
            size="sm"
            variant="outline"
            onClick={onZoomIn}
            disabled={currentZoomLevel === zoomLevels.length - 1}
            className="flex items-center space-x-1"
          >
            <ZoomIn className="w-3 h-3" />
            <span>In</span>
          </SafeButton>
          <SafeButton
            size="sm"
            variant="outline"
            onClick={onFitView}
            className="flex items-center space-x-1"
          >
            <Focus className="w-3 h-3" />
            <span>Fit</span>
          </SafeButton>
        </div>

        {/* Visual Zoom Controls */}
        <div className="flex items-center space-x-2 pt-2 border-t">
          <span className="text-xs text-gray-600">View:</span>
          <SafeButton size="sm" variant="ghost" onClick={onVisualZoomIn} className="p-1">
            <ZoomIn className="w-3 h-3" />
          </SafeButton>
          <SafeButton size="sm" variant="ghost" onClick={onVisualZoomOut} className="p-1">
            <ZoomOut className="w-3 h-3" />
          </SafeButton>
        </div>
      </div>
    </Panel>
  );
};
