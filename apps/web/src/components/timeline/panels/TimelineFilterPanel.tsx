import { Panel } from '@xyflow/react';
import { Button } from '@zygo/ui';
import { DEVELOPMENT_CATEGORIES } from '../constants';
import { DevelopmentCategory, PedagogyProfile } from '../types';

// Temporary wrapper to fix TypeScript issues
const SafeButton = Button as any;

interface TimelineFilterPanelProps {
  selectedCategories: DevelopmentCategory[];
  selectedFamilyMembers: string[];
  pedagogyData?: PedagogyProfile;
  onToggleCategoryFilter: (category: DevelopmentCategory) => void;
  onClearAllFilters: () => void;
  onSetSelectedFamilyMembers: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TimelineFilterPanel = ({
  selectedCategories,
  selectedFamilyMembers,
  pedagogyData,
  onToggleCategoryFilter,
  onClearAllFilters,
  onSetSelectedFamilyMembers,
}) => {
  return (
    <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg border max-w-xs">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-800">Development Categories</div>
          <SafeButton
            size="sm"
            variant="outline"
            onClick={onClearAllFilters}
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
                onChange={() => onToggleCategoryFilter(category)}
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
                      onSetSelectedFamilyMembers((prev) =>
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
  );
};
