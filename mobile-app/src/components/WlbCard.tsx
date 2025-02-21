import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';
import WlbText from './WlbText';

export default function WlbCard({
  title,
  content,
  onPress,
}: {
  title: string;
  content: string;
  onPress: () => void;
}) {
  const styles = useStyles();

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.5 : 1 }]}
      onPress={onPress}
    >
      <WlbText fontWeight="bold">{title}</WlbText>
    </Pressable>
  );
}

const useStyles = () =>
  useThemedStyleSheet((theme) => ({
    card: {
      padding: 20,
      borderRadius: 10,
      borderColor: theme.subAlt,
      borderWidth: 2,
      backgroundColor: theme.background,
    },
  }));
