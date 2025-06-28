import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme, useTheme } from 'context/theme';
import React from 'react';

export type WlbIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function WlbIcon({
  color = 'text',
  name,
  size = 24,
}: {
  color?: keyof Theme;
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
}) {
  const theme = useTheme();
  return (
    <MaterialCommunityIcons name={name} color={theme[color]} size={size} />
  );
}
