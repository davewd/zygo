import React, { useEffect, useState } from 'react';
import { FeedListItemToolBreastFeeding } from '../components/feed/tool_specific/FeedListItemToolBreastFeeding';
import { FeedItemTypeMap, fetchFeedItems } from '../lib/api/feed';

const BreastfeedingTest: React.FC = () => {
  const [breastfeedingItem, setBreastfeedingItem] = useState<FeedItemTypeMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchFeedItems({ limit: 10 });
        const item = response.items.find((item) => item.type === 'breastfeeding_tool');

        if (item) {
          setBreastfeedingItem(item);
          console.log('Found breastfeeding item:', item);
          console.log('Breastfeeding data:', item.breastfeedingData);
          console.log('Breastfeeding summary:', item.breastfeedingSummary);
        } else {
          setError('No breastfeeding item found');
        }
      } catch (err) {
        setError('Error loading data: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading breastfeeding test...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!breastfeedingItem) {
    return <div className="p-4">No breastfeeding item found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Breastfeeding Component Test</h1>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="font-bold">Debug Info:</h3>
        <p>Item Type: {breastfeedingItem.type}</p>
        <p>Has Breastfeeding Data: {breastfeedingItem.breastfeedingData ? 'Yes' : 'No'}</p>
        <p>Data Points: {breastfeedingItem.breastfeedingData?.length || 0}</p>
        <p>Has Summary: {breastfeedingItem.breastfeedingSummary ? 'Yes' : 'No'}</p>
      </div>
      <FeedListItemToolBreastFeeding item={breastfeedingItem} />
    </div>
  );
};

export default BreastfeedingTest;
