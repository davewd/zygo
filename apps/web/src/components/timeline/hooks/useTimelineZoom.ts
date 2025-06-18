import { useCallback, useState } from 'react';
import { ZOOM_LEVELS } from '../constants';

export const useTimelineZoom = () => {
  const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState<string | null>(null);

  const handleZoomIn = useCallback(() => {
    if (currentZoomLevel < ZOOM_LEVELS.length - 1) {
      setCurrentZoomLevel(currentZoomLevel + 1);
    }
  }, [currentZoomLevel]);

  const handleZoomOut = useCallback(() => {
    if (currentZoomLevel > 0) {
      setCurrentZoomLevel(currentZoomLevel - 1);
    }
  }, [currentZoomLevel]);

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
        if (currentZoomLevel === 0) {
          setCurrentZoomLevel(1);
        }
      }
    },
    [currentZoomLevel]
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
