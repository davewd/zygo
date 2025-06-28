import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * 
 * This utility function combines clsx for conditional class handling with
 * tailwind-merge for intelligent Tailwind CSS class merging, preventing
 * conflicts and ensuring proper CSS specificity.
 * 
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns A single string of merged class names
 * 
 * @example
 * ```ts
 * cn('px-2 py-1', isActive && 'bg-blue-500', { 'text-white': isActive })
 * // Returns: "px-2 py-1 bg-blue-500 text-white"
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
