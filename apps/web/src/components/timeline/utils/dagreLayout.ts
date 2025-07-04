import dagre from 'dagre';
import { TimelineEdge, TimelineNode } from '../types';

export interface DagreLayoutOptions {
  rankdir?: 'TB' | 'BT' | 'LR' | 'RL';
  ranksep?: number;
  nodesep?: number;
  edgesep?: number;
  marginx?: number;
  marginy?: number;
  align?: 'UL' | 'UR' | 'DL' | 'DR';
  acyclicer?: 'greedy' | undefined;
  ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
}

export const getLayoutedElements = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  const {
    rankdir = 'TB', // Force Y-axis (top to bottom) layout
    ranksep = 400,  // Increased vertical spacing to reduce edge crossings
    nodesep = 200,  // Increased horizontal spacing for better node separation
    edgesep = 120,  // Significantly increased edge separation to prevent overlaps
    marginx = 150,  // Increased margins for better overall layout
    marginy = 150,
  } = options;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure the graph layout with improved edge routing
  dagreGraph.setGraph({
    rankdir,
    ranksep,
    nodesep,
    edgesep,
    marginx,
    marginy,
    // Add these properties for smoother layout
    // align: removed to use default center alignment
    acyclicer: 'greedy', // Better cycle removal algorithm
    ranker: 'tight-tree', // Tighter tree ranking for better hierarchical layout
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

  // Add edges to the graph with improved routing
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      // Add edge properties for smoother routing
      minlen: 1,           // Minimum edge length
      weight: 1,           // Default weight
      labelpos: 'c',       // Center label position
      labeloffset: 10,     // Label offset from edge
    });
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

  return { 
    nodes: layoutedNodes, 
    edges: applyEdgeStyling(edges)
  };
};

// Get node dimensions based on type - matching your existing NODE_DIMENSIONS
const getNodeDimensions = (nodeType: string) => {
  switch (nodeType) {
    case 'ageGroup':
      return { width: 280, height: 180 };
    case 'milestone':
      return { width: 240, height: 160 };
    case 'keyMilestone':
      return { width: 280, height: 200 }; // Larger for key milestones
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
    ranksep = 450,  // Increased vertical spacing for better hierarchy
    nodesep = 220,  // Increased horizontal spacing to reduce crowding
    edgesep = 140,  // Increased edge separation to prevent overlaps
    marginx = 180,  // Increased margins for better overall spacing
    marginy = 180,
  } = options;

  dagreGraph.setGraph({
    rankdir,
    ranksep,
    nodesep,
    edgesep,
    marginx,
    marginy,
    // Enhanced settings for hierarchical layout
    // align: removed to use default center alignment
    acyclicer: 'greedy',  // Better cycle removal
    ranker: 'network-simplex', // More sophisticated ranking algorithm
  });

  // Add nodes with custom ranks for hierarchy
  nodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node.type);
    
    // Set rank based on node type and data to create hierarchy
    let rank = 0;
    
    if (node.type === 'keyMilestone') {
      // Key milestones (conception, graduation, first child) get priority
      const months = node.data.months ? node.data.months[0] : 0;
      rank = Math.floor(months / 12) + 1; // Group by year
    } else if (node.type === 'ageGroup') {
      // Age groups ordered by months
      const months = node.data.months ? node.data.months[0] : 0;
      rank = Math.floor(months / 6) + 10; // Group by 6-month periods, start after key milestones
    } else if (node.type === 'milestone') {
      // Milestones ordered by age and importance
      const months = node.data.months ? node.data.months[0] : 0;
      const importanceWeight = getImportanceWeight(node.data.importance);
      rank = Math.floor(months / 3) + 20 + importanceWeight; // Start after age groups
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
    dagreGraph.setEdge(edge.source, edge.target, {
      minlen: 1,
      weight: 1,
      labelpos: 'c',
      labeloffset: 10,
    });
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

  return { 
    nodes: layoutedNodes, 
    edges: applyEdgeStyling(edges)
  };
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
    ranksep: 500,           // Large vertical spacing for time progression
    nodesep: 180,           // Moderate horizontal spacing
    edgesep: 160,           // Increased edge separation for cleaner timeline
    marginx: 200,           // Extra margins for better readability
    marginy: 200,
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

// Advanced layout with edge optimization to minimize overlaps
export const getOptimizedLayout = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  // Pre-process edges to reduce complexity
  const optimizedEdges = optimizeEdgeRouting(edges, nodes);
  
  const {
    rankdir = 'TB',
    ranksep = 500,  // Generous vertical spacing
    nodesep = 250,  // Generous horizontal spacing
    edgesep = 180,  // Maximum edge separation
    marginx = 250,  // Large margins
    marginy = 250,
  } = options;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Enhanced graph configuration for minimal edge crossings
  dagreGraph.setGraph({
    rankdir,
    ranksep,
    nodesep,
    edgesep,
    marginx,
    marginy,
    // Advanced Dagre options for better edge routing
    // align: removed to use default center alignment
    acyclicer: 'greedy',      // Greedy cycle removal
    ranker: 'network-simplex', // Network simplex ranking
  });

  // Add nodes with enhanced spacing calculations
  nodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node.type);
    
    // Add padding to node dimensions to create natural spacing
    const paddedWidth = width + 40;
    const paddedHeight = height + 20;
    
    dagreGraph.setNode(node.id, {
      width: paddedWidth,
      height: paddedHeight,
      type: node.type,
      data: node.data,
    });
  });

  // Add optimized edges with weight-based routing
  optimizedEdges.forEach((edge) => {
    const edgeWeight = calculateEdgeWeight(edge, nodes);
    dagreGraph.setEdge(edge.source, edge.target, {
      minlen: 1,
      weight: edgeWeight,
      labelpos: 'c',
      labeloffset: 15,
    });
  });

  // Run layout
  dagre.layout(dagreGraph);

  // Apply positions with additional smoothing
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const { width, height } = getNodeDimensions(node.type);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  return { 
    nodes: layoutedNodes, 
    edges: applyEdgeStyling(optimizedEdges)
  };
};

// Helper function to optimize edge routing
const optimizeEdgeRouting = (edges: TimelineEdge[], nodes: TimelineNode[]): TimelineEdge[] => {
  // Create a map of node positions for distance calculations
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  
  // Sort edges by importance/weight to prioritize important connections
  return edges.sort((a, b) => {
    const sourceA = nodeMap.get(a.source);
    const sourceB = nodeMap.get(b.source);
    const targetA = nodeMap.get(a.target);
    const targetB = nodeMap.get(b.target);
    
    // Prioritize edges between nodes of higher importance
    const importanceA = getNodeImportance(sourceA) + getNodeImportance(targetA);
    const importanceB = getNodeImportance(sourceB) + getNodeImportance(targetB);
    
    return importanceB - importanceA;
  });
};

// Helper function to calculate edge weight based on node importance
const calculateEdgeWeight = (edge: TimelineEdge, nodes: TimelineNode[]): number => {
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);
  
  if (!sourceNode || !targetNode) return 1;
  
  // Higher weight for edges between important nodes
  const sourceImportance = getNodeImportance(sourceNode);
  const targetImportance = getNodeImportance(targetNode);
  
  return Math.max(1, (sourceImportance + targetImportance) / 2);
};

// Helper function to get node importance for layout prioritization
const getNodeImportance = (node?: TimelineNode): number => {
  if (!node) return 1;
  
  switch (node.type) {
    case 'keyMilestone':
      return 10;
    case 'ageGroup':
      return 8;
    case 'milestone':
      return 6;
    case 'achievement':
      return 4;
    case 'step':
      return 2;
    default:
      return 1;
  }
};

// Optimized timeline layout with edge bundling for cleaner visualization
export const getCleanTimelineLayout = (
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  options: DagreLayoutOptions = {}
) => {
  // Use the optimized layout as base
  const baseLayout = getOptimizedLayout(nodes, edges, {
    ...options,
    // Timeline-specific optimizations
    rankdir: 'TB',
    ranksep: 600,   // Very generous vertical spacing for timeline
    nodesep: 300,   // Wide horizontal spacing
    edgesep: 200,   // Maximum edge separation
    marginx: 300,   // Large margins
    marginy: 300,
  });

  // Post-process to add vertical handles for timeline flow
  const timelineNodes = addVerticalHandles(baseLayout.nodes);

  return {
    nodes: timelineNodes.map(node => ({
      ...node,
      sourcePosition: 'bottom' as const,
      targetPosition: 'top' as const,
    })),
    edges: applyEdgeStyling(baseLayout.edges)
  };
};

// Utility function to apply consistent edge styling
const applyEdgeStyling = (edges: TimelineEdge[]): TimelineEdge[] => {
  return edges.map(edge => ({
    ...edge,
    type: 'smoothstep', // Use smooth curved edges (alternatives: 'default', 'straight', 'step', 'bezier')
    style: {
      stroke: '#374151', // Solid gray color
      strokeWidth: 2,
      strokeDasharray: 'none', // Solid line, no dashes
      ...edge.style, // Preserve any existing edge-specific styles
    }
  }));
};
