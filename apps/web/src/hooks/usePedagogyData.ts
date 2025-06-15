import type { PedagogyProfile } from '@zygo/types';
import { useEffect, useState } from 'react';

export const usePedagogyData = () => {
  const [pedagogyData, setPedagogyData] = useState<PedagogyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedagogyData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we'll simulate loading the JSON file
        const response = await fetch('/data/pedagogy.json');
        if (!response.ok) {
          throw new Error('Failed to load pedagogy data');
        }
        const data = await response.json();
        setPedagogyData(data as PedagogyProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error loading pedagogy data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPedagogyData();
  }, []);

  const updateMilestoneProgress = (milestoneId: string, familyMemberId: string, progress: any) => {
    if (!pedagogyData) return;

    setPedagogyData(prev => {
      if (!prev) return prev;
      
      const updatedProgress = [...prev.milestoneProgress];
      const existingIndex = updatedProgress.findIndex(
        p => p.familyMemberId === familyMemberId && 
        prev.milestones.find(m => m.id === milestoneId)
      );

      if (existingIndex >= 0) {
        updatedProgress[existingIndex] = { ...updatedProgress[existingIndex], ...progress };
      } else {
        updatedProgress.push({
          familyMemberId,
          ...progress
        });
      }

      return {
        ...prev,
        milestoneProgress: updatedProgress,
        modifiedDate: new Date().toISOString()
      };
    });
  };

  const addFamilyMember = (member: any) => {
    if (!pedagogyData) return;

    setPedagogyData(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        familyMembers: [...prev.familyMembers, member],
        modifiedDate: new Date().toISOString()
      };
    });
  };

  const updateCustomizations = (customizations: any) => {
    if (!pedagogyData) return;

    setPedagogyData(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        customizations: { ...prev.customizations, ...customizations },
        modifiedDate: new Date().toISOString()
      };
    });
  };

  return {
    pedagogyData,
    loading,
    error,
    updateMilestoneProgress,
    addFamilyMember,
    updateCustomizations
  };
};
