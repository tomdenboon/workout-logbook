import React, { useMemo, memo, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';
import { WlbHeader } from 'components/WlbPage';
import { formatTime, useTimer } from 'hooks/useTimer';
import { deleteWorkout, finishWorkout } from 'db/mutation';
import RestTimerModal from 'components/RestTimerModal';
import { useRestTimer } from 'context/restTimer';
import { useTheme } from 'context/theme';

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
  const { isActive, timeRemaining, timerDuration } = useRestTimer();
  const theme = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      const progress = (timerDuration - timeRemaining) / timerDuration;
      anim.setValue(progress);
      Animated.timing(anim, {
        toValue: 1,
        duration: timerDuration * 1000 * (1 - progress),
        useNativeDriver: false,
      }).start();
    }
  }, [isActive, timerDuration]);

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
    <View>
      <WlbHeader
        title={title}
        headerLeft={
          <WlbButton
            onPress={() => router.back()}
            color="subAlt"
            icon="close"
          />
        }
        headerRight={headerRight}
      />

      {type === 'active' && isActive && (
        <View
          style={{
            height: 4,
            backgroundColor: theme.sub,
          }}
        >
          <Animated.View
            style={{
              height: 4,
              backgroundColor: theme.main,
              width: anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>
      )}
    </View>
  );
};

export default WorkoutHeader;
