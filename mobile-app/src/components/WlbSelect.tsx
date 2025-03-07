import WlbInput from 'components/WlbInput';
import WlbText from 'components/WlbText';
import { useTheme } from 'context/theme';
import React, { useRef, useState } from 'react';
import { Modal, Pressable, TextInput, View } from 'react-native';

export default function WlbSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  return (
    <View>
      <View ref={inputRef}>
        <WlbInput
          placeholder="Select"
          value={value}
          editable={false}
          onChangeText={() => {}}
          onPress={() => setVisible(!visible)}
        />
      </View>
      {visible && (
        <View
          style={{
            width: '100%',
            marginTop: 8,
            borderRadius: 8,
            bottom: 0,
            borderWidth: 1,
            borderColor: theme.subAlt,
            backgroundColor: theme.bg,
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <Pressable
              key={option.label}
              onPress={() => {
                onChange(option.value);
                setVisible(false);
              }}
              style={{
                backgroundColor:
                  value === option.value ? theme.subAlt : 'transparent',
                padding: 8,
              }}
            >
              <WlbText>{option.label}</WlbText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
