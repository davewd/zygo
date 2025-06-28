import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the current device is mobile-sized (React Native version)
 *
 * Uses React Native's Dimensions API to detect screen width changes and
 * returns a boolean indicating whether the current device width is below
 * the mobile breakpoint (768px).
 *
 * @returns {boolean} True if device width is less than 768px, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useIsMobile()
 *
 *   return (
 *     <View style={isMobile ? mobileStyles : desktopStyles}>
 *       <Text>Content</Text>
 *     </View>
 *   )
 * }
 * ```
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const updateIsMobile = () => {
      const { width } = Dimensions.get('window');
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    // Set initial value
    updateIsMobile();

    // Listen for dimension changes
    const subscription = Dimensions.addEventListener('change', updateIsMobile);

    return () => subscription?.remove();
  }, []);

  return !!isMobile;
}
