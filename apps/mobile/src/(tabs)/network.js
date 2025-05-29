import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { HelloWave } from '@zygo/ui/HelloWave';
import ParallaxScrollView from '@zygo/ui/ParallaxScrollView';
import { ThemedText } from '@zygo/ui/ThemedText';
import { ThemedView } from '@zygo/ui/ThemedView';
export default function HomeScreen() {
    var _a;
    const colorScheme = (_a = useColorScheme()) !== null && _a !== void 0 ? _a : 'light';
    return (_jsxs(ParallaxScrollView, { headerBackgroundColor: { light: '#A1CEDC', dark: '#1D3D47' }, children: [_jsxs(ThemedView, { style: styles.titleContainer, children: [_jsx(ThemedText, { type: "title", children: "Welcome!" }), _jsx(HelloWave, {})] }), _jsxs(ThemedView, { style: styles.stepContainer, children: [_jsx(ThemedText, { type: "subtitle", children: "Step 1: Try it" }), _jsxs(ThemedText, { children: ["Edit ", _jsx(ThemedText, { type: "defaultSemiBold", children: "app/(tabs)/index.tsx" }), " to see changes. Press", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: Platform.select({
                                    ios: 'cmd + d',
                                    android: 'cmd + m',
                                    web: 'F12',
                                }) }), ' ', "to open developer tools."] })] }), _jsxs(ThemedView, { style: styles.stepContainer, children: [_jsx(ThemedText, { type: "subtitle", children: "Step 2: Explore" }), _jsx(ThemedText, { children: `Tap the Explore tab to learn more about what's included in this starter app.` })] }), _jsxs(ThemedView, { style: styles.stepContainer, children: [_jsx(ThemedText, { type: "subtitle", children: "Step 3: Get a fresh start" }), _jsxs(ThemedText, { children: [`When you're ready, run `, _jsx(ThemedText, { type: "defaultSemiBold", children: "npm run reset-project" }), " to get a fresh", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "app" }), " directory. This will move the current", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "app" }), " to", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "app-example" }), "."] })] })] }));
}
const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
