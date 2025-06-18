import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLORS } from '../constants';
import { DevelopmentCategory } from '../types';

interface CategoryNodeProps {
  data: any;
}

export const CategoryNode = ({ data }: { data: any }) => {
  const getCategoryColor = (category: DevelopmentCategory) => {
    return CATEGORY_COLORS[category]?.lighter || DEFAULT_CATEGORY_COLORS.lighter;
  };

  return (
    <div
      className={`p-6 rounded-xl border-2 shadow-lg min-w-80 ${getCategoryColor(data.category)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg capitalize">{data.category?.replace('_', ' ')}</h3>
        <div className="text-sm font-medium">
          {data.completedMilestones || 0}/{data.totalMilestones || 0}
        </div>
      </div>

      {data.description && <p className="text-sm mb-4">{data.description}</p>}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-medium text-green-700">Completed</div>
          <div className="text-lg">{data.completedMilestones || 0}</div>
        </div>
        <div>
          <div className="font-medium text-blue-700">In Progress</div>
          <div className="text-lg">{data.inProgressMilestones || 0}</div>
        </div>
      </div>
    </div>
  );
};
