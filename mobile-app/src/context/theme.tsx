import { THEMES } from 'const';
import { useSetting } from 'hooks/useSetting';
import React, { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface Theme {
  main: string;
  bg: string;
  text: string;
  sub: string;
  subAlt: string;
  error: string;
}

export type ThemeName = keyof typeof THEMES;

export const ThemeContext = React.createContext<Theme & { theme: ThemeName }>({
  ...THEMES.nord,
  theme: 'nord',
});

export const useTheme = () => React.useContext(ThemeContext);

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useThemedStyleSheet<
  T extends NamedStyles<any> | NamedStyles<T>,
>(styles: (theme: Theme) => T, deps: unknown[] = []): T {
  const theme = useTheme();

  return useMemo(() => StyleSheet.create(styles(theme)), [...deps, theme]);
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSetting<ThemeName>('theme', 'serika_dark');

  return (
    <ThemeContext.Provider
      value={{
        ...THEMES[theme],
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const defaultLightTheme: ThemeName = 'rose_pine_dawn';
const defaultDarkTheme: ThemeName = 'serika_dark';
