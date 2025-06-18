import { useCallback, useState } from 'react';
import { DevelopmentCategory } from '../types';

export const useTimelineFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState<DevelopmentCategory[]>([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);

  const toggleCategoryFilter = useCallback((category: DevelopmentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedFamilyMembers([]);
  }, []);

  return {
    selectedCategories,
    selectedFamilyMembers,
    setSelectedFamilyMembers,
    toggleCategoryFilter,
    clearAllFilters,
  };
};
