import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from 'expo-image';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
export function Header() {
    return (_jsxs(ThemedView, { style: styles.header, children: [_jsx(Image, { source: { uri: "../assets/images/example_copy/sample-avatar-001.jpg" }, style: styles.avatar }), _jsx(View, { style: styles.searchContainer, children: _jsx(TextInput, { style: styles.searchInput, placeholder: "Search...", placeholderTextColor: "#536471" }) }), _jsx(View, { style: styles.notificationContainer, children: _jsxs(Pressable, { children: [_jsx(IconSymbol, { name: "bell.fill" // You'll need to add this mapping to IconSymbol.tsx
                            , size: 24, color: "#1D9BF0" }), _jsx(View, { style: styles.badge, children: _jsx(ThemedText, { style: styles.badgeText, children: "3" }) })] }) })] }));
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e8ed',
        height: 60,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    searchContainer: {
        flex: 1,
        marginHorizontal: 12,
    },
    searchInput: {
        backgroundColor: '#EFF3F4',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
    },
    notificationContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#F91880',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
