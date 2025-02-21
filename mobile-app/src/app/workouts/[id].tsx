import React from 'react';
import { Link, router, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import WlbButton from '../../components/WlbButton';
import { useEffect, useState } from 'react';
import WlbInput from '../../components/WlbInput';
import { ExerciseGroup } from '../../model/ExerciseGroup';
import WlbModal from '../../components/WlbModal';
import { useTheme } from '../../context/theme';
import ExerciseList from '../../components/ExercisePage';
import WlbHeader from '../../components/WlbPage';
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import WlbView from '../../components/WlbView';
import WlbPage from '../../components/WlbPage';
import { Exercise, ExerciseType, VALID_FIELDS } from '../../model/Exercise';
import WlbText from '../../components/WlbText';
import useWorkout from '../../hooks/useWorkout';

function ExerciseRowComponent({
  exerciseRow,
  exerciseType,
  exerciseGroupIndex,
  exerciseRowIndex,
  updateExerciseRow,
}: {
  exerciseRow: any;
  exerciseType: ExerciseType;
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
}) {
  console.log(exerciseRow);
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <WlbButton
        variant="secondary"
        size="small"
        onPress={() => {}}
        title={`${exerciseRowIndex + 1}`}
      />
      {VALID_FIELDS[exerciseType].map((field) => (
        <WlbInput
          key={field}
          size="small"
          style={{ flex: 1, textAlign: 'center' }}
          value={exerciseRow[field]?.toString()}
          onChangeText={(value) =>
            updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
              ...exerciseRow,
              [field]: value,
            })
          }
          placeholder={field}
        />
      ))}
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
    </View>
  );
}

function ExerciseGroupComponent({
  exerciseGroup,
  index,
  addExerciseRow,
  updateExerciseRow,
}: {
  exerciseGroup: any;
  index: number;
  addExerciseRow: ReturnType<typeof useWorkout>['addExerciseRow'];
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
}) {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <WlbButton
          variant="text"
          title={exerciseGroup.exercise.name}
          size="small"
          onPress={() => {}}
        />
        <WlbButton
          variant="primary"
          icon="keyboard-control"
          size="small"
          onPress={() => {}}
        />
      </View>

      {exerciseGroup.exerciseRows.map(
        (exerciseRow: any, exerciseRowIndex: number) => (
          <ExerciseRowComponent
            key={exerciseRow.id}
            exerciseType={exerciseGroup.exercise.type}
            exerciseRow={exerciseRow}
            exerciseGroupIndex={index}
            exerciseRowIndex={exerciseRowIndex}
            updateExerciseRow={updateExerciseRow}
          />
        ),
      )}
      <WlbButton
        variant="secondary"
        size="small"
        title="+ Add set"
        onPress={() => addExerciseRow(index)}
      />
    </View>
  );
}

export default function Workout() {
  const { id } = useLocalSearchParams();
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const {
    workout,
    setWorkout,
    addExerciseRow,
    addExercises,
    updateExerciseRow,
    flush,
  } = useWorkout();

  return (
    <WlbView>
      <WlbPage
        containerStyle={{ gap: 20, paddingBottom: 32 }}
        title="New workout"
        headerRight={
          <WlbButton
            onPress={() => {
              flush();
              router.back();
            }}
            variant="primary"
            title="Save"
          />
        }
        headerLeft={
          <WlbButton
            onPress={() => {
              router.back();
            }}
            variant="secondary"
            icon="close"
          />
        }
      >
        <WlbInput
          value={workout.name}
          onChangeText={(value) => setWorkout({ ...workout, name: value })}
          placeholder="Workout name"
        />
        {workout.exerciseGroups.map((exerciseGroup: any, index: number) => (
          <ExerciseGroupComponent
            key={exerciseGroup.id}
            index={index}
            exerciseGroup={exerciseGroup}
            addExerciseRow={addExerciseRow}
            updateExerciseRow={updateExerciseRow}
          />
        ))}
        <WlbButton
          title="Add exercises"
          variant="text"
          onPress={() => setAddExerciseModalVisible(true)}
        />

        <WlbModal
          visible={addExerciseModalVisible}
          close={() => setAddExerciseModalVisible(false)}
        >
          <ExerciseList
            addExercises={addExercises}
            onClose={() => setAddExerciseModalVisible(false)}
          />
        </WlbModal>
        <WlbButton
          title="Cancel workout"
          variant="error"
          onPress={() => router.back()}
        />
      </WlbPage>
    </WlbView>
  );
}
