import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';

export default function WlbCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
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
    title: {
      fontSize: 18,
      color: theme.text,
      fontWeight: 'bold',
    },
    content: {
      fontSize: 14,
    },
  }));
