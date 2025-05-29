import type { Config } from 'jest';

const config: Config = {
  // Display name for this package
  displayName: 'apps/web', // Replace with actual package name

  // Root directory for this package
  rootDir: '.',

  // Preset for TypeScript/React projects
  preset: 'ts-jest',
  
  // Test environment
  testEnvironment: 'node', // Use 'jsdom' for React/browser code

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
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@workspace/(.*)$': '<rootDir>/../$1/src'
  },

  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/src/test-setup.ts' // Optional: create if needed
  ],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true
};

export default config;