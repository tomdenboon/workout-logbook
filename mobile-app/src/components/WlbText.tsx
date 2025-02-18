import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Theme, useThemedStyleSheet } from '../context/theme';

interface WlbTextProps {
  children: React.ReactNode;
  size?: number;
  color?: keyof Theme;
  fontWeight?: TextStyle['fontWeight'];
}

const WlbText: React.FC<WlbTextProps> = ({
  children,
  size,
  color,
  fontWeight,
}) => {
  const themedStyles = useThemedStyleSheet(
    (theme) => ({
      text: {
        color: theme[color ?? 'text'],
        fontSize: size ?? 16,
        fontWeight: fontWeight ?? 'normal',
      },
    }),
    [color, size, fontWeight],
  );

  return <Text style={themedStyles.text}>{children}</Text>;
};

export default WlbText;
