import dagre from 'dagre';
import { TimelineNode, TimelineEdge } from '../types';

export interface DagreLayoutOptions {
  rankdir?: 'TB' | 'BT' | 'LR' | 'RL';
  ranksep?: number;
  nodesep?: number;
  edgesep?: number;
  marginx?: number;
  marginy?: number;
}

export const getLayoutedElements = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  const {
    rankdir = 'TB', // Force Y-axis (top to bottom) layout
    ranksep = 300,  // Increased vertical spacing between ranks
    nodesep = 150,  // Increased horizontal spacing between nodes in same rank
    edgesep = 60,   // Increased edge separation
    marginx = 100,  // Increased margins
    marginy = 100,
  } = options;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure the graph layout
  dagreGraph.setGraph({
    rankdir,
    ranksep,
    nodesep,
    edgesep,
    marginx,
    marginy,
  });

  // Add nodes to the graph
  nodes.forEach((node) => {
    // Get node dimensions based on type
    const { width, height } = getNodeDimensions(node.type);
    
    dagreGraph.setNode(node.id, {
      width,
      height,
      type: node.type,
      data: node.data,
    });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        // Dagre gives us the center position, but React Flow expects top-left
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Get node dimensions based on type - matching your existing NODE_DIMENSIONS
const getNodeDimensions = (nodeType: string) => {
  switch (nodeType) {
    case 'ageGroup':
      return { width: 280, height: 180 };
    case 'milestone':
      return { width: 240, height: 160 };
    case 'conception':
      return { width: 200, height: 120 };
    case 'achievement':
      return { width: 220, height: 140 };
    case 'step':
      return { width: 180, height: 100 };
    case 'category':
      return { width: 260, height: 140 };
    default:
      return { width: 200, height: 120 };
  }
};

// Enhanced layout with hierarchy-aware positioning
export const getHierarchicalLayout = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  // Group nodes by type and importance
  const nodesByType = nodes.reduce((acc, node) => {
    if (!acc[node.type]) acc[node.type] = [];
    acc[node.type].push(node);
    return acc;
  }, {} as Record<string, TimelineNode[]>);

  // Set custom ranks for different node types to control hierarchy
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const {
    rankdir = 'TB', // Force Y-axis (top to bottom) layout
    ranksep = 350,  // Increased vertical spacing for better hierarchy
    nodesep = 180,  // Increased horizontal spacing
    edgesep = 80,   // Increased edge separation
    marginx = 120,  // Increased margins
    marginy = 120,
  } = options;

  dagreGraph.setGraph({
    rankdir,
    ranksep,
    nodesep,
    edgesep,
    marginx,
    marginy,
  });

  // Add nodes with custom ranks for hierarchy
  nodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node.type);
    
    // Set rank based on node type and data to create hierarchy
    let rank = 0;
    
    if (node.type === 'conception') {
      rank = 0; // Top level
    } else if (node.type === 'ageGroup') {
      // Age groups ordered by months
      const months = node.data.months ? node.data.months[0] : 0;
      rank = Math.floor(months / 6) + 1; // Group by 6-month periods
    } else if (node.type === 'milestone') {
      // Milestones ordered by age and importance
      const months = node.data.months ? node.data.months[0] : 0;
      const importanceWeight = getImportanceWeight(node.data.importance);
      rank = Math.floor(months / 3) + 10 + importanceWeight; // Start after age groups
    } else if (node.type === 'achievement') {
      rank = 100; // Lower priority
    } else if (node.type === 'step') {
      rank = 200; // Lowest priority
    }
    
    dagreGraph.setNode(node.id, {
      width,
      height,
      type: node.type,
      data: node.data,
      rank,
    });
  });

  // Add edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Helper function to get importance weight for ordering
const getImportanceWeight = (importance?: string): number => {
  switch (importance) {
    case 'critical':
      return 0;
    case 'high':
      return 1;
    case 'medium':
      return 2;
    case 'low':
      return 3;
    default:
      return 2;
  }
};

// Specialized layout for timeline view with vertical Y-axis positioning
export const getTimelineLayout = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  // For timeline view, we prioritize Y-axis (vertical) layout for chronological flow
  const timelineOptions = {
    ...options,
    rankdir: 'TB' as const, // Top to bottom for Y-axis chronological timeline
    ranksep: 400,           // Large vertical spacing for time progression
    nodesep: 120,           // Moderate horizontal spacing
    marginx: 150,           // Extra margins for better readability
    marginy: 150,
  };

  return getHierarchicalLayout(nodes, edges, timelineOptions);
};

// Utility function to ensure all nodes have consistent vertical handle positioning
export const addVerticalHandles = (nodes: TimelineNode[]): TimelineNode[] => {
  return nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      // Ensure all nodes use top and bottom handles for Y-axis flow
      handleConfig: {
        sourcePosition: 'bottom',
        targetPosition: 'top',
        // Hide left/right handles to enforce vertical flow
        hideLeftHandle: true,
        hideRightHandle: true,
      }
    }
  }));
};

// Enhanced layout function that combines Dagre layout with vertical handle positioning
export const getVerticalTimelineLayout = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  // First, ensure all nodes have vertical handles
  const nodesWithVerticalHandles = addVerticalHandles(nodes);
  
  // Then apply the timeline layout
  const layoutResult = getTimelineLayout(nodesWithVerticalHandles, edges, options);
  
  return {
    ...layoutResult,
    nodes: layoutResult.nodes.map(node => ({
      ...node,
      // Ensure source and target positions are set for vertical flow
      sourcePosition: 'bottom' as const,
      targetPosition: 'top' as const,
    }))
  };
};
