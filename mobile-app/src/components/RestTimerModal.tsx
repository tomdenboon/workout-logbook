import React, { useState } from 'react';
import { View } from 'react-native';
import WlbModal from './WlbModal';
import WlbText from './WlbText';
import WlbButton from './WlbButton';
import { useThemedStyleSheet } from 'context/theme';
import { useSetting } from 'hooks/useSetting';
import { setSetting } from 'db/mutation';
import { useRestTimer } from 'context/restTimer';
import { formatTime } from 'hooks/useTimer';
import { WlbModalPage } from 'components/WlbPage';

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
        variant="secondary"
        icon="timer"
        onPress={() => setRestTimerModalVisible(true)}
      />
      <WlbModalPage
        title="Rest Timer"
        visible={restTimerModalVisible}
        close={() => setRestTimerModalVisible(false)}
        headerLeft={
          <WlbButton
            icon="close"
            onPress={() => setRestTimerModalVisible(false)}
            variant="secondary"
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
              variant="text"
              title="-15s"
              onPress={() => adjustTimer(-15)}
            />
            <WlbButton
              variant="text"
              title="+15s"
              onPress={() => adjustTimer(15)}
            />
          </View>
        </View>

        <WlbButton
          variant={isActive ? 'error' : 'primary'}
          title={isActive ? 'Cancel' : 'Start'}
          onPress={() => (isActive ? stopTimer() : startTimer())}
        />
      </WlbModalPage>
    </>
  );
}
