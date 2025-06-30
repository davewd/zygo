const config = {
  // Display name for this package
  displayName: 'apps/web',

  // Root directory for this package
  rootDir: '.',

  // Preset for TypeScript/React projects
  preset: 'ts-jest',
  
  // Test environment
  testEnvironment: 'jsdom',

  // TypeScript configuration
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json'
    }]
  },

  // File extensions to consider
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ],

  // Test match patterns for this package
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx,js,jsx}'
  ],

  // Coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/index.{ts,tsx}'
  ],

  // Module name mapping for absolute imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@workspace/(.*)$': '<rootDir>/../$1/src'
  },

  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/src/test-setup.ts'
  ],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,

  verbose: false
};

module.exports = config;