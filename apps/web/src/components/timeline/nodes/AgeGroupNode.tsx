import { VerticalHandles } from '../shared/VerticalHandles';

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
      {/* Use standardized vertical handles for Y-axis layout */}
      <VerticalHandles />

      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
        </div>
      </div>

      {data.description && <p className="text-gray-600">{data.description}</p>}
    </div>
  );
};
