import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const FeedListItemBody_Video = ({ videoUrl, description, thumbnail }) => {
    return (_jsxs(View, { children: [_jsx(View, { style: { width: '100%', height: 200, backgroundColor: '#f0f0f0' } }), description && (_jsx(ThemedText, { type: "body", children: description }))] }));
};
