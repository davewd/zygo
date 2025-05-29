import { jsx as _jsx } from "react/jsx-runtime";
import { View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const FeedListItemBody_Text = ({ description }) => {
    return (_jsx(View, { children: _jsx(ThemedText, { type: "body", children: description }) }));
};
