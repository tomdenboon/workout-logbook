import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme, useThemedStyleSheet } from '../context/theme';
import React from 'react';
import WlbHeader from './WlbPage';

export default function WlbView({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {children}
    </View>
  );
}
