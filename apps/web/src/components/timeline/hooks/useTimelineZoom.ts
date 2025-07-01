import { useCallback, useState } from 'react';
import { ZOOM_LEVELS } from '../constants';

export const useTimelineZoom = () => {
  // Set to most granular level (level 2) and disable zoom changes
  const [currentZoomLevel] = useState(2); // Fixed at most detailed level
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState<string | null>(null);

  // Disable zoom functionality
  const handleZoomIn = useCallback(() => {
    // Disabled - no zoom functionality
  }, []);

  const handleZoomOut = useCallback(() => {
    // Disabled - no zoom functionality
  }, []);

  const handleFocusNode = useCallback((nodeId: string) => {
    setFocusNodeId(nodeId);
  }, []);

  const handleNodeClick = useCallback(
    (nodeId: string, nodeData: any, onNodeClick?: (nodeId: string, nodeData: any) => void) => {
      if (onNodeClick) {
        onNodeClick(nodeId, nodeData);
      }

      setFocusNodeId(nodeId);

      // Set focus area based on node type
      if (nodeData.type === 'ageGroup') {
        setFocusArea(nodeData.ageRange);
        // No longer change zoom level - stay at granular view
      }
    },
    [] // Remove currentZoomLevel dependency since it's now fixed
  );

  return {
    currentZoomLevel,
    focusNodeId,
    focusArea,
    zoomLevels: ZOOM_LEVELS,
    handleZoomIn,
    handleZoomOut,
    handleFocusNode,
    handleNodeClick,
    setFocusArea,
  };
};
