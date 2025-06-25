import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';
import { WlbHeader } from 'components/WlbPage';
import { formatTime, useTimer } from 'hooks/useTimer';
import { deleteWorkout, finishWorkout } from 'db/mutation';
import RestTimerModal from 'components/RestTimerModal';

interface WorkoutHeaderProps {
  workout: ReturnType<typeof import('hooks/useWorkout').default>['workout'];
  type: ReturnType<typeof import('hooks/useWorkout').default>['type'];
  flush: ReturnType<typeof import('hooks/useWorkout').default>['flush'];
}

const WorkoutHeader = function WorkoutHeader({
  workout,
  type,
  flush,
}: WorkoutHeaderProps) {
  const timer = useTimer(workout.startedAt, workout.completedAt);

  const title = useMemo(() => {
    if (type === 'active') {
      return formatTime(timer as number, 'digital');
    }
    if (type === 'completed') {
      return 'Edit workout';
    }

    return workout.id ? 'Edit template' : 'New template';
  }, [type, timer, workout.id]);

  const headerRight = useMemo(() => {
    if (type === 'active') {
      return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <RestTimerModal />
          <WlbButton
            title="Finish"
            onPress={() =>
              finishWorkout(workout.id as number).then(() => {
                router.dismissTo('/history');
              })
            }
          />
        </View>
      );
    }

    return (
      <WlbButton
        title="Save"
        onPress={() => {
          flush();
          router.back();
        }}
      />
    );
  }, [type, flush]);

  return (
    <WlbHeader
      title={title}
      headerLeft={
        <WlbButton onPress={() => router.back()} color="subAlt" icon="close" />
      }
      headerRight={headerRight}
    />
  );
};

export default WorkoutHeader;
