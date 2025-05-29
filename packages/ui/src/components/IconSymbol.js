import { jsx as _jsx } from "react/jsx-runtime";
// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
    'house.fill': 'home',
    'person.3.fill': 'people-alt',
    'plus.rectangle.fill.on.rectangle.fill': 'library-add',
    'wrench.and.screwdriver.fill': 'build',
    'clock.fill': 'access-time',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
};
/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ name, size = 24, color, style, }) {
    return _jsx(MaterialIcons, { color: color, size: size, name: MAPPING[name], style: style });
}
