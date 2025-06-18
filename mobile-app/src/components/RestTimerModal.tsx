import React, { useState } from 'react';
import { View } from 'react-native';
import WlbText from './WlbText';
import WlbButton from './WlbButton';
import { formatTime } from 'hooks/useTimer';
import { WlbModalPage, WlbHeader } from 'components/WlbPage';
import { useRestTimer } from 'context/restTimer';

interface RestTimerModalProps {}

export default function RestTimerModal({}: RestTimerModalProps) {
  const {
    defaultRestTime,
    timeRemaining,
    startTimer,
    stopTimer,
    adjustTimer,
    isActive,
  } = useRestTimer();

  const [restTimerModalVisible, setRestTimerModalVisible] = useState(false);
  const displayTime = isActive ? timeRemaining : defaultRestTime;

  return (
    <>
      <WlbButton
        color="subAlt"
        icon="timer"
        onPress={() => setRestTimerModalVisible(true)}
      />
      <WlbModalPage
        visible={restTimerModalVisible}
        close={() => setRestTimerModalVisible(false)}
        header={
          <WlbHeader
            title="Rest Timer"
            headerLeft={
              <WlbButton
                icon="close"
                onPress={() => setRestTimerModalVisible(false)}
                color="subAlt"
              />
            }
          />
        }
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <WlbText size={48} fontWeight="bold" color="text">
            {formatTime(displayTime * 1000, 'digital')}
          </WlbText>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <WlbButton
              variant="ghost"
              title="-15s"
              onPress={() => adjustTimer(-15)}
            />
            <WlbButton
              variant="ghost"
              title="+15s"
              onPress={() => adjustTimer(15)}
            />
          </View>
        </View>

        <WlbButton
          color={isActive ? 'error' : 'subAlt'}
          title={isActive ? 'Cancel' : 'Start'}
          onPress={() => (isActive ? stopTimer() : startTimer())}
        />
      </WlbModalPage>
    </>
  );
}
