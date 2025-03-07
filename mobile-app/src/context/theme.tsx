import { THEMES } from 'context/themes';
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

export const ThemeContext = React.createContext<
  Theme & { setTheme: (theme: ThemeName) => void; theme: ThemeName }
>({
  ...THEMES.nord,
  theme: 'nord',
  setTheme: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useThemedStyleSheet<
  T extends NamedStyles<any> | NamedStyles<T>,
>(styles: (theme: Omit<Theme, 'setTheme'>) => T, deps: unknown[] = []): T {
  const { setTheme, ...theme } = useTheme();

  return useMemo(() => StyleSheet.create(styles(theme)), [...deps, theme]);
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<ThemeName>('nord');

  return (
    <ThemeContext.Provider
      value={{
        ...THEMES[theme],
        setTheme: (theme: ThemeName) => setTheme(theme),
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
