import { useColorScheme } from '@zygo/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, } from 'react-native-reanimated';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBottomTabOverflow } from './TabBarBackground';
import { ThemedView } from './ThemedView';
const HEADER_HEIGHT = 250;
export default function ParallaxScrollView({ children, headerImage, headerBackgroundColor, }) {
    var _a;
    const colorScheme = (_a = useColorScheme()) !== null && _a !== void 0 ? _a : 'light';
    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });
    return (_jsx(ThemedView, { style: styles.container, children: _jsxs(Animated.ScrollView, { ref: scrollRef, scrollEventThrottle: 16, scrollIndicatorInsets: { bottom }, contentContainerStyle: { paddingBottom: bottom }, children: [_jsx(Animated.View, { style: [
                        styles.header,
                        { backgroundColor: headerBackgroundColor[colorScheme] },
                        headerAnimatedStyle,
                    ], children: headerImage }), _jsx(ThemedView, { style: styles.content, children: children })] }) }));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
