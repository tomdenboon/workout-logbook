import React from 'react';
import { View } from 'react-native';
import { WlbHeader, WlbModalPage } from 'components/WlbPage';
import WlbButton from 'components/WlbButton';
import WlbText from 'components/WlbText';
import WorkoutStatsRow from './WorkoutStatsRow';
import WorkoutExerciseList from './WorkoutExerciseList';
import { WorkoutFull } from 'db/types';

interface PR {
  badgeType: string;
  exerciseRowId: number;
}

interface WorkoutDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  workoutDetails: WorkoutFull | null;
  prs: PR[];
  totalVolume: number;
}

export default function WorkoutDetailsModal({
  visible,
  onClose,
  workoutDetails,
  prs,
  totalVolume,
}: WorkoutDetailsModalProps) {
  if (!workoutDetails) return null;

  const completedDate = new Date(workoutDetails.completedAt as number);

  const formatDate = () => {
    return completedDate.toLocaleTimeString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <WlbModalPage
      visible={visible}
      close={onClose}
      header={
        <WlbHeader
          title={workoutDetails.name}
          headerLeft={
            <WlbButton
              color="subAlt"
              icon="close"
              size="small"
              onPress={onClose}
            />
          }
          headerBottom={
            <View style={{ gap: 8 }}>
              <WlbText color="sub">{formatDate()}</WlbText>
              <WorkoutStatsRow
                startedAt={workoutDetails.startedAt}
                completedAt={workoutDetails.completedAt}
                totalVolume={totalVolume}
                prCount={prs.length}
              />
              {workoutDetails.note && (
                <WlbText color="sub">{workoutDetails.note}</WlbText>
              )}
            </View>
          }
        />
      }
    >
      <WorkoutExerciseList
        exerciseGroups={workoutDetails.exerciseGroups}
        prs={prs}
      />
    </WlbModalPage>
  );
}
