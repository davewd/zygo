const config = {
  // Use projects to define multiple Jest configurations for different packages
  projects: [
    '<rootDir>/apps/*/jest.config.cjs'
  ],

  // Collect coverage from all packages
  collectCoverageFrom: [
    'apps/*/src/**/*.{ts,tsx,js,jsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Coverage directory
  coverageDirectory: '<rootDir>/coverage',

  // Coverage reporters
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  // Test match patterns
  testMatch: [
    '<rootDir>/apps/**/src/**/__tests__/**/*.{ts,tsx,js,jsx}',
    '<rootDir>/apps/**/src/**/*.{test,spec}.{ts,tsx,js,jsx}'
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/'
  ],

  // Module paths for workspace packages
  moduleNameMapper: {
    '^@workspace/(.*)$': '<rootDir>/packages/$1/src'
  },

  // Max workers for parallel execution
  maxWorkers: '50%',

  // Verbose output
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true
};

module.exports = config;