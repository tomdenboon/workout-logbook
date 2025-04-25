import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useThemedStyleSheet } from '../context/theme';
import WlbText from './WlbText';

export default function WlbCard({
  title,
  titleRight,
  children,
  style,
  onPress,
}: {
  title: string;
  titleRight?: React.ReactNode;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const styles = useStyles();

  return (
    <Pressable style={({ pressed }) => [styles.card, style]} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 16,
        }}
      >
        <WlbText fontWeight="bold">{title}</WlbText>
        {titleRight && titleRight}
      </View>
      {children}
    </Pressable>
  );
}

const useStyles = () =>
  useThemedStyleSheet((theme) => ({
    card: {
      padding: 16,
      borderRadius: 10,
      borderColor: theme.subAlt,
      borderWidth: 2,
      backgroundColor: theme.bg,
    },
  }));
