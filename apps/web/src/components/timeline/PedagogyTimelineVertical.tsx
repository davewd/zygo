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
  Filter,
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
    <div className="p-6 rounded-xl border-2 border-gray-300 bg-gray-50 shadow-lg min-w-96">
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

    // Milestone templates by category and age range
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

  // Enhanced zoom levels with comprehensive coverage
  const zoomLevels: TimelineZoomLevel[] = [
    {
      level: 0,
      name: 'Overview',
      description: 'Complete timeline overview from prenatal to 18 years',
      nodeTypes: ['ageGroup', 'category'],
      timeSpan: { minAgeMonths: -12, maxAgeMonths: 216 }, // -12 months to 18 years
    },
    {
      level: 1,
      name: 'Age Group Focus',
      description: 'Focused view on specific age group and its categories',
      nodeTypes: ['ageGroup', 'category', 'milestone'],
      timeSpan: { minAgeMonths: -12, maxAgeMonths: 60 }, // Prenatal to 5 years focus
    },
    {
      level: 2,
      name: 'Milestone Deep Dive',
      description: 'Detailed view of individual milestones and progress',
      nodeTypes: ['category', 'milestone'],
      timeSpan: { minAgeMonths: -12, maxAgeMonths: 36 }, // Prenatal to 3 years focus
    },
  ];

  const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<DevelopmentCategory[]>([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const [focusArea, setFocusArea] = useState<string | null>(null);
  const [allAgeRanges] = useState(() => generateAgeRanges());
  const [comprehensiveMilestones] = useState(() => generateComprehensiveMilestones());

  // Enhanced layout algorithm with collision detection and proper spacing
  const calculateNodePositions = useCallback(
    (nodeData: any[], edgeData: any[], zoomLevel: number, focusArea?: string) => {
      const positions = new Map<string, { x: number; y: number }>();
      const nodeWidths = new Map<string, number>();
      const nodeHeights = new Map<string, number>();

      // Define node dimensions based on type and zoom level
      const getNodeDimensions = (nodeType: string) => {
        const baseScale = zoomLevel === 0 ? 1.2 : zoomLevel === 1 ? 1.0 : 0.8;
        switch (nodeType) {
          case 'ageGroup':
            return { width: 400 * baseScale, height: 200 * baseScale };
          case 'category':
            return { width: 340 * baseScale, height: 180 * baseScale };
          case 'milestone':
            return { width: 300 * baseScale, height: 160 * baseScale };
          default:
            return { width: 200 * baseScale, height: 120 * baseScale };
        }
      };

      // Store dimensions
      nodeData.forEach((node) => {
        const dims = getNodeDimensions(node.type);
        nodeWidths.set(node.id, dims.width);
        nodeHeights.set(node.id, dims.height);
      });

      // Dynamic spacing based on zoom level and focus area
      const getLayoutParams = () => {
        if (zoomLevel === 0) {
          return {
            centerX: 600,
            verticalSpacing: 350,
            horizontalSpacing: 500,
            padding: 100,
          };
        } else if (zoomLevel === 1) {
          return {
            centerX: 500,
            verticalSpacing: 280,
            horizontalSpacing: 400,
            padding: 80,
          };
        } else {
          return {
            centerX: 400,
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

      // Collision detection helper
      const checkCollision = (
        pos1: { x: number; y: number },
        size1: { width: number; height: number },
        pos2: { x: number; y: number },
        size2: { width: number; height: number }
      ) => {
        return !(
          pos1.x + size1.width / 2 < pos2.x - size2.width / 2 ||
          pos2.x + size2.width / 2 < pos1.x - size1.width / 2 ||
          pos1.y + size1.height / 2 < pos2.y - size2.height / 2 ||
          pos2.y + size2.height / 2 < pos1.y - size1.height / 2
        );
      };

      const findNonCollidingPosition = (
        startPos: { x: number; y: number },
        nodeId: string,
        attempts = 0
      ) => {
        if (attempts > 50) return startPos; // Prevent infinite loops

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

          if (checkCollision(startPos, nodeSize, existingPos, existingSize)) {
            // Enhanced collision resolution for social_emotional and other important categories
            const isSocialEmotional = nodeId.includes('social_emotional');
            const adjustmentMultiplier = isSocialEmotional ? 1.5 : 1.0; // Give social_emotional more space

            const newPos = {
              x: startPos.x + (Math.random() - 0.5) * 120 * adjustmentMultiplier,
              y: startPos.y + (50 + attempts * 25) * adjustmentMultiplier,
            };
            return findNonCollidingPosition(newPos, nodeId, attempts + 1);
          }
        }

        return startPos;
      };

      // Position age groups vertically down the center
      if (nodesByType.ageGroup) {
        nodesByType.ageGroup.forEach((node, index) => {
          const initialPos = {
            x: centerX,
            y: padding + index * (verticalSpacing + 100),
          };
          positions.set(node.id, findNonCollidingPosition(initialPos, node.id));
        });
      }

      // Position categories around age groups with improved category-specific branching
      if (nodesByType.category) {
        const ageGroups = nodesByType.ageGroup || [];

        // Group categories by age group for better positioning
        const categoriesByAgeGroup = new Map<string, any[]>();

        nodesByType.category.forEach((node) => {
          // Extract age group from node ID (format: category-{ageGroup}-{category})
          const ageGroupMatch = node.id.match(/category-([^-]+)-/);
          const ageGroup = ageGroupMatch ? ageGroupMatch[1] : 'unknown';

          if (!categoriesByAgeGroup.has(ageGroup)) {
            categoriesByAgeGroup.set(ageGroup, []);
          }
          categoriesByAgeGroup.get(ageGroup)?.push(node);
        });

        // Position categories with category-specific logic
        categoriesByAgeGroup.forEach((categories, ageGroupKey) => {
          const ageGroup = ageGroups.find((ag) => ag.id === `ageGroup-${ageGroupKey}`);
          if (!ageGroup) return;

          const ageGroupPos = positions.get(ageGroup.id);
          if (!ageGroupPos) return;

          // Sort categories to ensure consistent positioning
          const sortedCategories = categories.sort((a, b) => {
            // Extract category type from node data
            const categoryA = a.data?.category || '';
            const categoryB = b.data?.category || '';

            // Priority order for consistent positioning
            const priorityOrder = {
              physical: 0,
              cognitive: 1,
              social_emotional: 2,
              language: 3,
              motor_skills: 4,
              sensory: 5,
              self_care: 6,
              academic: 7,
            };

            return (priorityOrder[categoryA] || 99) - (priorityOrder[categoryB] || 99);
          });

          sortedCategories.forEach((node, index) => {
            const categoryType = node.data?.category || '';
            let offsetX, offsetY;

            // Category-specific positioning with improved social_emotional placement
            switch (categoryType) {
              case 'physical':
                offsetX = -horizontalSpacing * 1.1;
                offsetY = -80;
                break;
              case 'cognitive':
                offsetX = horizontalSpacing * 1.1;
                offsetY = -80;
                break;
              case 'social_emotional':
                // Fix: Position social_emotional prominently to the left-center
                offsetX = -horizontalSpacing * 0.6;
                offsetY = 120;
                break;
              case 'language':
                offsetX = horizontalSpacing * 0.6;
                offsetY = 120;
                break;
              case 'motor_skills':
                offsetX = -horizontalSpacing * 1.3;
                offsetY = 40;
                break;
              case 'sensory':
                offsetX = horizontalSpacing * 1.3;
                offsetY = 40;
                break;
              case 'self_care':
                offsetX = 0;
                offsetY = 200;
                break;
              case 'academic':
                offsetX = 0;
                offsetY = -150;
                break;
              default:
                // Fallback pattern for any additional categories
                const fallbackIndex = index % 4;
                const angle = (fallbackIndex / 4) * Math.PI * 2;
                offsetX = Math.cos(angle) * horizontalSpacing;
                offsetY = Math.sin(angle) * verticalSpacing * 0.3;
            }

            const initialPos = {
              x: ageGroupPos.x + offsetX,
              y: ageGroupPos.y + offsetY,
            };
            positions.set(node.id, findNonCollidingPosition(initialPos, node.id));
          });
        });
      }

      // Position milestones around categories with hierarchical layout
      if (nodesByType.milestone) {
        const categories = nodesByType.category || [];

        categories.forEach((category, catIndex) => {
          const categoryPos = positions.get(category.id);
          if (!categoryPos) return;

          // Get milestones for this category
          const categoryMilestones = nodesByType.milestone.filter((m) =>
            edgeData.some((edge) => edge.source === category.id && edge.target === m.id)
          );

          categoryMilestones.forEach((milestone, mIndex) => {
            // Create a circular/fan pattern around the category
            const angle = (mIndex / categoryMilestones.length) * Math.PI * 2;
            const radius = 250;
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;

            const initialPos = {
              x: categoryPos.x + offsetX,
              y: categoryPos.y + offsetY + 200, // Offset down from category
            };
            positions.set(milestone.id, findNonCollidingPosition(initialPos, milestone.id));
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
      // Enhanced demo nodes with better positioning
      const demoNodesData = [
        { id: 'demo-overview', type: 'ageGroup' },
        { id: 'demo-physical', type: 'category' },
        { id: 'demo-cognitive', type: 'category' },
      ];
      const demoEdgesData = [
        { id: 'demo-edge-1', source: 'demo-overview', target: 'demo-physical' },
        { id: 'demo-edge-2', source: 'demo-overview', target: 'demo-cognitive' },
      ];

      const { positions } = calculateNodePositions(
        demoNodesData,
        demoEdgesData,
        currentZoomLevel,
        focusArea
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
          position: positions.get('demo-overview') || { x: 600, y: 100 },
        },
        {
          id: 'demo-physical',
          type: 'category',
          data: {
            title: 'Physical Development',
            description: 'Gross and fine motor skills development',
            category: 'physical' as DevelopmentCategory,
            completionPercentage: 65,
            milestoneCount: 8,
            isExpanded: false,
          },
          position: positions.get('demo-physical') || { x: 200, y: 400 },
        },
        {
          id: 'demo-cognitive',
          type: 'category',
          data: {
            title: 'Cognitive Development',
            description: 'Learning, memory, and problem-solving skills',
            category: 'cognitive' as DevelopmentCategory,
            completionPercentage: 40,
            milestoneCount: 10,
            isExpanded: false,
          },
          position: positions.get('demo-cognitive') || { x: 1000, y: 400 },
        },
      ];

      const demoEdges: TimelineEdge[] = [
        {
          id: 'demo-edge-1',
          source: 'demo-overview',
          target: 'demo-physical',
          type: 'smoothstep',
          style: { stroke: '#10b981', strokeWidth: 3 },
          label: 'Develops into',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
        },
        {
          id: 'demo-edge-2',
          source: 'demo-overview',
          target: 'demo-cognitive',
          type: 'smoothstep',
          style: { stroke: '#3b82f6', strokeWidth: 3 },
          label: 'Grows into',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
        },
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
    if (shouldIncludeNode('category')) {
      const ageGroups = allAgeRanges.slice(0, Math.min(12, allAgeRanges.length)); // Match age group generation
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

      ageGroups.forEach((ageGroup, ageIndex) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;

        // Filter categories based on selections and relevance to age range
        const relevantCategories = DEVELOPMENT_CATEGORIES.filter((category) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            return false;
          }
          // Filter categories by age appropriateness
          const [startMonth] = ageGroup.months;
          if (
            startMonth < 0 &&
            !['physical', 'cognitive', 'social_emotional', 'language'].includes(category)
          ) {
            return false; // Prenatal only has basic categories
          }
          return true;
        });

        relevantCategories.forEach((category, catIndex) => {
          const categoryId = `category-${ageGroup.key}-${category}`;
          const categoryMilestones = comprehensiveMilestones.filter(
            (m) => m.ageRangeKey === ageGroup.key && m.category === category
          );

          generatedNodes.push({
            id: categoryId,
            type: 'category',
            data: {
              title: category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
              description: `${category.replace('_', ' ')} development during ${ageGroup.range}`,
              category: category,
              completionPercentage: Math.floor(Math.random() * 100),
              milestoneCount: categoryMilestones.length,
              isExpanded: false,
              ageGroup: ageGroup.key,
              ageRange: ageGroup.range,
              months: ageGroup.months,
            },
            position: { x: 0, y: 0 }, // Will be calculated
          });

          // Create enhanced directional edges from age group to categories
          generatedEdges.push({
            id: `age-to-cat-${ageGroup.key}-${category}`,
            source: ageGroupId,
            target: categoryId,
            type: 'smoothstep',
            style: {
              stroke: categoryColors[category] || '#6b7280',
              strokeWidth: 3,
              opacity: 0.8,
            },
            label: catIndex === 0 ? 'Develops into' : undefined,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: categoryColors[category] || '#6b7280',
            },
          });
        });
      });
    }

    // Generate milestones with hierarchical relationships using comprehensive milestone data
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
        DEVELOPMENT_CATEGORIES.forEach((category) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            return;
          }

          const categoryId = `category-${ageGroup.key}-${category}`;
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
                : Math.floor(Math.random() * 100); // Random for demo purposes

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

            // Enhanced directional edges from category to milestones
            generatedEdges.push({
              id: `cat-to-milestone-${milestone.id}`,
              source: categoryId,
              target: milestoneId,
              type: 'smoothstep',
              style: {
                stroke: categoryColors[category] || '#6b7280',
                strokeWidth: 2,
                opacity: 0.7,
              },
              label: milestoneIndex === 0 ? 'Includes' : undefined,
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
      focusArea
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
  ]);

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

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

      // Set focus area based on node type and data
      if (node.type === 'ageGroup') {
        setFocusArea(node.data.ageRange);
        if (currentZoomLevel === 0) {
          setCurrentZoomLevel(1); // Zoom into age group categories
        }
      } else if (node.type === 'category') {
        setFocusArea(node.data.ageGroup);
        if (currentZoomLevel === 1) {
          setCurrentZoomLevel(2); // Zoom into category milestones
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
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCategories={selectedCategories}
          toggleCategoryFilter={toggleCategoryFilter}
          selectedFamilyMembers={selectedFamilyMembers}
          setSelectedFamilyMembers={setSelectedFamilyMembers}
          pedagogyData={pedagogyData}
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
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedCategories: DevelopmentCategory[];
  toggleCategoryFilter: (category: DevelopmentCategory) => void;
  selectedFamilyMembers: string[];
  setSelectedFamilyMembers: React.Dispatch<React.SetStateAction<string[]>>;
  pedagogyData?: PedagogyProfile;
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
  showFilters,
  setShowFilters,
  selectedCategories,
  toggleCategoryFilter,
  selectedFamilyMembers,
  setSelectedFamilyMembers,
  pedagogyData,
}) => {
  const reactFlowInstance = useReactFlow();

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
      }
    }
  }, [focusNodeId, focusArea, nodes, reactFlowInstance]);

  // Handle visual zoom controls with improved behavior
  const handleVisualZoomIn = useCallback(() => {
    reactFlowInstance.zoomIn({ duration: 300 });
  }, [reactFlowInstance]);

  const handleVisualZoomOut = useCallback(() => {
    reactFlowInstance.zoomOut({ duration: 300 });
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    reactFlowInstance.fitView({
      duration: 800,
      padding: 0.1,
      minZoom: 0.1,
      maxZoom: 1.5,
    });
  }, [reactFlowInstance]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView
      minZoom={0.1}
      maxZoom={2}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      nodesDraggable={true}
      nodesConnectable={false}
      elementsSelectable={true}
    >
      <Background />
      <Controls />
      <MiniMap
        nodeColor={(node) => {
          switch (node.type) {
            case 'ageGroup':
              return '#6b7280';
            case 'category':
              return '#10b981';
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

          {/* Filter Toggle */}
          <SafeButton
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 w-full"
          >
            <Filter className="w-3 h-3" />
            <span>Filters</span>
          </SafeButton>
        </div>
      </Panel>

      {/* Enhanced Filter Panel */}
      {showFilters && (
        <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg border max-w-xs">
          <div className="space-y-4">
            <div className="font-semibold text-gray-800">Development Categories</div>
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

            {pedagogyData &&
              pedagogyData.familyMembers &&
              pedagogyData.familyMembers.length > 0 && (
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
      )}
    </ReactFlow>
  );
};

export default VerticalTimeLine;
