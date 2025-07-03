import { Crown, Sparkles, Star, Target, Users } from 'lucide-react';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLORS } from '../constants';
import { VerticalHandles } from '../shared/VerticalHandles';
import '../styles/goal-milestone.css';
import { DevelopmentCategory, MilestoneStatus } from '../types';

export interface KeyMilestoneNodeProps {
  data: any;
}

export const KeyMilestoneNode = ({ data }: KeyMilestoneNodeProps) => {
  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      default:
        return null;
    }
  };

  const getCategoryColor = (category: DevelopmentCategory) => {
    return CATEGORY_COLORS[category]?.light || DEFAULT_CATEGORY_COLORS.light;
  };

  const getMilestoneTypeIcon = (milestoneType: string) => {
    switch (milestoneType) {
      case 'conception':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Crown className="w-5 h-5 text-purple-500" />;
    }
  };

  const getMilestoneTypeLabel = (milestoneType: string) => {
    switch (milestoneType) {
      case 'conception':
        return 'Critical Foundation';
      default:
        return 'Key Milestone';
    }
  };

  const milestone = data.milestone;
  const progress = data.progress?.[0]; // Get first family member's progress
  const completion = data.completionPercentage || 0;
  const milestoneType = milestone?.milestoneType || data.milestoneType;

  // Check for new flags
  const isCompleted = milestone?.isCompleted || false;
  const isCurrentGoal = milestone?.isCurrentGoal || false;

  // Determine styling classes
  const getContainerClasses = () => {
    let classes = `p-6 rounded-lg border-4 border-purple-400 shadow-xl min-w-72 max-w-80 ${getCategoryColor(
      milestone?.category || data.category
    )} bg-gradient-to-br from-purple-50 to-white relative overflow-hidden transform-gpu`;

    if (isCurrentGoal) {
      classes += ' zygo-goal-milestone';
    } else if (isCompleted) {
      classes += ' zygo-completed-milestone';
    }

    return classes;
  };

  return (
    <div
      className={getContainerClasses()}
      style={{
        zIndex: 20, // Highest priority
        cursor: 'default',
      }}
    >
      {/* Use standardized vertical handles */}
      <VerticalHandles />

      {/* Goal Icon for Key Milestones */}
      {isCurrentGoal && (
        <div
          className={`zygo-goal-icon ${
            isCurrentGoal ? 'zygo-goal-icon--selected' : 'zygo-goal-icon--unselected'
          }`}
        >
          <Target className="w-3 h-3" />
        </div>
      )}

      {/* Key milestone indicator */}
      <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg shadow-md">
        KEY
      </div>

      {/* Milestone type badge */}
      {milestoneType && (
        <div className="flex items-center gap-2 mb-3">
          {getMilestoneTypeIcon(milestoneType)}
          <span className="text-sm font-semibold text-purple-700">
            {getMilestoneTypeLabel(milestoneType)}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-purple-900">{data.title}</h3>
        <Sparkles className="w-6 h-6 text-purple-600" />
        {getStatusIcon(progress?.status)}
      </div>

      {data.description && (
        <p className="text-sm mb-3 opacity-90 text-purple-800 font-medium">{data.description}</p>
      )}

      {(milestone?.ageRange || data.date) && (
        <div className="text-sm opacity-75 mb-3 font-semibold text-purple-700">
          Age: {milestone?.ageRange || data.date}
        </div>
      )}

      {milestone?.importance && (
        <div className="text-xs mb-3">
          <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
            {milestone.importance.toUpperCase()} IMPORTANCE
          </span>
        </div>
      )}

      {data.familyMembers && data.familyMembers.length > 0 && (
        <div className="flex items-center space-x-2 mb-3">
          <Users className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">
            {data.familyMembers.length} family member(s)
          </span>
        </div>
      )}

      {completion > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-purple-700">Progress</span>
            <span className="text-purple-900">{Math.round(completion)}%</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      )}

      {/* Decorative elements for key milestones */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
    </div>
  );
};
