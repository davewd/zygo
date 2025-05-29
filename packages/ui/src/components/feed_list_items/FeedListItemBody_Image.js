import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const FeedListItemBody_Image = ({ imageUrl, description }) => {
    return (_jsxs(View, { children: [imageUrl && (_jsx(Image, { source: { uri: imageUrl }, style: { width: '100%', height: 200 }, resizeMode: "cover" })), description && (_jsx(ThemedText, { type: "body", children: description }))] }));
};
