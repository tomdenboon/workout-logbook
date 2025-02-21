import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme, useThemedStyleSheet } from '../context/theme';
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
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      style={[
        {
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
        style,
      ]}
      value={value}
      placeholderTextColor={theme.sub}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
