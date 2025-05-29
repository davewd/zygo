import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from '@zygo/ui/HapticTab';
import { IconSymbol } from '@zygo/ui/IconSymbol';
import TabBarBackground from '@zygo/ui/TabBarBackground';
export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (_jsxs(Tabs, { screenOptions: {
            tabBarActiveTintColor: Colors[colorScheme !== null && colorScheme !== void 0 ? colorScheme : 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: 'absolute',
                },
                default: {},
            }),
        }, children: [_jsx(Tabs.Screen, { name: "index", options: {
                    title: 'Home',
                    tabBarIcon: ({ color }) => _jsx(IconSymbol, { size: 28, name: "house.fill", color: color }),
                } }), _jsx(Tabs.Screen, { name: "network", options: {
                    title: 'Network',
                    tabBarIcon: ({ color }) => _jsx(IconSymbol, { size: 28, name: "network", color: color }),
                } }), _jsx(Tabs.Screen, { name: "post", options: {
                    title: 'Post',
                    tabBarIcon: ({ color }) => _jsx(IconSymbol, { size: 28, name: "plus.rectangle.fill.on.rectangle.fill", color: color }),
                } }), _jsx(Tabs.Screen, { name: "tools", options: {
                    title: 'Tools',
                    tabBarIcon: ({ color }) => _jsx(IconSymbol, { size: 28, name: "wrench.and.screwdriver.fill", color: color }),
                } }), _jsx(Tabs.Screen, { name: "timeline", options: {
                    title: 'Timeline',
                    tabBarIcon: ({ color }) => _jsx(IconSymbol, { size: 28, name: "clock.fill", color: color }),
                } })] }));
}
