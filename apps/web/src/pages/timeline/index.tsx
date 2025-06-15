import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import MilestoneDetail from '../../components/timeline/MilestoneDetail';
import VerticalTimeLine from '../../components/timeline/PedagogyTimelineVertical';
import { usePedagogyData } from '../../hooks/usePedagogyData';

export default function TimeLine() {
  const { pedagogyData, loading, error } = usePedagogyData();
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [showMilestoneDetail, setShowMilestoneDetail] = useState(false);

  const handleNodeClick = (nodeId: string, nodeData: any) => {
    if (nodeData.milestone) {
      setSelectedMilestone(nodeData.milestone);
      setShowMilestoneDetail(true);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading family pedagogy timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-2">Error loading pedagogy data</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <p className="text-gray-500 text-sm mt-4">Showing demo timeline instead...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <VerticalTimeLine pedagogyData={pedagogyData || undefined} onNodeClick={handleNodeClick} />

      {selectedMilestone && (
        <MilestoneDetail
          milestone={selectedMilestone}
          familyMembers={pedagogyData?.familyMembers || []}
          milestoneProgress={pedagogyData?.milestoneProgress || []}
          isOpen={showMilestoneDetail}
          onClose={() => setShowMilestoneDetail(false)}
          onUpdateProgress={(milestoneId, familyMemberId, newProgress) => {
            // Handle progress updates here
            console.log('Update progress:', { milestoneId, familyMemberId, newProgress });
          }}
        />
      )}
    </div>
  );
}
