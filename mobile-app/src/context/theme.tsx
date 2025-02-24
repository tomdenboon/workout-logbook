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

export const THEMES = {
  light: {
    subAlt: '#f0f0f0',
    background: '#ffffff',
    main: '#4212dd',
    text: '#2c2e31',
    sub: '#646669',
    error: '#F44336',
  },
  monkeytype: {
    subAlt: '#2c2e31',
    background: '#323437',
    main: '#e2b714',
    text: '#d1d0c5',
    sub: '#646669',
    error: '#F44336',
  },
  dracula: {
    background: '#282a36',
    main: '#bd93f9',
    text: '#f8f8f2',
    sub: '#6272a4',
    subAlt: '#20222c',
    error: '#ff5555',
  },
  superuser: {
    background: '#262a33',
    main: '#43ffaf',
    error: '#ff5f5f',
    subAlt: '#1f232c',
    sub: '#526777',
    text: '#e5f7ef',
  },
  bento: {
    background: '#2d394d',
    main: '#ff7a90',
    error: '#ee2a3a',
    subAlt: '#263041',
    sub: '#4a768d',
    text: '#fffaf8',
  },
  nord: {
    background: '#242933',
    main: '#88c0d0',
    error: '#bf616a',
    subAlt: '#2e3440',
    sub: '#929aaa',
    text: '#d8dee9',
  },
} as const;

type ThemeName = keyof typeof THEMES;

const ThemeContext = React.createContext<
  Theme & { setTheme: (theme: ThemeName) => void }
>({
  ...THEMES.light,
  setTheme: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useThemedStyleSheet<
  T extends NamedStyles<any> | NamedStyles<T>,
>(styles: (theme: Omit<Theme, 'setTheme'>) => T, deps: unknown[] = []): T {
  const { setTheme, ...theme } = useTheme();

  return useMemo(() => StyleSheet.create(styles(theme)), [...deps]);
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<ThemeName>('light');

  return (
    <ThemeContext.Provider value={{ ...THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
