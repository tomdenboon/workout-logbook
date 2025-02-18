import React, { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface Theme {
  main: string;
  background: string;
  text: string;
  sub: string;
  subAlt: string;
  error: string;
}

const THEMES = {
  light: {
    subAlt: '#f0f0f0',
    background: '#ffffff',
    main: '#e2b714', // keeping the main accent color
    text: '#2c2e31', // dark text for light background
    sub: '#646669', // keeping the same sub color
    error: '#F44336', // keeping the same error color
  },
  dark: {
    subAlt: '#2c2e31',
    background: '#323437',
    main: '#e2b714',
    text: '#d1d0c5',
    sub: '#646669',
    error: '#F44336',
  },
} as const;

type ThemeName = keyof typeof THEMES;

const ThemeContext = React.createContext<Theme>(THEMES.dark);

export const useTheme = () => React.useContext(ThemeContext);

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useThemedStyleSheet<
  T extends NamedStyles<any> | NamedStyles<T>,
>(styles: (theme: Theme) => T, deps: unknown[] = []): T {
  const theme = useTheme();

  return useMemo(() => StyleSheet.create(styles(theme)), [...deps]);
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<ThemeName>('light');

  return (
    <ThemeContext.Provider value={THEMES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
};
