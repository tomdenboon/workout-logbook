import { themes } from '.';

export interface Theme {
  surface: string;
  background: string;
  primary: string;
  textDefault: string;
  textLight: string;
}

export const mapTheme = (theme: Theme) => ({
  '--color-primary': theme.primary,
  '--color-text-default': theme.textDefault,
  '--color-text-light': theme.textLight,
  '--color-background': theme.background,
  '--color-surface': theme.surface,
});

export const applyTheme = (theme: keyof typeof themes): void => {
  const themeObject = mapTheme(themes[theme]);
  const root = document.documentElement;

  Object.entries(themeObject).forEach((property) => {
    root.style.setProperty(property[0], property[1]);
  });
};
