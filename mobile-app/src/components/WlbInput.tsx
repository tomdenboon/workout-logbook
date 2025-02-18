import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useThemedStyleSheet } from '../context/theme';
import { useState } from 'react';

export default function WlbInput({
  value,
  onChangeText,
  placeholder,
  style,
  size = 'medium',
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  size?: 'small' | 'medium';
}) {
  const [focused, setFocused] = useState(false);
  const styles = useThemedStyleSheet(
    (theme) => ({
      input: {
        backgroundColor: theme.subAlt,
        color: theme.text,
        borderRadius: 8,
        padding: 8,
        borderColor: focused ? theme.text : 'transparent',
        fontSize: 16,
        borderWidth: 2,
        paddingVertical: 0,
        height: {
          small: 24,
          medium: 36,
        }[size],
      },
    }),
    [focused, size],
  );

  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
