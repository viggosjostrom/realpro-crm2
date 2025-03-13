/**
 * Utility functions for working with colors and ensuring accessibility
 */

/**
 * Ensures a color has sufficient contrast for accessibility
 * Instead of using opacity which can lead to contrast issues,
 * this function provides accessible background colors for avatars
 * 
 * @param color The main color (usually from theme.palette)
 * @param isBackground Whether this is for background (true) or foreground (false)
 * @returns A color with sufficient contrast
 */
export const getAccessibleColor = (color: string, isBackground = true): string => {
  // Map of main colors to accessible background/foreground pairs
  const accessibleColorMap: Record<string, { bg: string, fg: string }> = {
    // Primary blues
    '#1a56db': { bg: '#e6eeff', fg: '#0f3784' }, // Primary main
    '#3b82f6': { bg: '#e6f0ff', fg: '#1e429f' }, // Primary light
    '#1e429f': { bg: '#e6eeff', fg: '#0f2b6b' }, // Primary dark
    
    // Secondary greens
    '#047857': { bg: '#e6f7f2', fg: '#065f46' }, // Secondary main
    '#10b981': { bg: '#e6f9f4', fg: '#065f46' }, // Secondary light
    '#065f46': { bg: '#e6f7f2', fg: '#064e3b' }, // Secondary dark
    
    // Error reds
    '#b91c1c': { bg: '#fee2e2', fg: '#991b1b' }, // Error main
    '#ef4444': { bg: '#fee2e2', fg: '#b91c1c' }, // Error light
    '#991b1b': { bg: '#fee2e2', fg: '#7f1d1d' }, // Error dark
    
    // Warning oranges
    '#92400e': { bg: '#fff7ed', fg: '#78350f' }, // Warning main
    '#f59e0b': { bg: '#fff7ed', fg: '#92400e' }, // Warning light
    '#78350f': { bg: '#fff7ed', fg: '#633009' }, // Warning dark
    
    // Info blues
    '#1e40af': { bg: '#e6eeff', fg: '#1e3a8a' }, // Info main
    '#60a5fa': { bg: '#e6f0ff', fg: '#1e429f' }, // Info light (changed from 3b82f6)
    '#1e3a8a': { bg: '#e6eeff', fg: '#172554' }, // Info dark
    
    // Success greens
    '#047c4b': { bg: '#e6f7f2', fg: '#064e3b' }, // Success main (changed from 065f46)
    '#34d399': { bg: '#e6f9f4', fg: '#065f46' }, // Success light (changed from 10b981)
    '#064e3b': { bg: '#e6f7f2', fg: '#053e31' }, // Success dark
  };
  
  // If the exact color is in our map, use it
  if (accessibleColorMap[color]) {
    return isBackground ? accessibleColorMap[color].bg : accessibleColorMap[color].fg;
  }
  
  // Default fallbacks for unknown colors
  if (isBackground) {
    return '#e6eeff'; // Light blue background with good contrast
  } else {
    return '#0f3784'; // Dark blue text with good contrast
  }
};

/**
 * Creates an accessible avatar style object with proper contrast
 * 
 * @param color The main color to base the avatar on
 * @returns Style object for the avatar
 */
export const getAccessibleAvatarStyle = (color: string) => {
  return {
    bgcolor: getAccessibleColor(color, true),
    color: getAccessibleColor(color, false),
  };
}; 