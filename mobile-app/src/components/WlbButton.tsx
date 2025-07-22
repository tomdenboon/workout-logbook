import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Theme, useTheme, useThemedStyleSheet } from '../context/theme';
import React from 'react';
import WlbText from './WlbText';
import WlbIcon, { WlbIconName } from 'components/WlbIcon';

export interface WlbButtonProps {
  icon?: WlbIconName;
  title?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'ghost';
  color?: Exclude<keyof Theme, 'bg'>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  icon,
  onPress,
  size = 'medium',
  variant = 'filled',
  color = 'main',
  title,
  style,
}: WlbButtonProps) {
  const theme = useTheme();
  const styles = useButtonStyles(variant, color, size);

  const textColorPressed = (pressed: boolean) => {
    if (!pressed) {
      if (variant === 'ghost' || variant === 'outlined') {
        return color;
      } else if (variant === 'filled' && color === 'subAlt') {
        return 'text';
      } else {
        return 'bg';
      }
    } else {
      if (variant === 'filled') {
        return 'bg';
      }

      return 'sub';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed &&
          variant === 'filled' && {
            backgroundColor: theme.sub,
          },
        pressed &&
          variant === 'outlined' && {
            borderColor: theme.sub,
          },
      ]}
    >
      {({ pressed }) => {
        return (
          <>
            {icon && (
              <WlbIcon
                name={icon}
                color={textColorPressed(pressed)}
                size={
                  {
                    small: 20,
                    medium: 28,
                  }[size]
                }
              />
            )}
            {title && (
              <WlbText color={textColorPressed(pressed)} fontWeight={'500'}>
                {title}
              </WlbText>
            )}
          </>
        );
      }}
    </Pressable>
  );
}

const useButtonStyles = (
  variant: 'outlined' | 'filled' | 'ghost',
  color: keyof Theme,
  size: 'small' | 'medium',
) =>
  useThemedStyleSheet(
    (theme) => ({
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...(variant === 'ghost' && {
          backgroundColor: 'transparent',
        }),
        ...(variant === 'outlined' && {
          borderWidth: 2,
          borderColor: theme.subAlt,
        }),
        ...((variant === 'filled' || variant === 'outlined') && {
          borderRadius: 8,
          height: {
            small: 24,
            medium: 36,
          }[size],
          paddingHorizontal: {
            small: 8,
            medium: 12,
          }[size],
        }),
        ...(variant === 'outlined' && {
          borderColor: {
            main: theme.main,
            sub: theme.sub,
            subAlt: theme.subAlt,
            bg: theme.bg,
            text: theme.text,
            error: theme.error,
          }[color],
          backgroundColor: {
            main: theme.bg,
            sub: theme.bg,
            subAlt: theme.bg,
            bg: theme.bg,
            text: theme.bg,
            error: theme.bg,
          }[color],
        }),
        ...(variant === 'filled' && {
          backgroundColor: {
            error: theme.error,
            main: theme.main,
            sub: theme.sub,
            subAlt: theme.subAlt,
            bg: theme.bg,
            text: theme.text,
          }[color],
        }),
      },
    }),
    [color, size, variant],
  );
