import { NODE_DIMENSIONS, TIMELINE_LAYOUT } from '../constants';
import { LayoutParams, NodeDimensions, PositionCalculationResult } from '../types';

export const getNodeDimensions = (nodeType: string): NodeDimensions => {
  switch (nodeType) {
    case 'ageGroup':
      return NODE_DIMENSIONS.ageGroup;
    case 'category':
      return NODE_DIMENSIONS.category;
    case 'milestone':
      return NODE_DIMENSIONS.milestone;
    case 'conception':
      return NODE_DIMENSIONS.conception;
    case 'achievement':
      return NODE_DIMENSIONS.achievement;
    case 'step':
      return NODE_DIMENSIONS.step;
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
      verticalSpacing: 500,  // Increased for better age alignment
      horizontalSpacing: 600,
      padding: 120,
    };
  } else if (zoomLevel === 1) {
    return {
      centerX: FIXED_CENTER_X,
      verticalSpacing: 400,  // Increased for better age alignment
      horizontalSpacing: 500,
      padding: 100,
    };
  } else {
    return {
      centerX: FIXED_CENTER_X,
      verticalSpacing: 320,  // Increased for better age alignment
      horizontalSpacing: 400,
      padding: 80,
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

  const nodeSize = {
    width: nodeWidths.get(nodeId) || 200,
    height: nodeHeights.get(nodeId) || 120,
  };

  // Check for collisions with existing positioned nodes
  for (const [existingId, existingPos] of positions.entries()) {
    if (existingId === nodeId) continue;

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

  // Position milestones aligned to age range positions from the ruler
  if (nodesByType.milestone) {
    // Define the age range positions (matching the ruler) with wider spacing
    const ageRangePositions = new Map([
      ['prenatal_early', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (0 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [-12, -6] }],
      ['prenatal_late', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (1 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [-6, 0] }],
      ['infancy_0_6', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (2 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [0, 6] }],
      ['infancy_6_12', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (3 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [6, 12] }],
      ['early_childhood_12_18', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (4 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [12, 18] }],
      ['early_childhood_18_24', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (5 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [18, 24] }],
      ['early_childhood_24_30', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (6 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [24, 30] }],
      ['early_childhood_30_36', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (7 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [30, 36] }],
      ['preschool_36_48', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (8 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [36, 48] }],
      ['preschool_48_60', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (9 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [48, 60] }],
      ['school_age_60_72', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (10 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [60, 72] }],
      ['school_age_72_84', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (11 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [72, 84] }],
      ['school_age_84_96', { y: TIMELINE_LAYOUT.BASE_Y_OFFSET + (12 * TIMELINE_LAYOUT.AGE_BAND_SPACING), months: [84, 96] }],
    ]);

    // Group milestones by age range
    const milestonesByAgeRange = new Map<string, any[]>();
    
    nodesByType.milestone.forEach((milestone) => {
      const ageRangeKey = milestone.data?.milestone?.ageRangeKey || 'infancy_0_6'; // Default fallback
      if (!milestonesByAgeRange.has(ageRangeKey)) {
        milestonesByAgeRange.set(ageRangeKey, []);
      }
      milestonesByAgeRange.get(ageRangeKey)!.push(milestone);
    });

    // Position milestones horizontally at their age range's Y position
    milestonesByAgeRange.forEach((milestones, ageRangeKey) => {
      const ageRangeInfo = ageRangePositions.get(ageRangeKey);
      if (!ageRangeInfo) return;

      const baseY = ageRangeInfo.y; // Fixed Y position from ruler
      const cardWidth = 320;
      const horizontalSpacing = 50;
      const startX = centerX - ((milestones.length * cardWidth + (milestones.length - 1) * horizontalSpacing) / 2);

      milestones.forEach((milestone, index) => {
        const x = startX + (index * (cardWidth + horizontalSpacing));
        
        // Position milestone at the exact Y coordinate of its age range
        positions.set(milestone.id, {
          x,
          y: baseY, // Lock to age range Y position
        });
      });
    });
  }

  // Position conception node at the very top center
  if (nodesByType.conception) {
    nodesByType.conception.forEach((node) => {
      const nodeWidth = nodeWidths.get(node.id) || 200;
      positions.set(node.id, {
        x: centerX - nodeWidth / 2,
        y: padding - 150, // Above everything else
      });
    });
  }

  // Position achievement nodes in between milestones and age groups
  if (nodesByType.achievement) {
    nodesByType.achievement.forEach((achievement, index) => {
      // Position achievements closer to the center, between milestones and age groups
      const baseX = centerX + (index % 2 === 0 ? -350 : 350); // Alternate left and right
      const baseY = padding + 200 + (index * 180); // Spread vertically
      
      const finalPos = findNonCollidingPosition(
        { x: baseX, y: baseY },
        achievement.id,
        positions,
        nodeWidths,
        nodeHeights
      );
      
      positions.set(achievement.id, finalPos);
    });
  }

  // Position step nodes around their achievements
  if (nodesByType.step) {
    nodesByType.step.forEach((step, index) => {
      // Find the related achievement
      const achievementId = `achievement-${step.data.achievementId}`;
      const achievementPos = positions.get(achievementId);
      
      if (achievementPos) {
        // Position steps in a grid around the achievement
        const stepsPerRow = 3;
        const stepRow = Math.floor(index / stepsPerRow);
        const stepCol = index % stepsPerRow;
        
        const baseX = achievementPos.x + (stepCol - 1) * 200; // Spread horizontally
        const baseY = achievementPos.y + 180 + (stepRow * 120); // Below achievement
        
        const finalPos = findNonCollidingPosition(
          { x: baseX, y: baseY },
          step.id,
          positions,
          nodeWidths,
          nodeHeights
        );
        
        positions.set(step.id, finalPos);
      } else {
        // Fallback positioning if achievement not found
        const fallbackPos = {
          x: centerX + (index % 2 === 0 ? -600 : 600),
          y: padding + 400 + (index * 100),
        };
        positions.set(step.id, fallbackPos);
      }
    });
  }

  return { positions, nodeWidths, nodeHeights };
};
