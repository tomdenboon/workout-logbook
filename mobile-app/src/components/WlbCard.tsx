import React from 'react';
import { View, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../context/theme';
import WlbText from './WlbText';

export default function WlbCard({
  title,
  titleRight,
  children,
  style,
  onPress,
}: {
  title?: string;
  titleRight?: React.ReactNode;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          padding: 12,
          borderRadius: 10,
          borderColor: pressed && onPress ? theme.sub : theme.subAlt,
          borderWidth: 1,
          backgroundColor: theme.bg,
        },
        style,
      ]}
      onPress={onPress}
    >
      {title && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 12,
          }}
        >
          <WlbText fontWeight="bold">{title}</WlbText>
          {titleRight && titleRight}
        </View>
      )}
      {children}
    </Pressable>
  );
}
