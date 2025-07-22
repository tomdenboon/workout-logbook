import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import WlbInput from 'components/WlbInput';
import { WlbScreenPage } from 'components/WlbPage';
import useWorkout from 'hooks/useWorkout';
import WlbText from 'components/WlbText';
import { deleteWorkout, finishWorkout } from 'db/mutation';
import { useTheme } from 'context/theme';
import WlbTimer from 'components/WlbTimer';
import ExercisePage from 'components/exercises/ExercisePage';
import WlbButton from 'components/WlbButton';
import WorkoutHeader from 'components/workouts/WorkoutHeader';
import ExerciseGroup from 'components/workouts/ExerciseGroup';
import WorkoutKeyboard from 'components/workouts/WorkoutKeyboard';
import PhotoPicker from 'components/PhotoPicker';
import { useValidation } from 'hooks/useEmptyValidation';

export default function Workout() {
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const {
    workout,
    type,
    updateWorkout,
    addExerciseRow,
    addExerciseGroups,
    deleteExerciseRow,
    deleteExerciseGroup,
    updateExerciseRow,
    flush,
    waitForData,
  } = useWorkout();
  const theme = useTheme();
  const { validate, hasError } = useValidation(workout, ['name']);

  if (waitForData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.bg,
        }}
      >
        <WlbText>Loading...</WlbText>
      </View>
    );
  }

  return (
    <>
      <WlbScreenPage
        header={
          <WorkoutHeader
            workout={workout}
            type={type}
            onSave={() => {
              const valid = validate();
              if (!valid) return;
              if (type === 'active') {
                finishWorkout(workout.id as number).then(() =>
                  router.dismissTo('/history'),
                );
              } else {
                flush().then(() => router.back());
              }
            }}
          />
        }
      >
        {type === 'completed' && (
          <WlbTimer start={workout.startedAt} end={workout.completedAt} />
        )}
        <WlbInput
          value={workout.name}
          error={hasError('name')}
          onChangeText={(value) => updateWorkout({ name: value })}
          placeholder="Workout name"
        />
        <WlbInput
          value={workout.note || ''}
          onChangeText={(value) => updateWorkout({ note: value })}
          placeholder="Add notes..."
          multiline
        />
        <PhotoPicker
          type="workout"
          photo={workout.photo}
          onPhotoChange={(photo) => updateWorkout({ photo })}
        />
        {workout.exerciseGroups.map((exerciseGroup, index: number) => (
          <ExerciseGroup
            key={exerciseGroup.id}
            workoutType={type}
            exerciseGroupIndex={index}
            exerciseGroup={exerciseGroup}
            addExerciseRow={addExerciseRow}
            updateExerciseRow={updateExerciseRow}
            deleteExerciseRow={deleteExerciseRow}
            deleteExerciseGroup={deleteExerciseGroup}
            isLastGroup={index === workout.exerciseGroups.length - 1}
          />
        ))}
        <WlbButton
          title="Add exercises"
          onPress={() => setAddExerciseModalVisible(true)}
        />

        <ExercisePage
          modal={{
            addExercises: addExerciseGroups,
            visible: addExerciseModalVisible,
            close: () => setAddExerciseModalVisible(false),
          }}
        />

        {workout.id && (
          <WlbButton
            title={
              {
                active: 'Cancel workout',
                completed: 'Delete workout',
                template: 'Delete template',
              }[type]
            }
            color="error"
            onPress={() => {
              deleteWorkout(workout.id as number).then(() => {
                router.back();
              });
            }}
          />
        )}
      </WlbScreenPage>
      <WorkoutKeyboard />
    </>
  );
}
