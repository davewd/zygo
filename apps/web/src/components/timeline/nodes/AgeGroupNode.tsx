import { Calendar } from 'lucide-react';

interface AgeGroupNodeProps {
  data: any;
}

export const AgeGroupNode = ({ data }: { data: any }) => {
  return (
    <div
      className="p-6 rounded-xl border-2 border-gray-300 bg-gray-50 shadow-lg min-w-96 max-w-96 transform-gpu pointer-events-auto"
      style={{
        zIndex: 10, // Keep age groups above other elements
        cursor: 'default', // Indicate non-draggable
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
          <div className="text-sm text-gray-600">{data.ageRange}</div>
        </div>
        <Calendar className="w-6 h-6 text-gray-600" />
      </div>

      {data.description && <p className="text-gray-600 mb-4">{data.description}</p>}

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-medium text-gray-700">Total</div>
          <div className="text-xl font-bold text-gray-800">{data.totalMilestones || 0}</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-green-700">Completed</div>
          <div className="text-xl font-bold text-green-800">{data.completedMilestones || 0}</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-blue-700">In Progress</div>
          <div className="text-xl font-bold text-blue-800">{data.inProgressMilestones || 0}</div>
        </div>
      </div>
    </div>
  );
};
