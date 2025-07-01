import { Users } from 'lucide-react';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLORS } from '../constants';
import { VerticalHandles } from '../shared/VerticalHandles';
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

  const milestone = data.milestone;
  const progress = data.progress?.[0]; // Get first family member's progress
  const completion = data.completionPercentage || 0;

  return (
    <div
      className={`p-4 rounded-lg border-2 shadow-md min-w-64 max-w-80 ${getCategoryColor(
        milestone?.category
      )}`}
    >
      {/* Use standardized vertical handles for Y-axis layout */}
      <VerticalHandles />

      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{data.title}</h3>
        {getStatusIcon(progress?.status)}
      </div>

      {data.description && <p className="text-xs mb-3 opacity-90">{data.description}</p>}

      {milestone?.ageRange && (
        <div className="text-xs opacity-75 mb-2">Age: {milestone.ageRange}</div>
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
