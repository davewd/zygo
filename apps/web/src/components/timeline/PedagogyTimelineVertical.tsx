import {
  Background,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@zygo/ui';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Focus,
  Trophy,
  Users,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  generateAgeRanges,
  loadMilestonesFromCSV,
  type AgeRange,
  type MilestoneData,
} from '../../lib/api/milestones';

// Temporary wrapper to fix TypeScript issues
const SafeButton = Button as any;

// For now, define types locally until the @zygo/types package is properly exported
interface PedagogyProfile {
  id: string;
  familyId: string;
  name: string;
  description: string;
  familyMembers: any[];
  milestones: any[];
  milestoneProgress: any[];
  customizations: any;
  createdDate: string;
  modifiedDate: string;
}

type DevelopmentCategory =
  | 'physical'
  | 'cognitive'
  | 'social_emotional'
  | 'language'
  | 'motor_skills'
  | 'sensory'
  | 'self_care'
  | 'academic';
type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'deferred' | 'not_applicable';

interface TimelineNode {
  id: string;
  type: 'milestone' | 'category' | 'ageGroup';
  data: any;
  position: { x: number; y: number };
  style?: Record<string, any>;
  draggable?: boolean;
}

interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  style?: Record<string, any>;
  label?: string;
  markerEnd?: {
    type: any;
    color?: string;
  };
}

interface TimelineZoomLevel {
  level: number;
  name: string;
  description: string;
  nodeTypes: ('milestone' | 'category' | 'ageGroup')[];
  timeSpan: {
    minAgeMonths: number;
    maxAgeMonths: number;
  };
}

const DEVELOPMENT_CATEGORIES: DevelopmentCategory[] = [
  'physical',
  'cognitive',
  'social_emotional',
  'language',
  'motor_skills',
  'sensory',
  'self_care',
  'academic',
];

// Custom Node Components
const MilestoneNode = ({ data }: { data: any }) => {
  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'not_started':
        return <Circle className="w-4 h-4 text-gray-400" />;
      case 'deferred':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: DevelopmentCategory) => {
    const colors = {
      physical: 'bg-red-100 border-red-300 text-red-800',
      cognitive: 'bg-blue-100 border-blue-300 text-blue-800',
      social_emotional: 'bg-green-100 border-green-300 text-green-800',
      language: 'bg-purple-100 border-purple-300 text-purple-800',
      motor_skills: 'bg-orange-100 border-orange-300 text-orange-800',
      sensory: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      self_care: 'bg-pink-100 border-pink-300 text-pink-800',
      academic: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const milestone = data.milestone;
  const progress = data.progress?.[0]; // Get first family member's progress
  const completion = data.completionPercentage || 0;

  return (
    <div
      className={`p-4 rounded-lg border-2 shadow-md min-w-64 max-w-80 ${getCategoryColor(
        milestone?.category
      )}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon(progress?.status || 'not_started')}
          <h3 className="font-semibold text-sm">{data.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Trophy className="w-3 h-3" />
          <span className="text-xs">{milestone?.priority}</span>
        </div>
      </div>

      {data.description && <p className="text-xs mb-3 line-clamp-2">{data.description}</p>}

      {milestone?.ageRange && (
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-3 h-3" />
          <span className="text-xs">{milestone.ageRange.replace('_', ' ')}</span>
        </div>
      )}

      {data.familyMembers && data.familyMembers.length > 0 && (
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-3 h-3" />
          <div className="flex -space-x-1">
            {data.familyMembers.slice(0, 3).map((member: any, index: number) => (
              <div
                key={member.id}
                className="w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-medium"
                title={member.name}
              >
                {member.name.charAt(0)}
              </div>
            ))}
            {data.familyMembers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs">
                +{data.familyMembers.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {completion > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div
              className="bg-current h-2 rounded-full transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryNode = ({ data }: { data: any }) => {
  const getCategoryColor = (category: DevelopmentCategory) => {
    const colors = {
      physical: 'bg-red-50 border-red-200 text-red-800',
      cognitive: 'bg-blue-50 border-blue-200 text-blue-800',
      social_emotional: 'bg-green-50 border-green-200 text-green-800',
      language: 'bg-purple-50 border-purple-200 text-purple-800',
      motor_skills: 'bg-orange-50 border-orange-200 text-orange-800',
      sensory: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      self_care: 'bg-pink-50 border-pink-200 text-pink-800',
      academic: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    };
    return colors[category] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div
      className={`p-6 rounded-xl border-2 shadow-lg min-w-80 ${getCategoryColor(data.category)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">{data.title}</h2>
        <button className="p-1">
          {data.isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {data.description && <p className="text-sm mb-4">{data.description}</p>}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Progress:</span>
          <div className="mt-1">
            <div className="w-full bg-white rounded-full h-3">
              <div
                className="bg-current h-3 rounded-full transition-all duration-300"
                style={{ width: `${data.completionPercentage || 0}%` }}
              />
            </div>
          </div>
        </div>
        <div>
          <span className="font-medium">Milestones:</span>
          <div className="mt-1 text-lg font-bold">{data.milestoneCount || 0}</div>
        </div>
      </div>
    </div>
  );
};

const AgeGroupNode = ({ data }: { data: any }) => {
  return (
    <div
      className="p-6 rounded-xl border-2 border-gray-300 bg-gray-50 shadow-lg min-w-96 max-w-96 transform-gpu pointer-events-auto"
      style={{
        zIndex: 10, // Keep age groups above other elements
        cursor: 'default', // Indicate non-draggable
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
        <Calendar className="w-6 h-6 text-gray-600" />
      </div>

      {data.description && <p className="text-gray-600 mb-4">{data.description}</p>}

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{data.totalMilestones || 0}</div>
          <div className="text-gray-600">Total Milestones</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{data.completedMilestones || 0}</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{data.inProgressMilestones || 0}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  milestone: MilestoneNode,
  category: CategoryNode,
  ageGroup: AgeGroupNode,
};

interface TimelinePedagogyProps {
  pedagogyData?: PedagogyProfile;
  onNodeClick?: (nodeId: string, nodeData: any) => void;
}

const VerticalTimeLine: React.FC<TimelinePedagogyProps> = ({ pedagogyData, onNodeClick }) => {
  // State for CSV-based milestones
  const [csvMilestones, setCsvMilestones] = useState<MilestoneData[]>([]);
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(true);
  const [milestonesError, setMilestonesError] = useState<string | null>(null);

  // Load milestone data from CSV on component mount
  useEffect(() => {
    const loadMilestoneData = async () => {
      try {
        setMilestonesLoading(true);
        setMilestonesError(null);

        // Load milestones from CSV and age ranges
        const [milestones, ranges] = await Promise.all([
          loadMilestonesFromCSV(),
          Promise.resolve(generateAgeRanges()),
        ]);

        setCsvMilestones(milestones);
        setAgeRanges(ranges);
      } catch (error) {
        console.error('Error loading milestone data:', error);
        setMilestonesError(
          error instanceof Error ? error.message : 'Failed to load milestone data'
        );

        // Use fallback age ranges if CSV fails
        setAgeRanges(generateAgeRanges());
      } finally {
        setMilestonesLoading(false);
      }
    };

    loadMilestoneData();
  }, []);

  // Comprehensive milestone generation for every 6-month period
  const generateComprehensiveMilestones = () => {
    const milestones = [];
    const ageRanges = generateAgeRanges();

    // Milestone templates by category and age range (fallback only)
    const milestoneTemplates = {
      // Prenatal milestones
      prenatal: {
        physical: [
          'Neural tube formation',
          'Heart development begins',
          'Limb bud formation',
          'Organ system development',
          'Fetal movement begins',
          'Rapid brain growth',
        ],
        cognitive: [
          'Basic neural connections',
          'Sensory system development',
          'Early brain wave activity',
          'Memory pathway formation',
          'Sleep-wake cycles develop',
          'Response to external stimuli',
        ],
        social_emotional: [
          'Maternal bonding begins',
          'Stress response system',
          'Emotional regulation foundation',
          'Attachment preparation',
          'Recognition of maternal voice',
          'Emotional circuitry development',
        ],
        language: [
          'Auditory system formation',
          'Sound processing development',
          'Vocal cord formation',
          'Language area brain development',
          'Maternal voice recognition',
          'Sound discrimination ability',
        ],
      },
      // Infancy milestones (0-24 months)
      infancy: {
        physical: [
          'Head control',
          'Rolling over',
          'Sitting without support',
          'Crawling/creeping',
          'Standing with support',
          'Walking independently',
          'Running and jumping',
          'Climbing up stairs',
        ],
        cognitive: [
          'Tracking objects with eyes',
          'Object permanence',
          'Cause and effect understanding',
          'Simple problem solving',
          'Imitation of actions',
          'Symbolic thinking begins',
          'Memory development',
          'Attention span increases',
        ],
        social_emotional: [
          'Social smiling',
          'Stranger anxiety',
          'Separation anxiety',
          'Attachment formation',
          'Emotional expression',
          'Empathy development',
          'Self-awareness begins',
          'Peer interest',
        ],
        language: [
          'Cooing and babbling',
          'First words',
          'Vocabulary growth',
          'Two-word combinations',
          'Understanding simple commands',
          'Gesture communication',
          'Story comprehension',
          'Question asking begins',
        ],
      },
      // Early childhood milestones (2-5 years)
      earlyChildhood: {
        physical: [
          'Pedaling tricycle',
          'Throwing and catching',
          'Balance beam walking',
          'Fine motor precision',
          'Drawing shapes',
          'Cutting with scissors',
          'Dressing independently',
          'Coordinated movements',
        ],
        cognitive: [
          'Pretend play',
          'Classification skills',
          'Number recognition',
          'Letter recognition',
          'Problem-solving strategies',
          'Memory games',
          'Logical thinking',
          'Abstract concepts',
        ],
        social_emotional: [
          'Parallel play',
          'Cooperative play',
          'Emotional regulation',
          'Friendship formation',
          'Rule following',
          'Conflict resolution',
          'Self-control',
          'Emotional intelligence',
        ],
        language: [
          'Complex sentences',
          'Story telling',
          'Conversation skills',
          'Reading readiness',
          'Phonemic awareness',
          'Vocabulary expansion',
          'Grammar mastery',
          'Narrative skills',
        ],
      },
      // School age milestones (5-12 years)
      schoolAge: {
        physical: [
          'Sports participation',
          'Complex motor skills',
          'Physical endurance',
          'Coordination mastery',
          'Team sports',
          'Fine motor precision',
          'Physical fitness',
          'Body awareness',
        ],
        cognitive: [
          'Academic skills',
          'Critical thinking',
          'Study strategies',
          'Mathematical reasoning',
          'Scientific thinking',
          'Research skills',
          'Complex problem solving',
          'Abstract reasoning',
        ],
        social_emotional: [
          'Peer relationships',
          'Group dynamics',
          'Leadership skills',
          'Moral reasoning',
          'Self-concept',
          'Achievement motivation',
          'Social skills',
          'Emotional maturity',
        ],
        language: [
          'Advanced vocabulary',
          'Writing skills',
          'Reading fluency',
          'Communication skills',
          'Language arts',
          'Multiple languages',
          'Public speaking',
          'Literary appreciation',
        ],
      },
      // Adolescence milestones (12-18 years)
      adolescence: {
        physical: [
          'Puberty completion',
          'Adult body proportions',
          'Physical maturity',
          'Athletic peak',
          'Body image acceptance',
          'Health awareness',
          'Physical independence',
          'Adult coordination',
        ],
        cognitive: [
          'Abstract thinking',
          'Future planning',
          'Identity formation',
          'Career exploration',
          'Independent learning',
          'Complex reasoning',
          'Decision making',
          'Life skills mastery',
        ],
        social_emotional: [
          'Identity development',
          'Intimate relationships',
          'Value system',
          'Independence',
          'Social responsibility',
          'Emotional maturity',
          'Peer influence balance',
          'Adult relationships',
        ],
        language: [
          'Advanced communication',
          'Professional language',
          'Academic writing',
          'Debate skills',
          'Multiple registers',
          'Cultural communication',
          'Technology communication',
          'Lifelong learning',
        ],
      },
    };

    // Generate milestones for each age range and category
    ageRanges.forEach((ageRange, rangeIndex) => {
      const { months, key } = ageRange;
      const [startMonth, endMonth] = months;

      // Determine age period
      let period = 'infancy';
      if (startMonth < 0) period = 'prenatal';
      else if (startMonth >= 24 && startMonth < 60) period = 'earlyChildhood';
      else if (startMonth >= 60 && startMonth < 144) period = 'schoolAge';
      else if (startMonth >= 144) period = 'adolescence';

      // Generate milestones for each category
      DEVELOPMENT_CATEGORIES.forEach((category) => {
        const templates = milestoneTemplates[period]?.[category] || [];
        const milestoneIndex = rangeIndex % templates.length;

        if (templates[milestoneIndex]) {
          milestones.push({
            id: `milestone-${key}-${category}-${milestoneIndex}`,
            title: templates[milestoneIndex],
            description: `${templates[milestoneIndex]} development milestone for ${ageRange.range}`,
            category: category,
            ageRange: ageRange.range,
            ageRangeKey: key,
            months: months,
            period: period,
            isTypical: true,
            importance: 'high',
            createdDate: new Date().toISOString(),
            modifiedDate: new Date().toISOString(),
          });
        }
      });
    });

    return milestones;
  };

  // Enhanced zoom levels with comprehensive coverage (categories removed)
  const zoomLevels: TimelineZoomLevel[] = [
    {
      level: 0,
      name: 'Overview',
      description: 'Complete timeline overview from prenatal to 18 years',
      nodeTypes: ['ageGroup'],
      timeSpan: { minAgeMonths: -12, maxAgeMonths: 216 }, // -12 months to 18 years
    },
    {
      level: 1,
      name: 'Age Group Focus',
      description: 'Focused view on specific age groups and milestones',
      nodeTypes: ['ageGroup', 'milestone'],
      timeSpan: { minAgeMonths: -12, maxAgeMonths: 60 }, // Prenatal to 5 years focus
    },
    {
      level: 2,
      name: 'Milestone Deep Dive',
      description: 'Detailed view of individual milestones and progress',
      nodeTypes: ['milestone'],
      timeSpan: { minAgeMonths: -12, maxAgeMonths: 36 }, // Prenatal to 3 years focus
    },
  ];

  const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<DevelopmentCategory[]>([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState<string | null>(null);
  const [allAgeRanges] = useState(() => generateAgeRanges());
  const [comprehensiveMilestones] = useState(() => generateComprehensiveMilestones());
  const [canvasWidth, setCanvasWidth] = useState<number | undefined>(undefined);

  // Canvas width change handler
  const handleCanvasWidthChange = useCallback((width: number) => {
    setCanvasWidth(width);
  }, []);

  // Enhanced layout algorithm with collision detection and proper spacing
  const calculateNodePositions = useCallback(
    (
      nodeData: any[],
      edgeData: any[],
      zoomLevel: number,
      focusArea?: string,
      canvasWidth?: number
    ) => {
      const positions = new Map<string, { x: number; y: number }>();
      const nodeWidths = new Map<string, number>();
      const nodeHeights = new Map<string, number>();

      // Define node dimensions based on type - consistent sizes regardless of zoom level
      const getNodeDimensions = (nodeType: string) => {
        // Remove zoom-based scaling to keep cards same size during zoom
        switch (nodeType) {
          case 'ageGroup':
            return { width: 400, height: 200 };
          case 'category':
            return { width: 340, height: 180 };
          case 'milestone':
            return { width: 300, height: 160 };
          default:
            return { width: 200, height: 120 };
        }
      };

      // Store dimensions
      nodeData.forEach((node) => {
        const dims = getNodeDimensions(node.type);
        nodeWidths.set(node.id, dims.width);
        nodeHeights.set(node.id, dims.height);
      });

      // Dynamic spacing based on zoom level and focus area - FIXED CENTER
      const getLayoutParams = () => {
        // Use half of ReactFlow canvas width to properly center nodes on the viewport
        const FIXED_CENTER_X = canvasWidth ? canvasWidth * 2 : 800; // Default to 800 if canvas width is not available
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

      const { centerX, verticalSpacing, horizontalSpacing, padding } = getLayoutParams();

      // Group nodes by type and hierarchy
      const nodesByType = nodeData.reduce((acc, node) => {
        if (!acc[node.type]) acc[node.type] = [];
        acc[node.type].push(node);
        return acc;
      }, {} as Record<string, any[]>);

      // Enhanced collision detection helper with margin buffer
      const checkCollision = (
        pos1: { x: number; y: number },
        size1: { width: number; height: number },
        pos2: { x: number; y: number },
        size2: { width: number; height: number },
        buffer: number = 20 // Add margin between cards
      ) => {
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

      const findNonCollidingPosition = (
        startPos: { x: number; y: number },
        nodeId: string,
        attempts = 0
      ) => {
        if (attempts > 100) return startPos; // Increased max attempts for better positioning

        // Age groups are locked in center and should not be moved by collision detection
        if (nodeId.includes('ageGroup')) {
          return startPos;
        }

        const nodeSize = {
          width: nodeWidths.get(nodeId) || 200,
          height: nodeHeights.get(nodeId) || 120,
        };

        // Check for collisions with existing positioned nodes using enhanced collision detection
        for (const [existingId, existingPos] of positions.entries()) {
          if (existingId === nodeId) continue;

          // Skip collision with age groups since they are locked in center
          if (existingId.includes('ageGroup')) continue;

          const existingSize = {
            width: nodeWidths.get(existingId) || 200,
            height: nodeHeights.get(existingId) || 120,
          };

          if (checkCollision(startPos, nodeSize, existingPos, existingSize, 30)) {
            // Increased buffer for better spacing
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
              // Strategy 2: Offset horizontally (but keep within bounds) - deterministic based on attempts
              {
                x:
                  startPos.x +
                  (attempts % 2 === 0 ? 1 : -1) * (50 + attempts * 25) * adjustmentMultiplier,
                y: startPos.y + (30 + attempts * 15) * adjustmentMultiplier,
              },
              // Strategy 3: Spiral outward - deterministic spiral pattern
              {
                x: startPos.x + Math.cos(attempts * 0.5) * (100 + attempts * 20),
                y: startPos.y + Math.sin(attempts * 0.5) * (100 + attempts * 20),
              },
            ];

            const strategyIndex = attempts % strategies.length;
            return findNonCollidingPosition(strategies[strategyIndex], nodeId, attempts + 1);
          }
        }

        return startPos;
      };

      // Position age groups vertically down the center - LOCKED to prevent horizontal movement
      if (nodesByType.ageGroup) {
        nodesByType.ageGroup.forEach((node, index) => {
          const nodeWidth = nodeWidths.get(node.id) || 400; // Get the actual node width
          const fixedCenterPos = {
            x: centerX - nodeWidth / 2, // Offset by half width to center the node properly
            y: padding + index * (verticalSpacing + 100),
          };
          // Set position directly without collision detection to lock them in center
          positions.set(node.id, fixedCenterPos);
        });
      }

      // Position categories around age groups with improved category-specific branching
      // REMOVED: Category positioning logic since categories have been removed

      // Position milestones directly around age groups in a radial pattern
      if (nodesByType.milestone) {
        const ageGroups = nodesByType.ageGroup || [];

        ageGroups.forEach((ageGroup, ageIndex) => {
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
            const radius = 300 + (mIndex % 3) * 100; // Stagger milestones at different distances
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;

            const initialPos = {
              x: ageGroupPos.x + offsetX,
              y: ageGroupPos.y + offsetY,
            };

            // Apply positioning with constraints to keep milestones within reasonable bounds
            const finalPos = findNonCollidingPosition(initialPos, milestone.id);

            // Constrain milestone positions to stay within reasonable horizontal bounds
            const maxHorizontalDistance = canvasWidth * 2; // Maximum distance from center
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
    },
    []
  );

  // Enhanced nodes and edges generation with better layout and directional flow
  const { nodes, edges } = useMemo(() => {
    if (!pedagogyData) {
      // Enhanced demo nodes with better positioning (categories removed)
      const demoNodesData = [{ id: 'demo-overview', type: 'ageGroup' }];
      const demoEdgesData: any[] = [
        // No category edges since categories are removed
      ];

      const { positions } = calculateNodePositions(
        demoNodesData,
        demoEdgesData,
        currentZoomLevel,
        focusArea,
        canvasWidth
      );

      const demoNodes: TimelineNode[] = [
        {
          id: 'demo-overview',
          type: 'ageGroup',
          data: {
            title: 'Early Childhood (0-2 years)',
            description: 'Critical foundational period for development',
            totalMilestones: 25,
            completedMilestones: 8,
            inProgressMilestones: 5,
          },
          position: positions.get('demo-overview') || { x: 0, y: 100 }, // Fixed center position
          draggable: false, // Lock demo age group in center position
        },
      ];

      const demoEdges: TimelineEdge[] = [
        // No edges in demo since categories have been removed
      ];

      return { nodes: demoNodes, edges: demoEdges };
    }

    const currentLevel = zoomLevels[currentZoomLevel];
    const generatedNodes: TimelineNode[] = [];
    const generatedEdges: TimelineEdge[] = [];

    // Filter nodes based on zoom level and focus area
    const shouldIncludeNode = (nodeType: string, nodeData?: any) => {
      if (!currentLevel.nodeTypes.includes(nodeType as any)) return false;
      if (focusArea && nodeData && !nodeData.id?.includes(focusArea)) return false;
      return true;
    };

    // Generate age groups with enhanced data using comprehensive ranges
    if (shouldIncludeNode('ageGroup')) {
      // Use comprehensive age ranges instead of hardcoded ranges
      const ageGroups = allAgeRanges.slice(0, Math.min(12, allAgeRanges.length)); // Show first 12 ranges for better visualization

      ageGroups.forEach((ageGroup, index) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;
        const milestoneCountForRange = comprehensiveMilestones.filter(
          (m) => m.ageRangeKey === ageGroup.key
        ).length;

        generatedNodes.push({
          id: ageGroupId,
          type: 'ageGroup',
          data: {
            title: ageGroup.range,
            description: ageGroup.description,
            ageRange: ageGroup.range,
            totalMilestones: milestoneCountForRange,
            completedMilestones: Math.floor(milestoneCountForRange * 0.3),
            inProgressMilestones: Math.floor(milestoneCountForRange * 0.2),
            months: ageGroup.months,
            key: ageGroup.key,
          },
          position: { x: 0, y: 0 }, // Will be calculated
          draggable: false, // Lock age groups in center position
        });

        // Connect age groups with timeline flow
        if (index > 0) {
          generatedEdges.push({
            id: `timeline-flow-${index}`,
            source: `ageGroup-${ageGroups[index - 1].key}`,
            target: ageGroupId,
            type: 'smoothstep',
            style: {
              stroke: '#6b7280',
              strokeWidth: 4,
              strokeDasharray: '15,10',
            },
            label: 'Timeline Progression',
            markerEnd: { type: MarkerType.ArrowClosed, color: '#6b7280' },
          });
        }
      });
    }

    // Generate categories with better relationships using comprehensive ranges
    // REMOVED: Category generation has been disabled to simplify the timeline view

    // Generate milestones with direct connections to age groups (categories removed)
    if (shouldIncludeNode('milestone')) {
      const ageGroups = allAgeRanges.slice(0, Math.min(12, allAgeRanges.length)); // Match other generations
      const categoryColors = {
        physical: '#ef4444',
        cognitive: '#3b82f6',
        social_emotional: '#10b981',
        language: '#8b5cf6',
        motor_skills: '#f97316',
        sensory: '#eab308',
        self_care: '#ec4899',
        academic: '#6366f1',
      };

      ageGroups.forEach((ageGroup) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;

        DEVELOPMENT_CATEGORIES.forEach((category) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            return;
          }

          const categoryMilestones = comprehensiveMilestones.filter(
            (m) => m.ageRangeKey === ageGroup.key && m.category === category
          );

          if (categoryMilestones.length === 0) return;

          categoryMilestones.forEach((milestone, milestoneIndex) => {
            const milestoneId = `milestone-${milestone.id}`;

            // Create mock progress data based on pedagogy data if available
            const relevantProgress =
              pedagogyData?.milestoneProgress?.filter(
                (p: any) =>
                  p.milestoneId === milestone.id &&
                  (selectedFamilyMembers.length === 0 ||
                    selectedFamilyMembers.includes(p.familyMemberId))
              ) || [];

            const relevantFamilyMembers =
              pedagogyData?.familyMembers?.filter(
                (fm: any) =>
                  selectedFamilyMembers.length === 0 || selectedFamilyMembers.includes(fm.id)
              ) || [];

            // Calculate completion percentage
            const completionPercentage =
              relevantProgress.length > 0
                ? (relevantProgress.filter((p: any) => p.status === 'completed').length /
                    relevantProgress.length) *
                  100
                : Math.floor((milestoneIndex * 13 + category.length * 7) % 100); // Deterministic demo value based on milestone index and category

            generatedNodes.push({
              id: milestoneId,
              type: 'milestone',
              data: {
                title: milestone.title,
                description: milestone.description,
                milestone: milestone,
                progress: relevantProgress,
                familyMembers: relevantFamilyMembers,
                completionPercentage: completionPercentage,
                category: category,
                ageRange: milestone.ageRange,
                period: milestone.period,
                importance: milestone.importance,
                months: milestone.months,
              },
              position: { x: 0, y: 0 }, // Will be calculated
            });

            // Enhanced directional edges from age group directly to milestones (bypassing categories)
            generatedEdges.push({
              id: `age-to-milestone-${milestone.id}`,
              source: ageGroupId,
              target: milestoneId,
              type: 'smoothstep',
              style: {
                stroke: categoryColors[category] || '#6b7280',
                strokeWidth: 2,
                opacity: 0.7,
              },
              label: milestoneIndex === 0 ? 'Contains' : undefined,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: categoryColors[category] || '#6b7280',
              },
            });
          });
        });
      });
    }

    // Calculate positions with enhanced algorithm
    const { positions } = calculateNodePositions(
      generatedNodes,
      generatedEdges,
      currentZoomLevel,
      focusArea,
      canvasWidth
    );

    // Apply calculated positions
    generatedNodes.forEach((node) => {
      const pos = positions.get(node.id);
      if (pos) {
        node.position = pos;
      }
    });

    return { nodes: generatedNodes, edges: generatedEdges };
  }, [
    currentZoomLevel,
    selectedCategories,
    selectedFamilyMembers,
    pedagogyData,
    calculateNodePositions,
    focusArea,
    canvasWidth,
  ]);

  const [reactFlowNodes, setNodes, onNodesChangeInternal] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  // Custom nodes change handler to prevent horizontal movement and maintain collision-free positioning
  const onNodesChange = useCallback(
    (changes: any[]) => {
      // Filter out changes that would move nodes horizontally or cause collisions
      const filteredChanges = changes.filter((change) => {
        // Always block position changes for age groups
        if (change.type === 'position' && change.id?.includes('ageGroup')) {
          return false;
        }

        // For milestone nodes, prevent excessive horizontal movement
        if (change.type === 'position' && change.position) {
          const node = reactFlowNodes.find((n) => n.id === change.id);
          if (node && change.position.x !== undefined) {
            const maxHorizontalDistance = 600;
            const constrainedX = Math.max(
              -maxHorizontalDistance,
              Math.min(maxHorizontalDistance, change.position.x)
            );

            // Update position to constrained value
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
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      if (onNodeClick) {
        onNodeClick(node.id, node.data);
      }

      // Enhanced zoom logic: focus on specific areas and zoom into them
      setFocusNodeId(node.id);

      // Set focus area based on node type and data (category logic removed)
      if (node.type === 'ageGroup') {
        setFocusArea(node.data.ageRange);
        if (currentZoomLevel === 0) {
          setCurrentZoomLevel(1); // Zoom into age group milestones
        }
      }
      // For milestones, just focus without changing zoom level
    },
    [onNodeClick, currentZoomLevel]
  );

  const handleZoomIn = useCallback(() => {
    if (currentZoomLevel < zoomLevels.length - 1) {
      setCurrentZoomLevel(currentZoomLevel + 1);
    }
  }, [currentZoomLevel, zoomLevels.length]);

  const handleZoomOut = useCallback(() => {
    if (currentZoomLevel > 0) {
      setCurrentZoomLevel(currentZoomLevel - 1);
    }
  }, [currentZoomLevel]);

  // Focus on a specific node
  const handleFocusNode = useCallback((nodeId: string) => {
    setFocusNodeId(nodeId);
  }, []);

  const toggleCategoryFilter = (category: DevelopmentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedFamilyMembers([]);
  }, []);

  return (
    <div className="h-screen w-full bg-gray-50">
      <ReactFlowProvider>
        <ReactFlowInnerComponent
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
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

// Enhanced inner component to access ReactFlow context with area focusing
interface ReactFlowInnerComponentProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onNodeClick: any;
  currentZoomLevel: number;
  zoomLevels: TimelineZoomLevel[];
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleFocusNode: (nodeId: string) => void;
  focusNodeId: string | null;
  focusArea: string | null;
  selectedCategories: DevelopmentCategory[];
  toggleCategoryFilter: (category: DevelopmentCategory) => void;
  clearAllFilters: () => void;
  selectedFamilyMembers: string[];
  setSelectedFamilyMembers: React.Dispatch<React.SetStateAction<string[]>>;
  pedagogyData?: PedagogyProfile;
  onCanvasWidthChange: (width: number) => void;
}

const ReactFlowInnerComponent: React.FC<ReactFlowInnerComponentProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
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
  const prevNodesLength = React.useRef(0);

  // Track canvas dimensions
  const [canvasDimensions, setCanvasDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  // Get canvas dimensions from ReactFlow container
  React.useEffect(() => {
    if (reactFlowInstance) {
      const updateDimensions = () => {
        const container = document.querySelector('.react-flow__renderer');
        if (container) {
          const rect = container.getBoundingClientRect();
          setCanvasDimensions({ width: rect.width, height: rect.height });
          onCanvasWidthChange(rect.width); // Notify parent component
        }
      };

      // Update dimensions initially and on resize
      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [reactFlowInstance, onCanvasWidthChange]);

  // Enhanced focus behavior: zoom into areas rather than just individual nodes
  React.useEffect(() => {
    if (focusNodeId && reactFlowInstance && nodes.length > 0) {
      const node = nodes.find((n) => n.id === focusNodeId);
      if (node) {
        // If we have a focus area, focus on all nodes in that area
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
            // Force center after area focus
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

        // Fallback to individual node focus
        reactFlowInstance.fitView({
          nodes: [node],
          duration: 800,
          padding: 0.3,
          minZoom: 0.5,
          maxZoom: 2.0,
        });
        // Force center after individual focus
        setTimeout(() => {
          const viewport = reactFlowInstance.getViewport();
          const canvasCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
          reactFlowInstance.setViewport({ x: canvasCenterX, y: viewport.y, zoom: viewport.zoom });
        }, 100);
      }
    }
  }, [focusNodeId, focusArea, nodes, reactFlowInstance]);

  // Initial centering when component mounts
  React.useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.1,
          minZoom: 0.5,
          maxZoom: 1.2,
          duration: 500,
        });
        // Force center after initial fit
        setTimeout(() => {
          const viewport = reactFlowInstance.getViewport();
          const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;
          reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
        }, 600);
      }, 200);
    }
  }, [reactFlowInstance, nodes.length, canvasDimensions]);

  // Handle visual zoom controls with improved behavior
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
      // Force center after fit view
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
      // Calculate the center position based on canvas width
      const screenCenterX = canvasDimensions ? -canvasDimensions.width / 2 : -400;

      // Only reset horizontal position to center if it has moved too far, keep vertical position
      if (Math.abs(viewport.x - screenCenterX) > 50) {
        // Allow small horizontal movements for better UX
        reactFlowInstance.setViewport({ x: screenCenterX, y: viewport.y, zoom: viewport.zoom });
      }
    },
    [reactFlowInstance, canvasDimensions]
  );

  // Allow normal panning behavior for vertical scrolling
  const panOnDrag = true; // Enable normal panning for vertical movement

  // Auto-center horizontally when nodes change, but don't interfere with manual vertical navigation
  React.useEffect(() => {
    if (nodes.length > 0) {
      // Only center initially or when zoom level changes, not on every node change
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
  }, [nodes.length, reactFlowInstance, canvasDimensions]); // Only depend on nodes.length, not full nodes array

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView={false} // Disable automatic fitView to control it manually
      minZoom={0.3}
      maxZoom={2}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      nodesDraggable={true}
      nodesConnectable={false}
      elementsSelectable={true}
      panOnDrag={panOnDrag}
      onMoveEnd={onMoveEnd}
      // Remove restrictive extents that might cause off-center positioning
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

      {/* Enhanced Control Panel */}
      <Panel position="top-left" className="bg-white p-4 rounded-lg shadow-lg border">
        <div className="space-y-3">
          {/* Zoom Level Info */}
          <div className="text-sm">
            <div className="font-semibold text-gray-800">{zoomLevels[currentZoomLevel].name}</div>
            <div className="text-gray-600 text-xs">{zoomLevels[currentZoomLevel].description}</div>
            {focusArea && (
              <div className="text-blue-600 text-xs mt-1">📍 Focused on: {focusArea}</div>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <SafeButton
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              disabled={currentZoomLevel === 0}
              className="flex items-center space-x-1"
            >
              <ZoomOut className="w-3 h-3" />
              <span>Out</span>
            </SafeButton>
            <SafeButton
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              disabled={currentZoomLevel === zoomLevels.length - 1}
              className="flex items-center space-x-1"
            >
              <ZoomIn className="w-3 h-3" />
              <span>In</span>
            </SafeButton>
            <SafeButton
              size="sm"
              variant="outline"
              onClick={handleFitView}
              className="flex items-center space-x-1"
            >
              <Focus className="w-3 h-3" />
              <span>Fit</span>
            </SafeButton>
          </div>

          {/* Visual Zoom Controls */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <span className="text-xs text-gray-600">View:</span>
            <SafeButton size="sm" variant="ghost" onClick={handleVisualZoomIn} className="p-1">
              <ZoomIn className="w-3 h-3" />
            </SafeButton>
            <SafeButton size="sm" variant="ghost" onClick={handleVisualZoomOut} className="p-1">
              <ZoomOut className="w-3 h-3" />
            </SafeButton>
          </div>
        </div>
      </Panel>

      {/* Always Visible Filter Panel */}
      <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg border max-w-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-800">Development Categories</div>
            <SafeButton
              size="sm"
              variant="outline"
              onClick={clearAllFilters}
              className="text-xs px-2 py-1 h-auto"
              disabled={selectedCategories.length === 0 && selectedFamilyMembers.length === 0}
            >
              Clear All
            </SafeButton>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {DEVELOPMENT_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategoryFilter(category)}
                  className="rounded border-gray-300"
                />
                <span className="capitalize">{category.replace('_', ' ')}</span>
              </label>
            ))}
          </div>

          {pedagogyData && pedagogyData.familyMembers && pedagogyData.familyMembers.length > 0 && (
            <>
              <div className="font-semibold text-gray-800 pt-2 border-t">Family Members</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {pedagogyData.familyMembers.map((member: any) => (
                  <label key={member.id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedFamilyMembers.includes(member.id)}
                      onChange={() => {
                        setSelectedFamilyMembers((prev) =>
                          prev.includes(member.id)
                            ? prev.filter((id) => id !== member.id)
                            : [...prev, member.id]
                        );
                      }}
                      className="rounded border-gray-300"
                    />
                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </Panel>
    </ReactFlow>
  );
};

export default VerticalTimeLine;
