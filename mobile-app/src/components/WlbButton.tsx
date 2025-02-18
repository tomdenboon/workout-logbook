import { Text, Pressable, StyleSheet, View } from 'react-native';
import { Theme, useThemedStyleSheet } from '../context/theme';
import { children } from '@nozbe/watermelondb/decorators';
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import React from 'react';
import WlbText from './WlbText';

interface ButtonProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title?: string;
  size?: 'small' | 'medium';
  variant?: 'error' | 'primary' | 'secondary' | 'text';
  onPress: () => void;
}

export default function Button({
  icon,
  onPress,
  size = 'medium',
  variant = 'primary',
  title,
}: ButtonProps) {
  const styles = useButtonStyles(variant, size);
  const textColor = {
    primary: 'background',
    secondary: 'text',
    text: 'main',
    error: 'background',
  }[variant] as keyof Theme;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && {
          opacity: 0.5,
        },
      ]}
    >
      {icon && (
        <WlbText fontWeight={'700'} color={textColor}>
          <MaterialIcons
            name={icon}
            size={
              {
                small: 20,
                medium: 28,
              }[size]
            }
            style={{}}
          />
        </WlbText>
      )}
      {title && (
        <WlbText color={textColor} fontWeight={'700'}>
          {title}
        </WlbText>
      )}
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
