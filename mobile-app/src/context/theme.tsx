import React, { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Theme {
  primary: string;
  backgroundColor: string;
  color: string;
}

const THEMES = {
  light: {
    primary: '#0000FF',
    backgroundColor: '#fff',
    color: '#000',
  },
  dark: {
    primary: '#000',
    backgroundColor: '#000',
    color: '#fff',
  },
} as const;

type ThemeName = keyof typeof THEMES;

const ThemeContext = React.createContext<Theme>(THEMES.light);

const useTheme = () => React.useContext(ThemeContext);

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
