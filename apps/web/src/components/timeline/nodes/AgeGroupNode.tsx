import { VerticalHandles } from '../shared/VerticalHandles';

interface AgeGroupNodeProps {
  data: any;
}

export const AgeGroupNode = ({ data }: { data: any }) => {
  // Extract age information from data
  const months = data.months || [];
  const startAge = months[0] || 0;
  const endAge = months[1] || 0;

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

  return (
    <div
      className="p-6 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg min-w-96 max-w-96 transform-gpu pointer-events-auto"
      style={{
        zIndex: 10, // Keep age groups above other elements
        cursor: 'default', // Indicate non-draggable
      }}
    >
      {/* Use standardized vertical handles for Y-axis layout */}
      <VerticalHandles />

      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
          {/* Age range display */}
          <div className="text-sm text-blue-600 font-medium mt-1">
            {formatAge(startAge)} → {formatAge(endAge)}
          </div>
        </div>

        {/* Milestone count indicator */}
        {data.totalMilestones && (
          <div className="text-right">
            <div className="text-xs text-gray-500">Milestones</div>
            <div className="text-lg font-bold text-blue-600">{data.totalMilestones}</div>
          </div>
        )}
      </div>

      {data.description && <p className="text-gray-600 text-sm">{data.description}</p>}

      {/* Progress indicator if available */}
      {data.completedMilestones !== undefined && data.totalMilestones > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {data.completedMilestones}/{data.totalMilestones}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(data.completedMilestones / data.totalMilestones) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
