import { NODE_DIMENSIONS } from '../constants';
import { LayoutParams, NodeDimensions, PositionCalculationResult } from '../types';

export const getNodeDimensions = (nodeType: string): NodeDimensions => {
  switch (nodeType) {
    case 'ageGroup':
      return NODE_DIMENSIONS.ageGroup;
    case 'category':
      return NODE_DIMENSIONS.category;
    case 'milestone':
      return NODE_DIMENSIONS.milestone;
    default:
      return NODE_DIMENSIONS.default;
  }
};

export const getLayoutParams = (
  zoomLevel: number,
  canvasWidth?: number
): LayoutParams => {
  // Use half of ReactFlow canvas width to properly center nodes on the viewport
  const FIXED_CENTER_X = canvasWidth ? canvasWidth * 2 : 800;
  console.log('Canvas width:', canvasWidth, 'Center X:', FIXED_CENTER_X);

  if (zoomLevel === 0) {
    return {
      centerX: FIXED_CENTER_X,
      verticalSpacing: 350,
      horizontalSpacing: 500,
      padding: 100,
    };
  } else if (zoomLevel === 1) {
    return {
      centerX: FIXED_CENTER_X,
      verticalSpacing: 280,
      horizontalSpacing: 400,
      padding: 80,
    };
  } else {
    return {
      centerX: FIXED_CENTER_X,
      verticalSpacing: 220,
      horizontalSpacing: 320,
      padding: 60,
    };
  }
};

export const checkCollision = (
  pos1: { x: number; y: number },
  size1: NodeDimensions,
  pos2: { x: number; y: number },
  size2: NodeDimensions,
  buffer: number = 20
): boolean => {
  const expandedSize1 = {
    width: size1.width + buffer * 2,
    height: size1.height + buffer * 2,
  };
  const expandedSize2 = {
    width: size2.width + buffer * 2,
    height: size2.height + buffer * 2,
  };

  return !(
    pos1.x + expandedSize1.width / 2 < pos2.x - expandedSize2.width / 2 ||
    pos2.x + expandedSize2.width / 2 < pos1.x - expandedSize1.width / 2 ||
    pos1.y + expandedSize1.height / 2 < pos2.y - expandedSize2.height / 2 ||
    pos2.y + expandedSize2.height / 2 < pos1.y - expandedSize1.height / 2
  );
};

export const findNonCollidingPosition = (
  startPos: { x: number; y: number },
  nodeId: string,
  positions: Map<string, { x: number; y: number }>,
  nodeWidths: Map<string, number>,
  nodeHeights: Map<string, number>,
  attempts = 0
): { x: number; y: number } => {
  if (attempts > 100) return startPos;

  // Age groups are locked in center and should not be moved by collision detection
  if (nodeId.includes('ageGroup')) {
    return startPos;
  }

  const nodeSize = {
    width: nodeWidths.get(nodeId) || 200,
    height: nodeHeights.get(nodeId) || 120,
  };

  // Check for collisions with existing positioned nodes
  for (const [existingId, existingPos] of positions.entries()) {
    if (existingId === nodeId) continue;

    // Skip collision with age groups since they are locked in center
    if (existingId.includes('ageGroup')) continue;

    const existingSize = {
      width: nodeWidths.get(existingId) || 200,
      height: nodeHeights.get(existingId) || 120,
    };

    if (checkCollision(startPos, nodeSize, existingPos, existingSize, 30)) {
      // Enhanced collision resolution with smarter positioning
      const isImportantMilestone = nodeId.includes('critical') || nodeId.includes('high');
      const adjustmentMultiplier = isImportantMilestone ? 1.2 : 1.0;

      // Try multiple positioning strategies with deterministic offsets
      const strategies = [
        // Strategy 1: Offset vertically
        {
          x: startPos.x,
          y: startPos.y + (60 + attempts * 30) * adjustmentMultiplier,
        },
        // Strategy 2: Offset horizontally (but keep within bounds)
        {
          x:
            startPos.x +
            (attempts % 2 === 0 ? 1 : -1) * (50 + attempts * 25) * adjustmentMultiplier,
          y: startPos.y + (30 + attempts * 15) * adjustmentMultiplier,
        },
        // Strategy 3: Spiral outward
        {
          x: startPos.x + Math.cos(attempts * 0.5) * (100 + attempts * 20),
          y: startPos.y + Math.sin(attempts * 0.5) * (100 + attempts * 20),
        },
      ];

      const strategyIndex = attempts % strategies.length;
      return findNonCollidingPosition(
        strategies[strategyIndex],
        nodeId,
        positions,
        nodeWidths,
        nodeHeights,
        attempts + 1
      );
    }
  }

  return startPos;
};

export const calculateNodePositions = (
  nodeData: any[],
  edgeData: any[],
  zoomLevel: number,
  focusArea?: string,
  canvasWidth?: number
): PositionCalculationResult => {
  const positions = new Map<string, { x: number; y: number }>();
  const nodeWidths = new Map<string, number>();
  const nodeHeights = new Map<string, number>();

  // Store dimensions
  nodeData.forEach((node) => {
    const dims = getNodeDimensions(node.type);
    nodeWidths.set(node.id, dims.width);
    nodeHeights.set(node.id, dims.height);
  });

  const { centerX, verticalSpacing, horizontalSpacing, padding } = getLayoutParams(
    zoomLevel,
    canvasWidth
  );

  // Group nodes by type
  const nodesByType = nodeData.reduce((acc, node) => {
    if (!acc[node.type]) acc[node.type] = [];
    acc[node.type].push(node);
    return acc;
  }, {} as Record<string, any[]>);

  // Position age groups vertically down the center - LOCKED to prevent horizontal movement
  if (nodesByType.ageGroup) {
    nodesByType.ageGroup.forEach((node, index) => {
      const nodeWidth = nodeWidths.get(node.id) || 400;
      const fixedCenterPos = {
        x: centerX - nodeWidth / 2,
        y: padding + index * (verticalSpacing + 100),
      };
      positions.set(node.id, fixedCenterPos);
    });
  }

  // Position milestones directly around age groups in a radial pattern
  if (nodesByType.milestone) {
    const ageGroups = nodesByType.ageGroup || [];

    ageGroups.forEach((ageGroup) => {
      const ageGroupPos = positions.get(ageGroup.id);
      if (!ageGroupPos) return;

      // Get milestones for this age group
      const ageGroupMilestones = nodesByType.milestone.filter((m) =>
        edgeData.some((edge) => edge.source === ageGroup.id && edge.target === m.id)
      );

      ageGroupMilestones.forEach((milestone, mIndex) => {
        // Create a radial pattern around the age group
        const totalMilestones = ageGroupMilestones.length;
        const angle = (mIndex / totalMilestones) * Math.PI * 2;
        const radius = 300 + (mIndex % 3) * 100;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;

        const initialPos = {
          x: ageGroupPos.x + offsetX,
          y: ageGroupPos.y + offsetY,
        };

        // Apply positioning with constraints
        const finalPos = findNonCollidingPosition(
          initialPos,
          milestone.id,
          positions,
          nodeWidths,
          nodeHeights
        );

        // Constrain milestone positions to stay within reasonable horizontal bounds
        const maxHorizontalDistance = canvasWidth ? canvasWidth * 2 : 1600;
        const constrainedX = Math.max(
          -maxHorizontalDistance,
          Math.min(maxHorizontalDistance, finalPos.x)
        );

        positions.set(milestone.id, {
          x: constrainedX,
          y: finalPos.y,
        });
      });
    });
  }

  return { positions, nodeWidths, nodeHeights };
};
