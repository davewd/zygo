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

  // Allow free panning - disabled automatic focus behavior
  // Enhanced focus behavior commented out to enable free movement
  /*
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
  */

  // Allow free panning - disabled initial centering
  // Initial centering when component mounts commented out to enable free movement
  /*
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
  */

  // Handle visual zoom controls
  const handleVisualZoomIn = useCallback(() => {
    reactFlowInstance.zoomIn({ duration: 300 });
  }, [reactFlowInstance]);

  const handleVisualZoomOut = useCallback(() => {
    reactFlowInstance.zoomOut({ duration: 300 });
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    if (nodes.length > 0) {
      // Allow free panning - removed centering constraint
      reactFlowInstance.fitView({
        duration: 800,
        padding: 0.1,
        minZoom: 0.5,
        maxZoom: 1.5,
      });
      // Removed automatic recentering to allow free movement
    }
  }, [reactFlowInstance, nodes]);

  // Allow free panning - removed viewport movement restrictions
  // Commented out horizontal constraint to enable free movement
  /*
  const onMoveEnd = useCallback(
    (event: any, viewport: any) => {
      const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;

      if (Math.abs(viewport.x - screenCenterX) > 50) {
        reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
      }
    },
    [reactFlowInstance, canvasDimensions]
  );
  */

  // Allow free movement - removed horizontal movement constraints
  // Use default nodes change handler to enable free dragging
  const onNodesChange = onNodesChangeInternal;

  // Update nodes when generated nodes change
  useEffect(() => {
    console.log(`🔄 ReactFlow updating: ${nodes.length} nodes, ${edges.length} edges`);
    console.log('📊 Edge details:', edges.slice(0, 3)); // Show first 3 edges
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  // Allow free panning - disabled auto-centering when nodes change
  // Commented out to enable free movement
  /*
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
  */

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView={false}
        minZoom={0.2}
        maxZoom={3}
        defaultViewport={{ x: 0, y: 50, zoom: 0.6 }} // Start with better overview position
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={true}
        panOnScroll={true} // Enable pan on scroll
        zoomOnScroll={true} // Enable zoom on scroll
        // Removed onMoveEnd to allow free panning
        preventScrolling={false}
        zoomOnDoubleClick={true} // Allow double-click zoom
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

        {/* Temporarily disabled zoom controls for granular view development */}
        {/*
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
        */}

        <TimelineFilterPanel
          selectedCategories={selectedCategories}
          selectedFamilyMembers={selectedFamilyMembers}
          pedagogyData={pedagogyData}
          onToggleCategoryFilter={toggleCategoryFilter}
          onClearAllFilters={clearAllFilters}
          onSetSelectedFamilyMembers={setSelectedFamilyMembers}
        />
      </ReactFlow>
    </div>
  );
};
