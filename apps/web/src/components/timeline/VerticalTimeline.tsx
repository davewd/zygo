import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { useTimelineData } from './hooks/useTimelineData';
import { useTimelineFilters } from './hooks/useTimelineFilters';
import { useTimelineZoom } from './hooks/useTimelineZoom';
import { ReactFlowTimeline } from './ReactFlowTimeline';
import { TimelinePedagogyProps } from './types';

export const VerticalTimeline = ({ pedagogyData, onNodeClick }: TimelinePedagogyProps) => {
  // Custom hooks for state management
  const {
    selectedCategories,
    selectedFamilyMembers,
    setSelectedFamilyMembers,
    toggleCategoryFilter,
    clearAllFilters,
  } = useTimelineFilters();

  const {
    currentZoomLevel,
    focusNodeId,
    focusArea,
    zoomLevels,
    handleZoomIn,
    handleZoomOut,
    handleFocusNode,
    handleNodeClick,
  } = useTimelineZoom();

  // Canvas width tracking
  const [canvasWidth, setCanvasWidth] = useState<number | undefined>(undefined);

  const handleCanvasWidthChange = useCallback((width: number) => {
    setCanvasWidth(width);
  }, []);

  // Load timeline data
  const { nodes, edges } = useTimelineData({
    pedagogyData,
    currentZoomLevel,
    selectedCategories,
    selectedFamilyMembers,
    focusArea,
    canvasWidth,
  });

  // Handle node click with zoom logic
  const onNodeClickInternal = useCallback(
    (event: React.MouseEvent, node: any) => {
      handleNodeClick(node.id, node.data, onNodeClick);
    },
    [handleNodeClick, onNodeClick]
  );

  return (
    <div className="h-screen w-full bg-gray-50">
      <ReactFlowProvider>
        <ReactFlowTimeline
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClickInternal}
          currentZoomLevel={currentZoomLevel}
          zoomLevels={zoomLevels}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleFocusNode={handleFocusNode}
          focusNodeId={focusNodeId}
          focusArea={focusArea}
          selectedCategories={selectedCategories}
          toggleCategoryFilter={toggleCategoryFilter}
          clearAllFilters={clearAllFilters}
          selectedFamilyMembers={selectedFamilyMembers}
          setSelectedFamilyMembers={setSelectedFamilyMembers}
          pedagogyData={pedagogyData}
          onCanvasWidthChange={handleCanvasWidthChange}
        />
      </ReactFlowProvider>
    </div>
  );
};
