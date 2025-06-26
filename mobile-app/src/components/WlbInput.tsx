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
    error?: boolean;
    showSoftInputOnFocus?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    onSelectionChange?: TextInputProps['onSelectionChange'];
    onLayout?: TextInputProps['onLayout'];
    editable?: boolean;
    multiline?: boolean;
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
      onLayout,
      error,
      multiline = false,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);

    return (
      <TextInput
        ref={ref}
        multiline={multiline}
        selectionColor={theme.main}
        selectionHandleColor={theme.main}
        keyboardType={keyboardType}
        showSoftInputOnFocus={showSoftInputOnFocus}
        onSelectionChange={onSelectionChange}
        onPressIn={onPress}
        editable={editable}
        onLayout={onLayout}
        style={[
          {
            backgroundColor: theme.subAlt,
            color: theme.text,
            borderRadius: 8,
            padding: 8,
            borderColor: error
              ? theme.error
              : focused
              ? theme.text
              : 'transparent',
            fontSize: 16,
            borderWidth: 2,
            paddingVertical: multiline ? 8 : 0,
            height: multiline
              ? undefined
              : {
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
