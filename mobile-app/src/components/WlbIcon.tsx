import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'context/theme';
import React from 'react';

export type WlbIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function WlbIcon({
  name,
  size = 24,
}: {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
}) {
  const theme = useTheme();
  return <MaterialCommunityIcons name={name} color={theme.text} size={size} />;
}
