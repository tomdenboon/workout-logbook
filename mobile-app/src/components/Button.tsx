import { Text, Pressable, StyleSheet } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';

interface ButtonProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'text';
  onPress: () => void;
}

export default function Button({
  title,
  onPress,
  size = 'medium',
  variant = 'primary',
}: ButtonProps) {
  const styles = useButtonStyles(variant, size);

  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const useButtonStyles = (
  variant: 'primary' | 'text',
  size: 'small' | 'medium' | 'large',
) =>
  useThemedStyleSheet(
    (theme) => ({
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: {
          primary: theme.primary,
          text: 'transparent',
        }[variant],
        paddingVertical: {
          small: 8,
          medium: 12,
          large: 16,
        }[size],
        paddingHorizontal: {
          small: 16,
          medium: 24,
          large: 32,
        }[size],
      },
      text: {
        fontWeight: 'bold',
        color: {
          primary: theme.backgroundColor,
          text: theme.primary,
        }[variant],
      },
    }),
    [variant, size],
  );
