import React, { useMemo } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { useState } from 'react';
import WlbInput from 'components/WlbInput';
import WlbModal from 'components/WlbModal';
import WlbPage from 'components/WlbPage';
import WlbView from 'components/WlbView';
import useWorkout, { WorkoutForm } from 'hooks/useWorkout';
import WlbButton from 'components/WlbButton';
import ExercisePage from 'components/ExercisePage';
import WlbDropdown from 'components/WlbDropdown';
import WlbText from 'components/WlbText';
import { formatTime, useTimer } from 'hooks/useTimer';
import { deleteWorkout, finishWorkout } from 'db/mutation';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'context/theme';

const VALID_FIELDS = {
  reps: ['reps'] as const,
  weighted: ['reps', 'weight'] as const,
  duration: ['time'] as const,
  distance: ['time', 'distance'] as const,
} as const;

function ExerciseRowComponent({
  exerciseRow,
  exerciseType,
  exerciseGroupIndex,
  exerciseRowIndex,
  updateExerciseRow,
  deleteExerciseRow,
  workoutType,
}: {
  workoutType: ReturnType<typeof useWorkout>['type'];
  exerciseRow: WorkoutForm['exerciseGroups'][0]['exerciseRows'][0];
  exerciseType: keyof typeof VALID_FIELDS;
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
  deleteExerciseRow: ReturnType<typeof useWorkout>['deleteExerciseRow'];
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <WlbDropdown
        triggerProps={{
          variant: 'secondary',
          size: 'small',
          title: `${exerciseRowIndex + 1}`,
          style: {
            width: 36,
          },
        }}
        options={[
          {
            label: 'Delete',
            onPress: () => {
              deleteExerciseRow(exerciseGroupIndex, exerciseRowIndex);
            },
          },
        ]}
        align="right"
      />
      {VALID_FIELDS[exerciseType].map((field) => (
        <WlbInput
          key={field}
          size="small"
          style={{ flex: 1, textAlign: 'center' }}
          value={(exerciseRow[field] ?? '').toString()}
          onChangeText={(value) =>
            updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
              ...exerciseRow,
              [field]: value,
            })
          }
          placeholder={field}
        />
      ))}
      {workoutType === 'template' ? (
        <View style={{ width: 36 }} />
      ) : (
        <WlbButton
          size="small"
          variant={exerciseRow.isLifted ? 'primary' : 'secondary'}
          onPress={() =>
            updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
              ...exerciseRow,
              isLifted: !exerciseRow.isLifted,
            })
          }
          icon={'check'}
        />
      )}
    </View>
  );
}

function ExerciseGroupComponent({
  exerciseGroup,
  exerciseGroupIndex,
  addExerciseRow,
  updateExerciseRow,
  deleteExerciseRow,
  deleteExerciseGroup,
  workoutType,
}: {
  workoutType: ReturnType<typeof useWorkout>['type'];
  exerciseGroup: WorkoutForm['exerciseGroups'][0];
  exerciseGroupIndex: number;
  addExerciseRow: ReturnType<typeof useWorkout>['addExerciseRow'];
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
  deleteExerciseRow: ReturnType<typeof useWorkout>['deleteExerciseRow'];
  deleteExerciseGroup: ReturnType<typeof useWorkout>['deleteExerciseGroup'];
}) {
  const theme = useTheme();
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <WlbButton
          variant="text"
          title={exerciseGroup.exercise.name}
          size="small"
          onPress={() => {}}
        />
        <WlbDropdown
          triggerProps={{
            variant: 'primary',
            icon: 'keyboard-control',
            size: 'small',
          }}
          options={[
            { label: 'Edit', onPress: () => {} },
            {
              label: 'Delete',
              onPress: () => {
                deleteExerciseGroup(exerciseGroupIndex);
              },
            },
          ]}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ width: 36, alignItems: 'center' }}>
          <WlbText fontWeight="700">Set</WlbText>
        </View>
        {VALID_FIELDS[exerciseGroup.exercise.type].map((field) => (
          <View style={{ flex: 1, alignItems: 'center' }} key={field}>
            <WlbText fontWeight="700">{field}</WlbText>
          </View>
        ))}
        <View style={{ width: 36, alignItems: 'center' }}>
          <MaterialIcons name="check" size={20} color={theme.text} />
        </View>
      </View>
      {exerciseGroup.exerciseRows.map(
        (exerciseRow, exerciseRowIndex: number) => (
          <ExerciseRowComponent
            key={exerciseRowIndex}
            exerciseType={exerciseGroup.exercise.type}
            exerciseRow={exerciseRow}
            exerciseGroupIndex={exerciseGroupIndex}
            exerciseRowIndex={exerciseRowIndex}
            updateExerciseRow={updateExerciseRow}
            deleteExerciseRow={deleteExerciseRow}
            workoutType={workoutType}
          />
        ),
      )}
      <WlbButton
        variant="secondary"
        size="small"
        title="+ Add set"
        onPress={() => addExerciseRow(exerciseGroupIndex)}
      />
    </View>
  );
}

export default function Workout() {
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const {
    workout,
    type,
    setWorkout,
    addExerciseRow,
    addExerciseGroups,
    deleteExerciseRow,
    deleteExerciseGroup,
    updateExerciseRow,
    flush,
  } = useWorkout();
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
        <WlbButton
          title="Finish"
          onPress={() =>
            finishWorkout(workout.id as number).then(() => {
              router.dismissTo('/history');
            })
          }
        />
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
    <WlbView>
      <WlbPage
        containerStyle={{ gap: 20, paddingBottom: 32 }}
        title={title}
        headerRight={headerRight}
        headerLeft={
          <WlbButton
            onPress={() => router.back()}
            variant="secondary"
            icon="close"
          />
        }
      >
        {type === 'completed' && timer && (
          <WlbText>{formatTime(timer, 'pretty')}</WlbText>
        )}
        <WlbInput
          value={workout.name}
          onChangeText={(value) => setWorkout({ ...workout, name: value })}
          placeholder="Workout name"
        />
        {workout.exerciseGroups.map((exerciseGroup, index: number) => (
          <ExerciseGroupComponent
            key={index}
            workoutType={type}
            exerciseGroupIndex={index}
            exerciseGroup={exerciseGroup}
            addExerciseRow={addExerciseRow}
            updateExerciseRow={updateExerciseRow}
            deleteExerciseRow={deleteExerciseRow}
            deleteExerciseGroup={deleteExerciseGroup}
          />
        ))}
        <WlbButton
          title="Add exercises"
          onPress={() => setAddExerciseModalVisible(true)}
        />

        <WlbModal
          visible={addExerciseModalVisible}
          close={() => setAddExerciseModalVisible(false)}
        >
          <ExercisePage
            addExercises={addExerciseGroups}
            onClose={() => setAddExerciseModalVisible(false)}
          />
        </WlbModal>
        {workout.id && (
          <WlbButton
            title={
              {
                active: 'Cancel workout',
                completed: 'Delete workout',
                template: 'Delete template',
              }[type]
            }
            variant="error"
            onPress={() => {
              deleteWorkout(workout.id as number).then(() => {
                router.back();
              });
            }}
          />
        )}
      </WlbPage>
    </WlbView>
  );
}
