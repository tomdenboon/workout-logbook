import React from 'react';
import WlbModal from 'components/WlbModal';
import WlbText from 'components/WlbText';
import WlbButton from 'components/WlbButton';
import { View } from 'react-native';
import { useThemedStyleSheet } from 'context/theme';
import { Workout } from 'db/types';

interface ActiveWorkoutModalProps {
  visible: boolean;
  close: () => void;
  onConfirm: () => void;
}

export default function ActiveWorkoutModal({
  visible,
  close,
  onConfirm,
}: ActiveWorkoutModalProps) {
  return (
    <WlbModal visible={visible} close={close}>
      <View style={{ padding: 12, gap: 12 }}>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <WlbText size={20} fontWeight="bold">
            Active Workout Detected
          </WlbText>
          <View style={{ alignItems: 'center' }}>
            <WlbText>
              You have an active workout in progress. Starting a new workout
              will discard your current progress.
            </WlbText>
          </View>
          <View style={{ alignItems: 'center' }}>
            <WlbText color="sub">Are you sure you want to continue?</WlbText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <WlbButton
            title="Cancel"
            onPress={close}
            color="subAlt"
            style={{ flex: 1 }}
          />
          <WlbButton
            title="Start New Workout"
            onPress={() => {
              onConfirm();
              close();
            }}
            color="main"
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </WlbModal>
  );
}
