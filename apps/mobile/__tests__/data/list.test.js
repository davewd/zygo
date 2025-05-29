import listData from '../../data/list.json';
describe('Feed Data Type Validation', () => {
    it('all list items should match FeedItem type structure', () => {
        listData.results.forEach((item, index) => {
            // Test required fields
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('metadata.createdAt');
            // Type-specific validations
            if (item.type === 'text') {
                expect(item).toHaveProperty('content');
                expect(typeof item.content).toBe('string');
            }
            if (item.type === 'image') {
                expect(item).toHaveProperty('imageUrl');
                expect(typeof item.imageUrl).toBe('string');
            }
            // Optional fields type checking
            if (item.likes !== undefined) {
                expect(typeof item.stats.likes).toBe('number');
            }
            if (item.shares !== undefined) {
                expect(typeof item.stats.shares).toBe('number');
            }
            if (item.comments !== undefined) {
                expect(typeof item.stats.comments).toBe('number');
            }
            // Verify type assertion works without throwing
            const typedItem = item;
            expect(typedItem).toBeTruthy();
        });
    });
    it('should have valid dates for createdAt', () => {
        listData.results.forEach((item) => {
            expect(() => new Date(item.metadata.createdAt)).not.toThrow();
            expect(isNaN(new Date(item.metadata.createdAt).getTime())).toBeFalsy();
        });
    });
});
