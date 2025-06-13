// Test script to verify breastfeeding data transformation
import { fetchFeedItems } from './lib/api/feed';

async function testBreastfeedingData() {
  console.log('Testing breastfeeding data transformation...');
  
  try {
    const response = await fetchFeedItems({ limit: 10 });
    console.log('Feed response:', response);
    
    // Find the breastfeeding item
    const breastfeedingItem = response.items.find(item => item.type === 'breastfeeding_tool');
    
    if (breastfeedingItem) {
      console.log('Found breastfeeding item:', breastfeedingItem);
      console.log('Breastfeeding data:', breastfeedingItem.breastfeedingData);
      console.log('Breastfeeding summary:', breastfeedingItem.breastfeedingSummary);
      
      if (breastfeedingItem.breastfeedingData && breastfeedingItem.breastfeedingData.length > 0) {
        console.log('✅ Breastfeeding data is properly preserved!');
      } else {
        console.log('❌ Breastfeeding data is missing or empty');
      }
      
      if (breastfeedingItem.breastfeedingSummary) {
        console.log('✅ Breastfeeding summary is properly preserved!');
      } else {
        console.log('❌ Breastfeeding summary is missing');
      }
    } else {
      console.log('❌ No breastfeeding item found in feed');
    }
  } catch (error) {
    console.error('Error testing breastfeeding data:', error);
  }
}

// Run the test
testBreastfeedingData();
