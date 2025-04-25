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
  return (
    <WlbDropdown
      triggerComponent={({ onPress }) => (
        <WlbButton
          variant="secondary"
          size={size}
          title={
            options.find((option) => option.value === value)?.label ?? 'Select'
          }
          onPress={onPress}
        />
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
