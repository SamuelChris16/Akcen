/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const COLORS = {
  logoBlue: '#5C8BC0',
  textDark: '#333333',

  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  
  // Backgrounds
  bgHome: '#E9ECF0', 
  bgBelajar: '#E3F1E1',
  bgTutor: '#E1EAF5',
  bgKelas: '#FFF9E3',
  
  // Tabs
  tabHome: '#E6E6E6',
  tabBelajar: '#9CC589',
  tabTutor: '#5C8BC0',
  tabKelas: '#FCEFB4',
  
  btnLogin: '#90C583',
  textWhite: '#FFFFFF',

  // --- ADDITIONS FOR NEW LAYOUT (Aliases) ---
  // These map to your existing colors so the new index.tsx works
  primary: '#5C8BC0',   // Maps to logoBlue
  secondary: '#333333', // Maps to textDark
  accent: '#FCEFB4',    // Maps to tabKelas (Yellow)
  bgWhite: '#FFFFFF',   // Maps to textWhite
  
  text: {
    dark: '#333333',
    blue: '#5C8BC0',
    white: '#FFFFFF',
  }
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// --- NEW MODULAR CONSTANTS ---

// Typography Constants (Sizes & Weights)
export const FONTS = {
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    heavy: '900' as const,
  },
  sizes: {
    hero: { mobile: 48, desktop: 84 },
    subHero: { mobile: 32, desktop: 52 },
    tagline: { mobile: 12, desktop: 18 },
    button: { mobile: 16, desktop: 18 },
  },
  lineHeights: {
    hero: { mobile: 54, desktop: 90 },
  }
};

// Layout & Spacing
export const SPACING = {
  s: 10,
  m: 20,
  l: 40,
  xl: 50,
  containerMax: 1200,
};

// UI Elements (Shadows, Radius)
export const UI = {
  radius: {
    pill: 50,
    card: 30,
  },
  shadows: {
    default: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    }
  }
};