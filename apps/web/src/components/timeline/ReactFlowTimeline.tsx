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
import { useCallback, useEffect, useState } from 'react';
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

  // Focus behavior removed to allow free panning and zooming

  // Initial centering removed to allow free panning and zooming

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
    }
  }, [reactFlowInstance, nodes]);

  // Movement constraints removed to allow free panning

  // Allow free movement - use default nodes change handler to enable free dragging
  const onNodesChange = onNodesChangeInternal;

  // Update nodes when generated nodes change
  useEffect(() => {
    console.log(`🔄 ReactFlow updating: ${nodes.length} nodes, ${edges.length} edges`);
    console.log('📊 Edge details:', edges.slice(0, 3)); // Show first 3 edges
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  // Auto-centering removed to allow free panning and zooming

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
        defaultViewport={{ x: 0, y: 50, zoom: 0.6 }} // Start with overview position
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={true}
        panOnScroll={true}
        zoomOnScroll={true}
        preventScrolling={false}
        zoomOnDoubleClick={true}
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
