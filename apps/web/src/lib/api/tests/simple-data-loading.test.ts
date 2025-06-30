/**
 * Simple Data Loading Test
 * 
 * This test verifies that all required data files can be loaded
 * and have the expected structure.
 */

import communityData from '../data/community.json';
import providersData from '../data/providers.json';
import feedItemsData from '../data/feed/feed_items.json';

describe('Simple Data Loading Tests', () => {
  
  test('Community data should load with correct structure', () => {
    expect(communityData).toBeDefined();
    expect(communityData).toHaveProperty('primaryConsumers');
    expect(Array.isArray(communityData.primaryConsumers)).toBe(true);
    expect(communityData.primaryConsumers.length).toBeGreaterThan(0);
    
    console.log('✅ Community data loaded:', Object.keys(communityData));
    console.log(`   Primary consumers: ${communityData.primaryConsumers.length}`);
  });

  test('Providers data should load with correct structure', () => {
    expect(providersData).toBeDefined();
    expect(providersData).toHaveProperty('serviceProviders');
    expect(Array.isArray(providersData.serviceProviders)).toBe(true);
    expect(providersData.serviceProviders.length).toBeGreaterThan(0);
    
    console.log('✅ Providers data loaded:', Object.keys(providersData));
    console.log(`   Service providers: ${providersData.serviceProviders.length}`);
  });

  test('Feed data should load with correct structure', () => {
    expect(feedItemsData).toBeDefined();
    expect(Array.isArray(feedItemsData)).toBe(true);
    expect(feedItemsData.length).toBeGreaterThan(0);
    
    console.log('✅ Feed data loaded. Type: Array');
    console.log(`✅ Feed data length: ${feedItemsData.length}`);
    
    // Check that each feed item has required properties
    feedItemsData.forEach((item, index) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('author');
      expect(item.author).toHaveProperty('name');
      expect(item.author).toHaveProperty('handle');
    });
  });

  test('All data files should be accessible and valid JSON', () => {
    const dataFiles = [
      { name: 'Community', data: communityData },
      { name: 'Providers', data: providersData },
      { name: 'Feed Items', data: feedItemsData }
    ];

    dataFiles.forEach(file => {
      expect(file.data).toBeDefined();
      expect(typeof file.data).toBe('object');
      console.log(`✅ ${file.name} data is valid`);
    });
  });
});
