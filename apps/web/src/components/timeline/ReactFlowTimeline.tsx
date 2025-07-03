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
import { AgeAlignmentGuides, AgeAlignmentToggle } from './components/AgeAlignmentGuides';
import { TimelineRuler, TimelineRulerToggle } from './components/TimelineRuler';
import { TIMELINE_LAYOUT } from './constants';
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
  profileAvatarSelector,
}) => {
  const reactFlowInstance = useReactFlow();

  // Determine user profile type (simplified logic for demo)
  // In a real app, this would come from user context/authentication
  const getUserProfile = (): 'parent' | 'service_provider' | null => {
    // For demo purposes, we'll determine based on a simple check
    // You can replace this with actual user context logic
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Simplified logic - in reality this would come from user authentication/context
    // For now, we'll default to 'parent' for demo purposes
    // You could also check localStorage, URL params, or global state
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile === 'service_provider') {
      return 'service_provider';
    }
    return 'parent'; // Default to parent profile
  };

  // Track canvas dimensions
  const [canvasDimensions, setCanvasDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Age alignment guides state
  const [showAgeGuides, setShowAgeGuides] = useState(false);
  const [showRuler, setShowRuler] = useState(true);

  // Viewport tracking for ruler and guides positioning
  const [viewport, setViewport] = useState({ x: 0, y: 50, zoom: 0.6 });

  // ReactFlow state
  const [reactFlowNodes, setNodes, onNodesChangeInternal] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  // Handle node drag with Y-axis locking
  const onNodesChange = useCallback(
    (changes: any[]) => {
      // Process each change to lock Y position
      const processedChanges = changes.map((change) => {
        if (change.type === 'position' && change.position) {
          // Find the original node to get its locked Y position
          const originalNode = reactFlowNodes.find((node) => node.id === change.id);
          if (originalNode) {
            // Allow X changes but lock Y to original position
            return {
              ...change,
              position: {
                x: change.position.x,
                y: originalNode.position.y, // Lock Y position
              },
            };
          }
        }
        return change;
      });

      onNodesChangeInternal(processedChanges);
    },
    [reactFlowNodes, onNodesChangeInternal]
  );

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
      {/* SVG Gradients for Enhanced Edges */}
      <svg className="zygo-edge-gradients">
        <defs>
          <linearGradient id="zygo-goal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#721aff" />
            <stop offset="50%" stopColor="#e6ab23" />
            <stop offset="100%" stopColor="#721aff" />
          </linearGradient>
          <linearGradient id="zygo-pathway-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onMove={(event, newViewport) => setViewport(newViewport)}
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

        {/* Age Alignment Guides - bring back horizontal guides */}
        <AgeAlignmentGuides
          ageGroups={(() => {
            // Use the same age range data for alignment guides
            const ageRangeKeys = [
              { key: 'prenatal_early', months: [-12, -6], title: 'Prenatal (First Trimester)' },
              { key: 'prenatal_late', months: [-6, 0], title: 'Prenatal (Second/Third Trimester)' },
              { key: 'infancy_0_6', months: [0, 6], title: '0-6 months' },
              { key: 'infancy_6_12', months: [6, 12], title: '6 months - 1 year' },
              { key: 'early_childhood_12_18', months: [12, 18], title: '1 year - 1 year 6 months' },
              {
                key: 'early_childhood_18_24',
                months: [18, 24],
                title: '1 year 6 months - 2 years',
              },
              {
                key: 'early_childhood_24_30',
                months: [24, 30],
                title: '2 years - 2 years 6 months',
              },
              {
                key: 'early_childhood_30_36',
                months: [30, 36],
                title: '2 years 6 months - 3 years',
              },
              { key: 'preschool_36_48', months: [36, 48], title: '3-4 years' },
              { key: 'preschool_48_60', months: [48, 60], title: '4-5 years' },
              { key: 'school_age_60_72', months: [60, 72], title: '5-6 years' },
              { key: 'school_age_72_84', months: [72, 84], title: '6-7 years' },
              { key: 'school_age_84_96', months: [84, 96], title: '7-8 years' },
            ];

            return ageRangeKeys.map((range, index) => ({
              id: range.key,
              position: {
                x: 0,
                y: TIMELINE_LAYOUT.BASE_Y_OFFSET + index * TIMELINE_LAYOUT.AGE_BAND_SPACING,
              },
              months: range.months as [number, number],
            }));
          })()}
          show={showAgeGuides}
          viewport={viewport}
        />

        {/* Age Alignment Toggle - always show since we have consistent age data */}
        <AgeAlignmentToggle show={showAgeGuides} onToggle={setShowAgeGuides} />

        {/* Timeline Ruler - use proper age ranges data */}
        <TimelineRuler
          ageGroups={(() => {
            // Import the actual age ranges data instead of deriving from milestones
            const ageRangeKeys = [
              { key: 'prenatal_early', months: [-12, -6], title: 'Prenatal (First Trimester)' },
              { key: 'prenatal_late', months: [-6, 0], title: 'Prenatal (Second/Third Trimester)' },
              { key: 'infancy_0_6', months: [0, 6], title: '0-6 months' },
              { key: 'infancy_6_12', months: [6, 12], title: '6 months - 1 year' },
              { key: 'early_childhood_12_18', months: [12, 18], title: '1 year - 1 year 6 months' },
              {
                key: 'early_childhood_18_24',
                months: [18, 24],
                title: '1 year 6 months - 2 years',
              },
              {
                key: 'early_childhood_24_30',
                months: [24, 30],
                title: '2 years - 2 years 6 months',
              },
              {
                key: 'early_childhood_30_36',
                months: [30, 36],
                title: '2 years 6 months - 3 years',
              },
              { key: 'preschool_36_48', months: [36, 48], title: '3-4 years' },
              { key: 'preschool_48_60', months: [48, 60], title: '4-5 years' },
              { key: 'school_age_60_72', months: [60, 72], title: '5-6 years' },
              { key: 'school_age_72_84', months: [72, 84], title: '6-7 years' },
              { key: 'school_age_84_96', months: [84, 96], title: '7-8 years' },
            ];

            // Calculate positions based on chronological flow with wider spacing
            return ageRangeKeys.map((range, index) => ({
              id: range.key,
              position: {
                x: 0,
                y: TIMELINE_LAYOUT.BASE_Y_OFFSET + index * TIMELINE_LAYOUT.AGE_BAND_SPACING,
              },
              months: range.months as [number, number],
              title: range.title,
            }));
          })()}
          show={showRuler}
          viewport={viewport}
          currentZoomLevel={currentZoomLevel}
          userProfile={getUserProfile()}
          profileAvatarSelector={profileAvatarSelector}
        />

        {/* Timeline Ruler Toggle */}
        <TimelineRulerToggle show={showRuler} onToggle={setShowRuler} />
      </ReactFlow>
    </div>
  );
};
