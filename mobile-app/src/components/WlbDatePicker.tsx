import { size } from '@shopify/react-native-skia';
import WlbCalendar from 'components/WlbCalendar';
import WlbModal from 'components/WlbModal';

import { WlbModalPage } from 'components/WlbPage';
import WlbText from 'components/WlbText';
import { useTheme } from 'context/theme';
import { useState } from 'react';
import { Pressable } from 'react-native';

interface WlbDatePickerProps {
  value: Date;
  onChange: (date: Date | undefined) => void;
  size?: 'small' | 'medium';
}

export default function WlbDatePicker({
  value,
  onChange,
  size = 'medium',
}: WlbDatePickerProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
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
        onPress={() => setIsOpen(true)}
      >
        <WlbText>{formatDate(value)}</WlbText>
      </Pressable>

      <WlbModal visible={isOpen} close={() => setIsOpen(false)}>
        <WlbCalendar
          onDateSelect={(date) => {
            onChange(date);
            setIsOpen(false);
          }}
          selectedDate={value}
        />
      </WlbModal>
    </>
  );
}
