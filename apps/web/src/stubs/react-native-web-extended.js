// src/stubs/react-native-web-extended.js
// Re-export everything from react-native-web
export * from 'react-native-web';

// Add missing exports that some React Native libraries expect
export const TurboModuleRegistry = {
  get: () => null,
  getEnforcing: () => null,
};

export const NativeModules = {
  // Add any native modules that libraries might expect
  SettingsManager: {},
  AsyncStorage: null,
  DeviceInfo: {},
};

// Override Platform to ensure it reports as web
export const Platform = {
  OS: 'web',
  Version: undefined,
  isPad: false,
  isTV: false,
  isTesting: false,
  select: (obj) => obj.web || obj.default,
};

// Add other commonly expected React Native APIs
export const Dimensions = {
  get: () => ({ width: window.innerWidth, height: window.innerHeight }),
  addEventListener: () => {},
  removeEventListener: () => {},
};

export const PixelRatio = {
  get: () => window.devicePixelRatio || 1,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size) => size * (window.devicePixelRatio || 1),
  roundToNearestPixel: (size) => Math.round(size * (window.devicePixelRatio || 1)) / (window.devicePixelRatio || 1),
};