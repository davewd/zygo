import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Collapsible } from '@zygo/ui/Collapsible';
import { ExternalLink } from '@zygo/ui/ExternalLink';
import { IconSymbol } from '@zygo/ui/IconSymbol';
import ParallaxScrollView from '@zygo/ui/ParallaxScrollView';
import { ThemedText } from '@zygo/ui/ThemedText';
import { ThemedView } from '@zygo/ui/ThemedView';
export default function TabTwoScreen() {
    return (_jsxs(ParallaxScrollView, { headerBackgroundColor: { light: '#D0D0D0', dark: '#353636' }, headerImage: _jsx(IconSymbol, { size: 310, color: "#808080", name: "chevron.left.forwardslash.chevron.right", style: styles.headerImage }), children: [_jsx(ThemedView, { style: styles.titleContainer, children: _jsx(ThemedText, { type: "title", children: "Explore" }) }), _jsx(ThemedText, { children: "This app includes example code to help you get started." }), _jsxs(Collapsible, { title: "File-based routing", children: [_jsxs(ThemedText, { children: ["This app has two screens:", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "app/(tabs)/index.tsx" }), " and", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "app/(tabs)/explore.tsx" })] }), _jsxs(ThemedText, { children: ["The layout file in ", _jsx(ThemedText, { type: "defaultSemiBold", children: "app/(tabs)/_layout.tsx" }), ' ', "sets up the tab navigator."] }), _jsx(ExternalLink, { href: "https://docs.expo.dev/router/introduction", children: _jsx(ThemedText, { type: "link", children: "Learn more" }) })] }), _jsx(Collapsible, { title: "Android, iOS, and web support", children: _jsxs(ThemedText, { children: ["You can open this project on Android, iOS, and the web. To open the web version, press", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "w" }), " in the terminal running this project."] }) }), _jsxs(Collapsible, { title: "Images", children: [_jsxs(ThemedText, { children: ["For static images, you can use the ", _jsx(ThemedText, { type: "defaultSemiBold", children: "@2x" }), " and", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "@3x" }), " suffixes to provide files for different screen densities"] }), _jsx(Image, { source: require('@/assets/images/react-logo.png'), style: { alignSelf: 'center' } }), _jsx(ExternalLink, { href: "https://reactnative.dev/docs/images", children: _jsx(ThemedText, { type: "link", children: "Learn more" }) })] }), _jsxs(Collapsible, { title: "Custom fonts", children: [_jsxs(ThemedText, { children: ["Open ", _jsx(ThemedText, { type: "defaultSemiBold", children: "app/_layout.tsx" }), " to see how to load", ' ', _jsx(ThemedText, { style: { fontFamily: 'SpaceMono' }, children: "custom fonts such as this one." })] }), _jsx(ExternalLink, { href: "https://docs.expo.dev/versions/latest/sdk/font", children: _jsx(ThemedText, { type: "link", children: "Learn more" }) })] }), _jsxs(Collapsible, { title: "Light and dark mode components", children: [_jsxs(ThemedText, { children: ["This template has light and dark mode support. The", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "useColorScheme()" }), " hook lets you inspect what the user's current color scheme is, and so you can adjust UI colors accordingly."] }), _jsx(ExternalLink, { href: "https://docs.expo.dev/develop/user-interface/color-themes/", children: _jsx(ThemedText, { type: "link", children: "Learn more" }) })] }), _jsxs(Collapsible, { title: "Animations", children: [_jsxs(ThemedText, { children: ["This template includes an example of an animated component. The", ' ', _jsx(ThemedText, { type: "defaultSemiBold", children: "components/HelloWave.tsx" }), " component uses the powerful ", _jsx(ThemedText, { type: "defaultSemiBold", children: "react-native-reanimated" }), ' ', "library to create a waving hand animation."] }), Platform.select({
                        ios: (_jsxs(ThemedText, { children: ["The ", _jsx(ThemedText, { type: "defaultSemiBold", children: "components/ParallaxScrollView.tsx" }), ' ', "component provides a parallax effect for the header image."] })),
                    })] })] }));
}
const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
