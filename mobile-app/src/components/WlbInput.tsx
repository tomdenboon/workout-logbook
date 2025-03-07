import React, { forwardRef } from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { useTheme } from '../context/theme';
import { useState } from 'react';

export default forwardRef<
  TextInput,
  {
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    style?: StyleProp<TextStyle>;
    size?: 'small' | 'medium';
    onPress?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    showSoftInputOnFocus?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    onSelectionChange?: TextInputProps['onSelectionChange'];
    editable?: boolean;
  }
>(
  (
    {
      value,
      onChangeText,
      placeholder,
      style,
      size = 'medium',
      onFocus,
      onBlur,
      showSoftInputOnFocus = true,
      onSelectionChange,
      keyboardType,
      editable = true,
      onPress,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);

    return (
      <TextInput
        ref={ref}
        selectionColor={theme.main}
        selectionHandleColor={theme.main}
        keyboardType={keyboardType}
        showSoftInputOnFocus={showSoftInputOnFocus}
        onSelectionChange={onSelectionChange}
        onPressIn={onPress}
        editable={editable}
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
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
      />
    );
  },
);
