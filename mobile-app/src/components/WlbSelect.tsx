import useMeasureLayout from 'components/graphs/useMeasureLayout';
import WlbButton from 'components/WlbButton';
import WlbDropdown from 'components/WlbDropdown';
import WlbInput from 'components/WlbInput';
import WlbText from 'components/WlbText';
import { useTheme } from 'context/theme';
import React, { useRef, useState } from 'react';
import { Modal, Pressable, TextInput, View } from 'react-native';

export default function WlbSelect<T>({
  value,
  size = 'medium',
  onChange,
  options,
}: {
  value: T;
  size?: 'small' | 'medium';
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
}) {
  const theme = useTheme();

  return (
    <WlbDropdown
      triggerComponent={({ onPress }) => (
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.subAlt,
            borderRadius: 8,
            paddingHorizontal: 8,
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: pressed ? theme.text : 'transparent',
            paddingVertical: 0,
            height: {
              small: 24,
              medium: 36,
            }[size],
          })}
          onPress={onPress}
        >
          <WlbText>
            {options.find((option) => option.value === value)?.label ??
              'Select'}
          </WlbText>
        </Pressable>
      )}
      options={options.map((option) => ({
        label: option.label,
        onPress: () => {
          onChange(option.value);
        },
        highlighted: option.value === value,
      }))}
    />
  );
}
