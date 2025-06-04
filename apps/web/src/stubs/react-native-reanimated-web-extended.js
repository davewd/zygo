import React from 'react';
import { FlatList as RNFlatList, ScrollView, View } from 'react-native-web';

// Create animated versions that are just regular React Native Web components
export const Animated = {
  View: View,
  ScrollView: ScrollView,
  FlatList: RNFlatList,
  Text: ({ children, ...props }) => React.createElement('span', props, children),
  Image: ({ source, ...props }) => React.createElement('img', { src: source?.uri || source, ...props }),
};

// Stub animation functions
export const useSharedValue = (initialValue) => ({ value: initialValue });
export const useAnimatedStyle = (styleFunc) => styleFunc;
export const useAnimatedScrollHandler = (handler) => handler;
export const useAnimatedGestureHandler = (handler) => handler;
export const withTiming = (value) => value;
export const withSpring = (value) => value;
export const withDecay = (value) => value;
export const withDelay = (delay, animation) => animation;
export const withRepeat = (animation) => animation;
export const withSequence = (...animations) => animations[0];
export const cancelAnimation = () => {};
export const runOnJS = (fn) => fn;
export const runOnUI = (fn) => fn;

// Gesture handler stubs
export const Gesture = {
  Pan: () => ({}),
  Tap: () => ({}),
  Pinch: () => ({}),
  Rotation: () => ({}),
  Fling: () => ({}),
  LongPress: () => ({}),
};

// Layout animation stubs
export const Layout = {
  springify: () => ({}),
  damping: () => ({}),
  mass: () => ({}),
  stiffness: () => ({}),
  overshootClamping: () => ({}),
  restDisplacementThreshold: () => ({}),
  restSpeedThreshold: () => ({}),
};

export const FadingTransition = {};
export const SlideInRight = {};
export const SlideInLeft = {};
export const SlideInUp = {};
export const SlideInDown = {};
export const SlideOutRight = {};
export const SlideOutLeft = {};
export const SlideOutUp = {};
export const SlideOutDown = {};

// Easing functions (return identity for web)
export const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  quad: (t) => t,
  cubic: (t) => t,
  poly: (n) => (t) => t,
  sin: (t) => t,
  circle: (t) => t,
  exp: (t) => t,
  elastic: (bounciness) => (t) => t,
  back: (s) => (t) => t,
  bounce: (t) => t,
  bezier: (x1, y1, x2, y2) => (t) => t,
  in: (easing) => easing,
  out: (easing) => easing,
  inOut: (easing) => easing,
};

// Interpolation stubs
export const interpolate = (value, inputRange, outputRange) => value;
export const interpolateColor = (value, inputRange, outputRange) => outputRange[0];
export const extrapolate = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };

// Default export
export default {
  Animated,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  cancelAnimation,
  runOnJS,
  runOnUI,
  Gesture,
  Layout,
  FadingTransition,
  SlideInRight,
  SlideInLeft,
  SlideInUp,
  SlideInDown,
  SlideOutRight,
  SlideOutLeft,
  SlideOutUp,
  SlideOutDown,
  Easing,
  interpolate,
  interpolateColor,
  extrapolate,
};