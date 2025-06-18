import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nodeTypes } from './nodes';
import { TimelineControlPanel } from './panels/TimelineControlPanel';
import { TimelineFilterPanel } from './panels/TimelineFilterPanel';

export const ReactFlowTimeline = ({
  nodes,
  edges,
  onNodeClick,
  currentZoomLevel,
  zoomLevels,
  handleZoomIn,
  handleZoomOut,
  handleFocusNode,
  focusNodeId,
  focusArea,
  selectedCategories,
  toggleCategoryFilter,
  clearAllFilters,
  selectedFamilyMembers,
  setSelectedFamilyMembers,
  pedagogyData,
  onCanvasWidthChange,
}) => {
  const reactFlowInstance = useReactFlow();

  // Keep track of previous nodes length to avoid excessive centering
  const prevNodesLength = useRef(0);

  // Track canvas dimensions
  const [canvasDimensions, setCanvasDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // ReactFlow state
  const [reactFlowNodes, setNodes, onNodesChangeInternal] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  // Get canvas dimensions from ReactFlow container
  useEffect(() => {
    if (reactFlowInstance) {
      const updateDimensions = () => {
        const container = document.querySelector('.react-flow__renderer');
        if (container) {
          const rect = container.getBoundingClientRect();
          setCanvasDimensions({ width: rect.width, height: rect.height });
          onCanvasWidthChange(rect.width);
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [reactFlowInstance, onCanvasWidthChange]);

  // Enhanced focus behavior
  useEffect(() => {
    if (focusNodeId && reactFlowInstance && nodes.length > 0) {
      const node = nodes.find((n) => n.id === focusNodeId);
      if (node) {
        if (focusArea) {
          const areaNodes = nodes.filter(
            (n) =>
              n.data.ageRange === focusArea ||
              n.data.ageGroup === focusArea ||
              n.id.includes(focusArea)
          );

          if (areaNodes.length > 0) {
            reactFlowInstance.fitView({
              nodes: areaNodes,
              duration: 1000,
              padding: 0.2,
              minZoom: 0.8,
              maxZoom: 1.5,
            });
            setTimeout(() => {
              const viewport = reactFlowInstance.getViewport();
              const canvasCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
              reactFlowInstance.setViewport({
                x: canvasCenterX,
                y: viewport.y,
                zoom: viewport.zoom,
              });
            }, 100);
            return;
          }
        }

        reactFlowInstance.fitView({
          nodes: [node],
          duration: 800,
          padding: 0.3,
          minZoom: 0.5,
          maxZoom: 2.0,
        });
        setTimeout(() => {
          const viewport = reactFlowInstance.getViewport();
          const canvasCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
          reactFlowInstance.setViewport({ x: canvasCenterX, y: viewport.y, zoom: viewport.zoom });
        }, 100);
      }
    }
  }, [focusNodeId, focusArea, nodes, reactFlowInstance, canvasDimensions]);

  // Initial centering when component mounts
  useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.1,
          minZoom: 0.5,
          maxZoom: 1.2,
          duration: 500,
        });
        setTimeout(() => {
          const viewport = reactFlowInstance.getViewport();
          const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
          reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
        }, 600);
      }, 200);
    }
  }, [reactFlowInstance, nodes.length, canvasDimensions]);

  // Handle visual zoom controls
  const handleVisualZoomIn = useCallback(() => {
    reactFlowInstance.zoomIn({ duration: 300 });
  }, [reactFlowInstance]);

  const handleVisualZoomOut = useCallback(() => {
    reactFlowInstance.zoomOut({ duration: 300 });
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    if (nodes.length > 0) {
      reactFlowInstance.fitView({
        duration: 800,
        padding: 0.1,
        minZoom: 0.5,
        maxZoom: 1.5,
      });
      setTimeout(() => {
        const viewport = reactFlowInstance.getViewport();
        const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
        reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
      }, 100);
    }
  }, [reactFlowInstance, nodes, canvasDimensions]);

  // Only restrict horizontal viewport movement, allow vertical panning
  const onMoveEnd = useCallback(
    (event: any, viewport: any) => {
      const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;

      if (Math.abs(viewport.x - screenCenterX) > 50) {
        reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
      }
    },
    [reactFlowInstance, canvasDimensions]
  );

  // Custom nodes change handler to prevent horizontal movement
  const onNodesChange = useCallback(
    (changes: any[]) => {
      const filteredChanges = changes.filter((change) => {
        if (change.type === 'position' && change.id?.includes('ageGroup')) {
          return false;
        }

        if (change.type === 'position' && change.position) {
          const node = reactFlowNodes.find((n) => n.id === change.id);
          if (node && change.position.x !== undefined) {
            const maxHorizontalDistance = 600;
            const constrainedX = Math.max(
              -maxHorizontalDistance,
              Math.min(maxHorizontalDistance, change.position.x)
            );
            change.position.x = constrainedX;
          }
        }

        return true;
      });

      onNodesChangeInternal(filteredChanges);
    },
    [onNodesChangeInternal, reactFlowNodes]
  );

  // Update nodes when generated nodes change
  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  // Auto-center horizontally when nodes change
  useEffect(() => {
    if (nodes.length > 0) {
      const hasNodesChanged = nodes.length !== prevNodesLength.current;
      if (hasNodesChanged) {
        setTimeout(() => {
          const viewport = reactFlowInstance.getViewport();
          const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
          reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
        }, 100);
      }
      prevNodesLength.current = nodes.length;
    }
  }, [nodes.length, reactFlowInstance, canvasDimensions]);

  return (
    <ReactFlow
      nodes={reactFlowNodes}
      edges={reactFlowEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView={false}
      minZoom={0.3}
      maxZoom={2}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      nodesDraggable={true}
      nodesConnectable={false}
      elementsSelectable={true}
      panOnDrag={true}
      onMoveEnd={onMoveEnd}
      preventScrolling={false}
      zoomOnDoubleClick={false}
    >
      <Background />
      <Controls />
      <MiniMap
        nodeColor={(node) => {
          switch (node.type) {
            case 'ageGroup':
              return '#6b7280';
            case 'milestone':
              return '#3b82f6';
            default:
              return '#9ca3af';
          }
        }}
        maskColor="rgba(255, 255, 255, 0.8)"
        position="bottom-right"
      />

      <TimelineControlPanel
        currentZoomLevel={currentZoomLevel}
        zoomLevels={zoomLevels}
        focusArea={focusArea}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitView={handleFitView}
        onVisualZoomIn={handleVisualZoomIn}
        onVisualZoomOut={handleVisualZoomOut}
      />

      <TimelineFilterPanel
        selectedCategories={selectedCategories}
        selectedFamilyMembers={selectedFamilyMembers}
        pedagogyData={pedagogyData}
        onToggleCategoryFilter={toggleCategoryFilter}
        onClearAllFilters={clearAllFilters}
        onSetSelectedFamilyMembers={setSelectedFamilyMembers}
      />
    </ReactFlow>
  );
};
