import { jsx as _jsx } from "react/jsx-runtime";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
export default function BlurTabBarBackground() {
    return (_jsx(BlurView
    // System chrome material automatically adapts to the system's theme
    // and matches the native tab bar appearance on iOS.
    , { 
        // System chrome material automatically adapts to the system's theme
        // and matches the native tab bar appearance on iOS.
        tint: "systemChromeMaterial", intensity: 100, style: StyleSheet.absoluteFill }));
}
export function useBottomTabOverflow() {
    return useBottomTabBarHeight();
}
