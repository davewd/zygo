import { Target, Users } from 'lucide-react';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLORS } from '../constants';
import { VerticalHandles } from '../shared/VerticalHandles';
import '../styles/goal-milestone.css';
import { DevelopmentCategory, MilestoneStatus } from '../types';

interface MilestoneNodeProps {
  data: any;
}

export const MilestoneNode = ({ data }: { data: any }) => {
  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      default:
        return null;
    }
  };

  const getCategoryColor = (category: DevelopmentCategory) => {
    return CATEGORY_COLORS[category]?.light || DEFAULT_CATEGORY_COLORS.light;
  };

  const formatMilestoneAge = (milestone: any) => {
    if (!milestone) return '';

    const startMonths = milestone.startMonths || milestone.minAgeMonths || 0;
    const endMonths = milestone.endMonths || milestone.maxAgeMonths || 0;

    const formatAge = (months: number) => {
      if (months < 0) {
        return `${Math.abs(months)}m prenatal`;
      } else if (months < 12) {
        return `${months}m`;
      } else if (months < 24) {
        const remainingMonths = months % 12;
        return remainingMonths > 0 ? `1y ${remainingMonths}m` : `1y`;
      } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years}y`;
      }
    };

    if (startMonths === endMonths) {
      return formatAge(startMonths);
    } else {
      return `${formatAge(startMonths)} - ${formatAge(endMonths)}`;
    }
  };

  const milestone = data.milestone;
  const progress = data.progress?.[0]; // Get first family member's progress
  const completion = data.completionPercentage || 0;

  // Check for new flags
  const isCompleted = milestone?.isCompleted || false;
  const isCurrentGoal = milestone?.isCurrentGoal || false;

  // Determine styling classes
  const getContainerClasses = () => {
    let classes = `p-4 rounded-lg border-2 shadow-md min-w-64 max-w-80 transition-all duration-200 hover:shadow-lg relative ${getCategoryColor(
      milestone?.category
    )}`;

    if (isCurrentGoal) {
      classes += ' zygo-goal-milestone';
    } else if (isCompleted) {
      classes += ' zygo-completed-milestone';
    }

    return classes;
  };

  return (
    <div className={getContainerClasses()}>
      {/* Use standardized vertical handles for Y-axis layout */}
      <VerticalHandles />

      {/* Goal Icon */}
      {isCurrentGoal && (
        <div
          className={`zygo-goal-icon ${
            isCurrentGoal ? 'zygo-goal-icon--selected' : 'zygo-goal-icon--unselected'
          }`}
        >
          <Target className="w-3 h-3" />
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm leading-tight">{data.title}</h3>
        {getStatusIcon(progress?.status)}
      </div>

      {data.description && (
        <p className="text-xs mb-3 opacity-90 leading-relaxed">{data.description}</p>
      )}

      {/* Enhanced age display */}
      {milestone && (
        <div className="text-xs opacity-75 mb-2 p-2 bg-white/50 rounded border">
          <div className="font-medium text-blue-700">Age: {formatMilestoneAge(milestone)}</div>
          {milestone.ageRange && (
            <div className="text-gray-600 mt-1">Range: {milestone.ageRange}</div>
          )}
        </div>
      )}

      {data.familyMembers && data.familyMembers.length > 0 && (
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-3 h-3" />
          <span className="text-xs">{data.familyMembers.length} family member(s)</span>
        </div>
      )}

      {completion > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{Math.round(completion)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
