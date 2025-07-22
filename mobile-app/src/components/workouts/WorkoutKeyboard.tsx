import React, { useState, memo, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WlbButton from 'components/WlbButton';
import { useTheme } from 'context/theme';
import { keyboardEmitter, useKeyboardEvent } from 'context/keyboard';
import { ExerciseField } from 'db/types';

const WorkoutKeyboard = function WorkoutKeyboard() {
  const theme = useTheme();
  const [isRpeMode, setIsRpeMode] = useState(false);
  const [field, setField] = useState<ExerciseField>();

  useKeyboardEvent('focusKeyboard', setField);

  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''];

  return field ? (
    <SafeAreaView
      edges={['bottom']}
      style={{
        padding: 8,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: theme.subAlt,
        backgroundColor: theme.bg,
      }}
    >
      <View style={{ gap: 8, flexDirection: 'row' }}>
        <WlbButton
          color="subAlt"
          icon="keyboard"
          size="small"
          style={{ flex: 1, height: 40 }}
          onPress={() => keyboardEmitter.emit('onBlur')}
        />
        {field === 'weight' && (
          <WlbButton
            color="subAlt"
            size="small"
            icon="format-line-weight"
            style={{ flex: 1, height: 40 }}
            onPress={() => keyboardEmitter.emit('onNext')}
          />
        )}
        {field === 'reps' && (
          <WlbButton
            color="subAlt"
            title={'RPE'}
            size="small"
            style={{ flex: 1, height: 40 }}
            onPress={() => setIsRpeMode((prev) => !prev)}
          />
        )}
        <WlbButton
          color="main"
          title="Next"
          size="small"
          style={{ flex: 1, height: 40 }}
          onPress={() => keyboardEmitter.emit('onNext')}
        />
      </View>

      {[0, 1, 2, 3].map((row) => (
        <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
          {inputs.slice(row * 3, row * 3 + 3).map((digit) => (
            <WlbButton
              key={digit}
              size="small"
              style={{ height: 48, flex: 1 }}
              variant="ghost"
              color="text"
              {...(digit === ''
                ? {
                    icon: 'backspace',
                  }
                : {
                    title: digit,
                  })}
              onPress={() => {
                keyboardEmitter.emit('onKeyPress', digit);
              }}
            />
          ))}
        </View>
      ))}
    </SafeAreaView>
  ) : null;
};

export default WorkoutKeyboard;
