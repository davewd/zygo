import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pressable, View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const FeedListItemBody_Link = ({ url, title, description, }) => {
    return (_jsx(Pressable, { children: _jsxs(View, { children: [_jsx(ThemedText, { type: "subtitle", children: title }), _jsx(ThemedText, { type: "body", children: description }), _jsx(ThemedText, { type: "caption", children: url })] }) }));
};
