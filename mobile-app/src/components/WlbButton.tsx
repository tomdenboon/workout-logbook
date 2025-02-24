import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Theme, useTheme, useThemedStyleSheet } from '../context/theme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import WlbText from './WlbText';

export interface WlbButtonProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title?: string;
  size?: 'small' | 'medium';
  variant?: 'error' | 'primary' | 'secondary' | 'text';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  icon,
  onPress,
  size = 'medium',
  variant = 'primary',
  title,
  style,
}: WlbButtonProps) {
  const theme = useTheme();
  const styles = useButtonStyles(variant, size);
  const textColor = {
    primary: 'background',
    secondary: 'text',
    text: 'main',
    error: 'background',
    primaryAlt: 'main',
  }[variant] as keyof Theme;

  const textColorPressed = (pressed: boolean) => {
    if (!pressed) {
      return textColor;
    }
    if (variant === 'text') {
      return 'sub';
    }
    return 'background';
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed &&
          variant !== 'text' && {
            backgroundColor: theme.sub,
          },
      ]}
    >
      {({ pressed }) => {
        return (
          <>
            {icon && (
              <WlbText fontWeight={'700'} color={textColorPressed(pressed)}>
                <MaterialIcons
                  name={icon}
                  size={
                    {
                      small: 20,
                      medium: 28,
                    }[size]
                  }
                />
              </WlbText>
            )}
            {title && (
              <WlbText color={textColorPressed(pressed)} fontWeight={'700'}>
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
  variant: 'error' | 'primary' | 'secondary' | 'text',
  size: 'small' | 'medium',
) =>
  useThemedStyleSheet(
    (theme) => ({
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...(variant !== 'text' && {
          borderRadius: 8,
          height: {
            small: 24,
            medium: 36,
          }[size],
          paddingHorizontal: {
            small: 8,
            medium: 12,
          }[size],
          backgroundColor: {
            primary: theme.main,
            secondary: theme.subAlt,
            error: theme.error,
          }[variant],
        }),
      },
    }),
    [variant, size],
  );
