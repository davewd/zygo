import { jsx as _jsx } from "react/jsx-runtime";
import { SymbolView } from 'expo-symbols';
export function IconSymbol({ name, size = 24, color, style, weight = 'regular', }) {
    return (_jsx(SymbolView, { weight: weight, tintColor: color, resizeMode: "scaleAspectFit", name: name, style: [
            {
                width: size,
                height: size,
            },
            style,
        ] }));
}
